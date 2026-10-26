
"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import * as THREE from "three";

function Sculpture() {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group) return;
    if (!group.current) return;

    group.current.rotation.y += delta * 0.08;

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      state.pointer.y * 0.12,
      0.025
    );

    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      -state.pointer.x * 0.08,
      0.025
    );
  });

  return (
    <Float
      speed={1.2}
      rotationIntensity={0.12}
      floatIntensity={0.3}
    >
      <group ref={group} scale={1.25}>
        {/* Anel metálico principal */}
        <mesh rotation={[0.5, 0.2, 0]}>
          <torusGeometry args={[1.45, 0.16, 32, 128]} />
          <meshPhysicalMaterial
            color="#A9B3C2"
            metalness={1}
            roughness={0.12}
            clearcoat={1}
            clearcoatRoughness={0.08}
          />
        </mesh>

        {/* Anel de vidro */}
        <mesh rotation={[1.2, 0.8, 0.4]}>
          <torusGeometry args={[1.45, 0.19, 32, 128]} />
          <MeshTransmissionMaterial
            color="#DDE8F5"
            transmission={1}
            thickness={0.6}
            roughness={0.04}
            ior={1.45}
            chromaticAberration={0.025}
            backside
            samples={4}
            resolution={256}
          />
        </mesh>

        {/* Terceiro anel metálico */}
        <mesh rotation={[0.2, 1.3, 1]}>
          <torusGeometry args={[1.2, 0.11, 32, 128]} />
          <meshPhysicalMaterial
            color="#E6EDF5"
            metalness={0.95}
            roughness={0.16}
            clearcoat={1}
          />
        </mesh>

        {/* Núcleo translúcido */}
        <mesh>
          <icosahedronGeometry args={[0.48, 2]} />
          <MeshTransmissionMaterial
            color="#AFC6DF"
            transmission={1}
            thickness={1}
            roughness={0.08}
            ior={1.3}
            samples={4}
            resolution={256}
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function ConnectionSculpture() {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 6.8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={0.7} />

        <directionalLight
          position={[4, 5, 6]}
          intensity={3}
          color="#DDE9FF"
        />

        <pointLight
          position={[-4, -2, 3]}
          intensity={45}
          color="#446B9C"
        />

        <Environment preset="city" />

        <Sculpture />
      </Canvas>
    </div>
  );
}
