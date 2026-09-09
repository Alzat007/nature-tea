'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import { useRef, useState, Suspense } from 'react';
import * as THREE from 'three';
import TeaCup from './TeaCup';
import TeaLeaves from './TeaLeaves';
import TeaSwarm from './TeaSwarm';
import LightingRig from './LightingRig';
import CameraRig from './CameraRig';
import type { MotionState } from '@/models/config';
type Props = {
  motion: MotionState;
  onToggle: () => void;
  onHover: (v: boolean) => void;
  mobile: boolean;
  reduced: boolean;
};
function Vessel({ motion, onToggle, onHover, mobile, reduced }: Props) {
  const rig = useRef<THREE.Group>(null);
  useFrame(({ clock }, dt) => {
    if (!rig.current) return;
    const c = motion.chapter;
    const hidden = c === 'collection' || c === 'history';
    const x = mobile
      ? c === 'why'
        ? 0.75
        : 0
      : c === 'ritual'
        ? -0.88
        : c === 'leaf' || c === 'why'
          ? 1.13
          : 0;
    const scale = hidden
      ? 0.001
      : (c === 'craft' ? 1.16 : c === 'why' ? 0.86 : 1) *
        (1 - motion.openProgress * 0.17);
    rig.current.visible = !hidden;
    rig.current.position.x = THREE.MathUtils.damp(
      rig.current.position.x,
      x,
      2.7,
      dt,
    );
    rig.current.position.y = THREE.MathUtils.damp(
      rig.current.position.y,
      (mobile ? 0 : c === 'home' ? 0.03 : -0.1) - motion.openProgress * 0.2,
      2,
      dt,
    );
    rig.current.scale.setScalar(
      THREE.MathUtils.damp(rig.current.scale.x, scale, 3, dt),
    );
    const slow = reduced ? 0 : Math.sin(clock.elapsedTime * 0.13) * 0.14;
    const targetRotation = reduced
      ? 0
      : c === 'craft'
        ? motion.craftProgress * Math.PI * 2
        : c === 'why'
          ? motion.whyProgress * 0.8
          : 0;
    rig.current.rotation.y = THREE.MathUtils.damp(
      rig.current.rotation.y,
      targetRotation +
        slow +
        (reduced ? 0 : motion.pointerX * 0.07) +
        motion.debug.cupRotation,
      2,
      dt,
    );
    rig.current.rotation.z = THREE.MathUtils.damp(
      rig.current.rotation.z,
      c === 'home' ? -0.1 : c === 'craft' ? -0.19 : 0,
      2.5,
      dt,
    );
    rig.current.position.y += reduced
      ? 0
      : Math.sin(clock.elapsedTime * 0.6) * 0.0007;
  });
  return (
    <group ref={rig}>
      <TeaCup motion={motion} onToggle={onToggle} onHover={onHover} />
      <TeaLeaves motion={motion} mobile={mobile} reduced={reduced} />
    </group>
  );
}
export default function World(props: Props) {
  const [dpr, setDpr] = useState(props.mobile ? 1.15 : 1.5);
  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0.18, 6.2], fov: 34, near: 0.1, far: 40 }}
      gl={{
        alpha: true,
        antialias: !props.mobile,
        powerPreference: 'high-performance',
      }}
      onCreated={({ gl }) => {
        gl.setClearColor('#000000', 0);
      }}
    >
      <PerformanceMonitor
        onDecline={() => setDpr(1)}
        onIncline={() => setDpr(props.mobile ? 1.15 : 1.5)}
      />
      <LightingRig reduced={props.reduced} motion={props.motion} />
      <CameraRig {...props} />
      <Vessel {...props} />
      <Suspense fallback={null}>
        <TeaSwarm
          motion={props.motion}
          mobile={props.mobile}
          reduced={props.reduced}
        />
      </Suspense>
    </Canvas>
  );
}
