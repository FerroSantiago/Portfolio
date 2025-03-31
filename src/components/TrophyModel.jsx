import { useMemo } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

function createCurvedTextGeometry(radius = 0.8, arc = Math.PI, segments = 32, height = 0.8) {
  const geometry = new THREE.BufferGeometry();

  const positions = [];
  const uvs = [];

  for (let i = 0; i <= segments; i++) {
    const angle = -arc / 2 - (i / segments) * arc;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const u = i / segments;

    // Top edge
    positions.push(x, height / 2, z);
    uvs.push(u, 1);

    // Bottom edge
    positions.push(x, -height / 2, z);
    uvs.push(u, 0);
  }

  const indices = [];
  for (let i = 0; i < segments; i++) {
    const a = i * 2;
    const b = a + 1;
    const c = a + 2;
    const d = a + 3;
    indices.push(a, b, d);
    indices.push(a, d, c);
  }

  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
}

function useTextLabelTexture(text) {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    const size = 512;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, size, size);

    ctx.font = "95px monospace";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, size / 2, size / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, [text]);
}

export default function TrophyModel({ icon, name }) {
  const texture = useTexture(icon);
  const labelTexture = useTextLabelTexture(name);
  const geometry = useMemo(() => createCurvedTextGeometry(), []);

  return (
    <group>
      {/* Esfera */}
      <mesh position={[0, 2.1, 0]}>
        <sphereGeometry args={[1, 15, 15]} />
        <meshBasicMaterial wireframe color="#ffffff" />
      </mesh>

      {/* Logo */}
      <mesh position={[0, 2.1, 0.7]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={texture} transparent />
      </mesh>

      {/* Base */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.6, 1, 0.8, 10, 1]} />
        <meshBasicMaterial wireframe color="#da4d4d" />
      </mesh>

      {/* Texto curvo sobre la base */}
      <mesh position={[0, 0.5, 0.3]} rotation={[0, Math.PI / 2, 0]}>
        <primitive object={geometry} attach="geometry" />
        <meshBasicMaterial
          map={labelTexture}
          color="white"
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}