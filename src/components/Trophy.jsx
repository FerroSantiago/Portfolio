import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import TrophyModel from "./TrophyModel"; // el archivo que ya tenés

export default function Trophy({ icon, name }) {
  return (
    <div className="w-45 h-45">
      <Canvas camera={{ position: [0, 1.2, 4.5], fov: 50 }}>
        <Suspense fallback={null}>
          <TrophyModel icon={icon} name={name} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} target={[0, 1.35, 0]} />
      </Canvas>
    </div>
  );
}