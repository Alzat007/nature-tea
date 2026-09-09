'use client';
import { useLanguage } from '../experience/LanguageProvider';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { createLeafGeometry } from './leafGeometry';
import { noise, seeded } from '@/lib/noise';
import { milestones } from '@/data/tea';
import type { MotionState } from '@/models/config';
export default function TeaSwarm({
  motion,
  mobile,
  reduced,
}: {
  motion: MotionState;
  mobile: boolean;
  reduced: boolean;
}) {
  const { t } = useLanguage();
  const mesh = useRef<THREE.InstancedMesh>(null);
  const group = useRef<THREE.Group>(null);
  const years = useRef<THREE.Group>(null);
  const geo = useMemo(createLeafGeometry, []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const max = mobile ? 150 : 600;
  useEffect(() => () => geo.dispose(), [geo]);
  useFrame(({ clock }) => {
    if (!group.current || !mesh.current) return;
    const active = motion.chapter === 'history';
    group.current.visible = active;
    if (!active) return;
    const p = motion.historyProgress;
    const t = reduced ? 0 : clock.elapsedTime;
    const beat = p * 5;
    const travelProgress = reduced
      ? 0
      : (Math.floor(beat) + THREE.MathUtils.smoothstep(beat % 1, 0, 1)) / 5;
    const count = Math.min(max, mobile ? 150 : motion.debug.leafCount);
    mesh.current.count = count;
    const converge = reduced
      ? p > 0.85
        ? 1
        : 0
      : THREE.MathUtils.smoothstep(p, 0.82, 0.94);
    for (let i = 0; i < count; i++) {
      const seed = seeded(i);
      const travel =
        (((seed * 26 - travelProgress * 20 + t * 0.16) % 26) + 26) % 26;
      const lane = seeded(i, 3) * Math.PI * 2;
      const width = 0.6 + seeded(i, 8) * 1.2;
      let x =
        Math.sin(travel * 0.48 + lane * 0.5) * width +
        noise(seed * 7, t * 0.17, travel * 0.09) * 0.48;
      let y = Math.cos(lane) * 1.35 + noise(seed * 4, t * 0.23, 0) * 0.34;
      x -= 0.48;
      let z = 2.3 - travel;
      const peak = Math.floor(seed * 3);
      const u = seeded(i, 5);
      const mx = ((peak - 1) * 1.0 + (u - 0.5) * 1.45) * (mobile ? 0.5 : 0.72);
      const my =
        ((1 - Math.abs(u - 0.5) * 2) * 0.62 + [0, 0.26, 0][peak]) * 0.65 + 0.35;
      x = THREE.MathUtils.lerp(x, mx, converge);
      y = THREE.MathUtils.lerp(y, my, converge);
      z = THREE.MathUtils.lerp(z, 0, converge);
      dummy.position.set(x, y, z);
      dummy.rotation.set(
        THREE.MathUtils.lerp(seed * 6 + t * 0.22, Math.PI / 2, converge),
        t * 0.35 + seed * 6,
        Math.sin(t * 0.3 + seed * 4) * 0.35,
      );
      dummy.scale.setScalar(
        THREE.MathUtils.lerp(0.55 + seed * 0.55, 0.3, converge),
      );
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
    if (years.current)
      years.current.children.forEach((o, i) => {
        o.position.z = -i * 5 + travelProgress * 24;
        o.visible = p < 0.85 && o.position.z < 0.5 && o.position.z > -5.5;
      });
  });
  return (
    <group ref={group} visible={false}>
      <instancedMesh
        ref={mesh}
        args={[geo, undefined, max]}
        frustumCulled={false}
      >
        <meshStandardMaterial
          vertexColors
          side={THREE.DoubleSide}
          roughness={0.75}
          metalness={0.02}
        />
      </instancedMesh>
      <group ref={years}>
        {milestones.map((m, i) => (
          <group key={t(m.year)} position={[-1.05, 0.35, -i * 5]}>
            <Text
              font="/fonts/cormorant-garamond-latin-400-normal.woff"
              fontSize={mobile ? 0.5 : 0.92}
              color="#afb397"
              anchorX="center"
              fillOpacity={0.13}
            >
              {t(m.year)}
            </Text>
          </group>
        ))}
      </group>
    </group>
  );
}
