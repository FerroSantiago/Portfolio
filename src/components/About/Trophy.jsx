"use client"

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import TrophyModel from "./TrophyModel";

export default function Trophy({ icon, name, onLoaded }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="w-35 h-45"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas camera={{ position: [0, 1.2, 4.5], fov: 55 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          {/*  <color attach="background" args={["#111"]} /> */}
          {/*  <axesHelper args={[5]} /> */}
          <TrophyModel icon={icon} name={name} hovered={hovered} onLoaded={onLoaded} />
        </Suspense>
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          target={[0, 1.8, 0]} />
      </Canvas>
    </div>
  );
}