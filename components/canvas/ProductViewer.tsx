'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import TeaCup from './TeaCup';
import LightingRig from './LightingRig';
import { initialMotion } from '@/models/config';
import { products, type Product } from '@/data/tea';
function ProductObject({
  product,
  index,
  selected,
  hover,
  onSelect,
  detail,
  reduced,
}: {
  reduced: boolean;
  product: Product;
  index: number;
  selected: number;
  hover: (v: number) => void;
  onSelect: (p: Product) => void;
  detail: boolean;
}) {
  const viewport = useThree((s) => s.viewport);
  const baseScale = Math.min(0.98, viewport.width / 5.8);
  const rig = useRef<THREE.Group>(null);
  const motion = useMemo(initialMotion, []);
  useFrame(({ clock, pointer }, dt) => {
    if (!rig.current || reduced) return;
    const active = selected === index;
    const scale = detail ? 1.0 : baseScale * (active ? 1.06 : 1);
    rig.current.scale.setScalar(
      THREE.MathUtils.damp(rig.current.scale.x, scale, 3, dt),
    );
    rig.current.rotation.y = THREE.MathUtils.damp(
      rig.current.rotation.y,
      (active || detail ? pointer.x * 0.28 : 0) +
        Math.sin(clock.elapsedTime * 0.2 + index) * 0.12,
      3,
      dt,
    );
    rig.current.rotation.z = THREE.MathUtils.damp(
      rig.current.rotation.z,
      detail ? -0.1 : active ? -0.09 : 0,
      3,
      dt,
    );
    rig.current.position.z = THREE.MathUtils.damp(
      rig.current.position.z,
      active ? 0.22 : 0,
      3,
      dt,
    );
  });
  return (
    <group
      ref={rig}
      position={[detail ? 0 : (index - 1) * viewport.width * 0.325, 0, 0]}
      scale={detail ? 1 : baseScale}
      onPointerOver={() => {
        hover(index);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        hover(-1);
        document.body.style.cursor = 'auto';
      }}
      onClick={() => onSelect(product)}
    >
      <TeaCup
        modelUrl={product.model}
        motion={motion}
        interactive={false}
        color={product.color}
      />
    </group>
  );
}
export default function ProductViewer({
  selected,
  onHover,
  onSelect,
  active = true,
  product,
  reduced = false,
}: {
  reduced?: boolean;
  selected: number;
  onHover: (v: number) => void;
  onSelect: (p: Product) => void;
  active?: boolean;
  product?: Product;
}) {
  const motion = useMemo(initialMotion, []);
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.35]}
      camera={{ position: [0, 0.1, product ? 5.8 : 7], fov: 32 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
    >
      <LightingRig reduced={reduced} motion={motion} />
      {(product ? [product] : products).map((p, i) => (
        <ProductObject
          reduced={reduced}
          key={p.id}
          product={p}
          index={i}
          selected={selected}
          hover={onHover}
          onSelect={onSelect}
          detail={!!product}
        />
      ))}
    </Canvas>
  );
}
