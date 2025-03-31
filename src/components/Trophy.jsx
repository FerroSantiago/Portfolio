import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import TrophyModel from "./TrophyModel";

export default function Trophy({ icon, name }) {
  return (
    <div className="w-45 h-45">
      <Canvas camera={{ position: [0, 1.2, 4.5], fov: 50 }}>
        <Suspense fallback={null}>
          <color attach="background" args={["#111"]} /> {/* Fondo oscuro */}
          <axesHelper args={[5]} /> {/* Ejes XYZ */}
          <TrophyModel icon={icon} name={name} />
        </Suspense>
        <OrbitControls enableZoom={true} enablePan={false} target={[0, 1.35, 0]} />
      </Canvas>
    </div>
  );
}