"use client"

import { useMemo } from "react"
import * as THREE from "three"
import { useTexture } from "@react-three/drei"

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

export default function TrophyModel({ icon, name }) {
  const texture = useTexture(icon)
  const labelTexture = useTextLabelTexture(name)

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
      {/* Esfera */}
      <mesh position={[0, 2.1, 0]}>
        <sphereGeometry args={[1, 15, 15]} />
        <meshBasicMaterial wireframe color="#d69898" />
      </mesh>

      {/* Logo */}
      <mesh position={[0, 2.1, 0.7]}>
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


