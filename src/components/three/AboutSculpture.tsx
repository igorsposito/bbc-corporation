
"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Rings() {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;

    group.current.rotation.y += Math.min(delta, 0.05) * 0.18;
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      state.pointer.y * 0.12 + 0.2,
      2,
      delta
    );
  });

  return (
    <group ref={group} rotation={[0.2, -0.3, 0]}>
      <mesh rotation={[0.3, 0.2, 0]}>
        <torusGeometry args={[1.3, 0.17, 12, 64]} />
        <meshStandardMaterial
          color="#A9B2BB"
          metalness={0.75}
          roughness={0.28}
        />
      </mesh>

      <mesh rotation={[1.15, 0.2, 0.5]}>
        <torusGeometry args={[1.1, 0.14, 12, 64]} />
        <meshStandardMaterial
          color="#D1D5D9"
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>

      <mesh rotation={[0.4, 1.1, 0.7]}>
        <torusGeometry args={[0.9, 0.12, 12, 64]} />
        <meshStandardMaterial
          color="#8F9BA6"
          metalness={0.65}
          roughness={0.3}
        />
      </mesh>

      <mesh>
        <icosahedronGeometry args={[0.38, 1]} />
        <meshPhysicalMaterial
          color="#E8EDF1"
          metalness={0.45}
          roughness={0.18}
          clearcoat={0.5}
        />
      </mesh>
    </group>
  );
}

export default function AboutSculpture() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element) return;

    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    reducedMotionRef.current = media.matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="h-full w-full">
      <Canvas
        dpr={1}
        camera={{ position: [0, 0, 5.2], fov: 40 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "low-power",
        }}
        frameloop="always"
      >
        <ambientLight intensity={2} />

        <directionalLight
          position={[3, 5, 5]}
          intensity={3}
        />

        <directionalLight
          position={[-3, -2, 2]}
          intensity={1.5}
        />

        <Rings />
      </Canvas>
    </div>
  );
}
