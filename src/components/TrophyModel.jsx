import { useMemo } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

function useTextLabelTexture(text) {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    const size = 512;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    // Fondo transparente
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.fillRect(0, 0, size, size);

    // Texto blanco centrado
    ctx.font = "bold 50px monospace";
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

      {/* Texto plano con textura */}
      <mesh position={[0, 0.5, 0.9]} rotation={[-0.3, 0, 0]}>
        <planeGeometry args={[3.5, 3]} />
        <meshBasicMaterial map={labelTexture} transparent />
      </mesh>
    </group>
  );
}
