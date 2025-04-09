import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const BubblesBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    const bubbles = [];
    const maxBubbles = 40;

    const bubbleMaterial = new THREE.MeshBasicMaterial({
      color: 0xda4d4d,
      transparent: true,
      opacity: 0.6,
      wireframe: true,
    });

    function createBubble() {
      const geometry = new THREE.SphereGeometry(Math.random() * 0.3 + 0.1, 10, 10);
      const material = bubbleMaterial.clone();
      const mesh = new THREE.Mesh(geometry, material);
      resetBubble(mesh);
      scene.add(mesh);
      return mesh;
    }

    function resetBubble(bubble) {
      bubble.position.set(
        (Math.random() - 0.5) * 25,
        -5 - Math.random() * 2,
        (Math.random() - 0.5) * 10
      );
      bubble.material.opacity = 0.6;
      bubble.scale.set(1, 1, 1);
      bubble.userData = {
        age: 0,
        life: Math.random() * 600 + 400, // más vida útil
        speed: 0.002 + Math.random() * 0.004,
      };
    }

    let lastTime = performance.now();

    const animate = (now) => {
      requestAnimationFrame(animate);
      const delta = (now - lastTime) / 1000; // delta en segundos
      lastTime = now;

      if (bubbles.length < maxBubbles && Math.random() < 0.01) {
        bubbles.push(createBubble());
      }

      bubbles.forEach((bubble) => {
        const userData = bubble.userData;
        userData.age += delta;

        bubble.position.y += userData.speed;

        const progress = userData.age / (userData.life / 60); // ajustamos para delta
        bubble.material.opacity = Math.max(0, 0.6 * (1 - progress));

        // crecimiento controlado
        const scaleFactor = 1 + 0.4 * Math.sin(Math.min(progress, 1) * Math.PI);
        bubble.scale.setScalar(scaleFactor);

        if (progress >= 1) {
          resetBubble(bubble);
        }
      });

      renderer.render(scene, camera);
    };

    requestAnimationFrame(animate);

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-index-[-1] overflow-hidden" />;
};

export default BubblesBackground;
