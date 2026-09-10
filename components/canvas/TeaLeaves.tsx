'use client';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { createLeafGeometry } from './leafGeometry';
import { noise, seeded } from '@/lib/noise';
import type { MotionState } from '@/models/config';
export default function TeaLeaves({
  motion,
  mobile,
  reduced,
}: {
  motion: MotionState;
  mobile: boolean;
  reduced: boolean;
}) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const geom = useMemo(createLeafGeometry, []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const count = mobile ? 24 : 52;
  const palette = useMemo(
    () =>
      ['#b46b58', '#cf9b62', '#8f704d', '#a4515c', '#d0ad72'].map(
        (color) => new THREE.Color(color),
      ),
    [],
  );
  useEffect(() => () => geom.dispose(), [geom]);
  useEffect(() => {
    if (!ref.current) return;
    for (let i = 0; i < count; i++)
      ref.current.setColorAt(i, palette[i % palette.length]);
    if (ref.current.instanceColor) ref.current.instanceColor.needsUpdate = true;
  }, [count, palette]);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    if (motion.chapter === 'history' || motion.chapter === 'collection') {
      ref.current.count = 0;
      return;
    }
    const p = motion.openProgress;
    ref.current.count =
      p > 0.12 ? Math.floor(10 + Math.min(1, p) * (count - 10)) : 0;
    const time = reduced ? 0 : clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const phase = seeded(i) * Math.PI * 2;
      const speed = 0.18 + seeded(i, 2) * 0.14;
      const h = (time * speed + seeded(i, 3) * 2.8) % 2.8;
      const radius = (0.35 + h * 0.31) * p;
      const a = phase + h * 1.9 + time * 0.17;
      dummy.position.set(
        Math.cos(a) * radius + noise(i, time * 0.3, 0) * 0.05,
        0.9 + h * p,
        Math.sin(a) * radius,
      );
      dummy.rotation.set(
        phase + time * 0.2,
        time * (0.3 + speed) + phase,
        Math.sin(a) * 0.5,
      );
      dummy.scale.setScalar((0.45 + seeded(i, 4) * 0.55) * p);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh
      ref={ref}
      args={[geom, undefined, count]}
      frustumCulled={false}
    >
      <meshStandardMaterial
        vertexColors
        side={THREE.DoubleSide}
        metalness={0.05}
        roughness={0.65}
      />
    </instancedMesh>
  );
}
