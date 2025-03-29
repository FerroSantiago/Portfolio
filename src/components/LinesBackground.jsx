import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const LinesBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0x000000, 1)
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    const material = new THREE.LineBasicMaterial({ color: 0xda4d4d });

    const points = [];
    for (let i = 0; i < 50; i++) {
      points.push(new THREE.Vector3(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    scene.add(line);

    const animate = () => {
      requestAnimationFrame(animate);
      line.rotation.x += 0.0001;
      line.rotation.y += 0.0001;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-index-[-1]" />;
};

export default LinesBackground;
