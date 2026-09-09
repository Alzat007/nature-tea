'use client';
import { Environment, Lightformer } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import type { MotionState } from '@/models/config';
export default function LightingRig({
  motion,
  reduced = false,
}: {
  motion: MotionState;
  reduced?: boolean;
}) {
  const key = useRef<THREE.SpotLight>(null);
  const fill = useRef<THREE.PointLight>(null);
  useFrame((_, dt) => {
    if (key.current) {
      key.current.position.x = THREE.MathUtils.damp(
        key.current.position.x,
        2 + (reduced ? 0 : motion.pointerX * 0.6),
        2,
        dt,
      );
      key.current.intensity =
        motion.debug.lighting * (motion.chapter === 'history' ? 18 : 28);
    }
    if (fill.current) {
      fill.current.color.set(
        motion.chapter === 'craft' &&
          motion.craftProgress > 0.4 &&
          motion.craftProgress < 0.6
          ? '#ffc585'
          : '#d8e0bc',
      );
    }
  });
  return (
    <>
      <ambientLight intensity={0.48} />
      <spotLight
        ref={key}
        position={[2, 4, 5]}
        angle={0.65}
        penumbra={1}
        intensity={28}
        color="#fff3d3"
      />
      <pointLight
        ref={fill}
        position={[-3, 1, 2]}
        intensity={12}
        color="#d8e0bc"
      />
      <Environment frames={1} resolution={128}>
        <Lightformer
          position={[-3, 2, 3]}
          rotation-y={0.7}
          scale={[1.4, 7, 1]}
          intensity={3.2}
        />
        <Lightformer
          position={[3, 1, 2]}
          rotation-y={-0.7}
          scale={[0.65, 6, 1]}
          intensity={4.8}
        />
        <Lightformer
          position={[0, 4, -2]}
          rotation-x={Math.PI / 2}
          scale={[5, 2, 1]}
          intensity={2}
        />
        <Lightformer position={[0, 0, 5]} scale={[7, 5, 1]} intensity={0.35} />
      </Environment>
    </>
  );
}
