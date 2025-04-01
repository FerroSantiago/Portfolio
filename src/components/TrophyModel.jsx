"use client"

import { useMemo, useRef } from "react"
import * as THREE from "three"
import { useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"

const TECH_COLORS = {
  Typescript: "#3178c6",
  React: "#149eca",
  "Next.js": "#ffffff",
  "Node.js": "#539e43",
  Express: "#ffffff",
  Firebase: "#ffa50e",
  "Mongo DB": "#46a037",
  Supabase: "#3ecf8e",
  Vercel: "#ffffff",
}

function useTextLabelTexture(text) {
  return useMemo(() => {
    const canvas = document.createElement("canvas")
    const size = 512
    canvas.width = size
    canvas.height = size / 4
    const ctx = canvas.getContext("2d")

    // Fondo transparente
    ctx.clearRect(0, 0, size, size / 4)

    // Draw text
    ctx.font = "bold 80px Arial"
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(text, size / 2, size / 8)

    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }, [text])
}

export default function TrophyModel({ icon, name, hovered }) {
  const texture = useTexture(icon)
  const labelTexture = useTextLabelTexture(name)
  const sphereRef = useRef()
  const logoRef = useRef()
  const outerGlowRef = useRef()
  const innerGlowRef = useRef()

  const brandColor = TECH_COLORS[name] || "#6d6666"

  const baseY = 2.1
  const hoverY = 2.3

  useFrame(({ clock }) => {
    if (!sphereRef.current || !logoRef.current || !outerGlowRef.current || !innerGlowRef.current) return

    // Current sphere position
    const currentY = THREE.MathUtils.lerp(sphereRef.current.position.y, hovered ? hoverY : baseY, 0.1)

    // Update all positions to follow the sphere
    sphereRef.current.position.y = currentY
    logoRef.current.position.y = currentY
    outerGlowRef.current.position.y = currentY
    innerGlowRef.current.position.y = currentY

    // Create a pulsing effect when hovered
    if (hovered) {
      const pulse = Math.sin(clock.getElapsedTime() * 3) * 0.05 + 1
      outerGlowRef.current.scale.set(1.5 * pulse, 1.5 * pulse, 1.5 * pulse)
      innerGlowRef.current.scale.set(1.2 * pulse, 1.2 * pulse, 1.2 * pulse)

      // Animate the glow opacity with a slight pulse
      const outerOpacity = Math.sin(clock.getElapsedTime() * 2) * 0.1 + 0.3
      const innerOpacity = Math.sin(clock.getElapsedTime() * 2) * 0.1 + 0.3

      outerGlowRef.current.material.opacity = THREE.MathUtils.lerp(
        outerGlowRef.current.material.opacity,
        hovered ? outerOpacity : 0,
        0.1,
      )

      innerGlowRef.current.material.opacity = THREE.MathUtils.lerp(
        innerGlowRef.current.material.opacity,
        hovered ? innerOpacity : 0,
        0.1,
      )
    } else {
      // Reset scale when not hovered
      outerGlowRef.current.scale.set(1.5, 1.5, 1.5)
      innerGlowRef.current.scale.set(1.2, 1.2, 1.2)

      // Fade out opacity
      outerGlowRef.current.material.opacity = THREE.MathUtils.lerp(outerGlowRef.current.material.opacity, 0, 0.1)

      innerGlowRef.current.material.opacity = THREE.MathUtils.lerp(innerGlowRef.current.material.opacity, 0, 0.1)
    }
  })


  // Geometria curvada
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const radius = 0.8
    const arc = Math.PI * 0.8
    const segments = 32
    const height = 0.4

    const positions = []
    const uvs = []

    // Generar la geometria curvada
    for (let i = 0; i <= segments; i++) {
      const angle = -arc / 2 + (i / segments) * arc
      const x = Math.sin(angle) * radius
      const z = Math.cos(angle) * radius
      const u = i / segments

      positions.push(x, height / 2, z)
      uvs.push(u, 1)

      positions.push(x, -height / 2, z)
      uvs.push(u, 0)
    }

    const indices = []
    for (let i = 0; i < segments; i++) {
      const a = i * 2
      const b = a + 1
      const c = a + 2
      const d = a + 3
      indices.push(a, b, d)
      indices.push(a, d, c)
    }

    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
    geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2))
    geo.setIndex(indices)
    geo.computeVertexNormals()

    return geo
  }, [])

  return (
    <group>
      {/* Brillo exterior */}
      <mesh ref={outerGlowRef} position={[0, baseY, 0]} scale={1.35}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color={brandColor}
          transparent
          opacity={0}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Brillo interior */}
      <mesh ref={innerGlowRef} position={[0, baseY, 0]} scale={1.2}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color={brandColor}
          transparent
          opacity={0}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Esfera */}
      <mesh ref={sphereRef} position={[0, baseY, 0]}>
        <sphereGeometry args={[1, 15, 15]} />
        <meshBasicMaterial wireframe color="#6d6666" />
      </mesh>

      {/* Logo */}
      <mesh ref={logoRef} position={[0, baseY, 0.7]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
      </mesh>

      {/* Base */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.6, 1, 0.8, 10, 1]} />
        <meshBasicMaterial wireframe color="#da4d4d" />
      </mesh>

      {/* Texto curvo sobre la base - ahora alineado con el eje Z (línea azul) */}
      <mesh position={[0, 0.4, 0]}>
        <primitive object={geometry} attach="geometry" />
        <meshBasicMaterial map={labelTexture} transparent side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}


