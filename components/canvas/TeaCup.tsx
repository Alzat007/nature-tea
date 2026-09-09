'use client';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  Component,
  type ReactNode,
} from 'react';
import * as THREE from 'three';
import { MODEL_CONFIG, type MotionState } from '@/models/config';
export type TeaCupProps = {
  motion: MotionState;
  modelUrl?: string;
  interactive?: boolean;
  onToggle?: () => void;
  color?: string;
  onHover?: (v: boolean) => void;
};
export function PlaceholderCup({ motion, onToggle }: TeaCupProps) {
  const lid = useRef<THREE.Group>(null);
  const points = useMemo(
    () =>
      Array.from({ length: 44 }, (_, i) => {
        const t = i / 43;
        return new THREE.Vector2(
          0.34 + Math.sin(t * Math.PI) * 0.23,
          t * 2.15 - 1.3,
        );
      }),
    [],
  );
  useFrame(() => {
    if (lid.current) {
      lid.current.position.y = motion.openProgress * motion.debug.lidLift;
      lid.current.rotation.y =
        motion.openProgress * MODEL_CONFIG.openingRotation;
    }
  });
  return (
    <group>
      <mesh>
        <latheGeometry args={[points, 80]} />
        <meshStandardMaterial
          color="#b4a88a"
          metalness={0.9}
          roughness={0.28}
        />
      </mesh>
      <group ref={lid} onClick={onToggle}>
        <mesh position={[0, 1.025, 0]}>
          <cylinderGeometry args={[0.31, 0.37, 0.35, 80]} />
          <meshStandardMaterial
            color="#b4a88a"
            metalness={0.9}
            roughness={0.28}
          />
        </mesh>
      </group>
    </group>
  );
}
class AssetBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
function LoadedCup({
  motion,
  interactive = true,
  onToggle,
  color,
  onHover,
  modelUrl = MODEL_CONFIG.url,
}: TeaCupProps) {
  const { scene } = useGLTF(modelUrl, MODEL_CONFIG.dracoPath);
  const group = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        o.material = (o.material as THREE.MeshStandardMaterial).clone();
        const m = o.material as THREE.MeshStandardMaterial;
        if (o.name !== MODEL_CONFIG.names.logo) {
          if (color) m.color.set(color);
          m.envMapIntensity = 1.2;
        }
        o.castShadow = false;
        o.receiveShadow = false;
      }
    });
    return clone;
  }, [scene, color]);
  const lid = useMemo(
    () => group.getObjectByName(MODEL_CONFIG.names.lid),
    [group],
  );
  const base = useMemo(
    () => lid?.position.clone() ?? new THREE.Vector3(0, 0.837, 0),
    [lid],
  );
  const [hover, setHover] = useState(false);
  const glow = useRef<THREE.PointLight>(null);
  useEffect(
    () => () => {
      group.traverse((o) => {
        if (o instanceof THREE.Mesh) (o.material as THREE.Material).dispose();
      });
    },
    [group],
  );
  useFrame((_, dt) => {
    if (lid) {
      const p = motion.openProgress;
      lid.position.y =
        base.y + Math.max(0, (p - 0.28) / 0.72) * motion.debug.lidLift;
      lid.rotation.y =
        THREE.MathUtils.smoothstep(p, 0, 0.7) * MODEL_CONFIG.openingRotation;
      if (lid instanceof THREE.Mesh) {
        const mat = lid.material as THREE.MeshStandardMaterial;
        mat.emissive.set('#b8bd87');
        mat.emissiveIntensity = THREE.MathUtils.damp(
          mat.emissiveIntensity,
          hover ? 0.13 : 0,
          5,
          dt,
        );
      }
    }
    if (glow.current) glow.current.intensity = motion.openProgress * 1.8;
  });
  function hoverLid(e: {
    object: THREE.Object3D;
    stopPropagation: () => void;
  }) {
    if (!interactive || e.object.name !== MODEL_CONFIG.names.lid) return;
    e.stopPropagation();
    setHover(true);
    motion.hovered = true;
    onHover?.(true);
    document.body.style.cursor = 'pointer';
  }
  return (
    <group rotation-y={MODEL_CONFIG.rotationY}>
      <primitive
        object={group}
        dispose={null}
        onPointerOver={hoverLid}
        onPointerOut={() => {
          setHover(false);
          motion.hovered = false;
          onHover?.(false);
          document.body.style.cursor = 'auto';
        }}
        onClick={(e: {
          object: THREE.Object3D;
          stopPropagation: () => void;
        }) => {
          if (interactive && e.object.name === MODEL_CONFIG.names.lid) {
            e.stopPropagation();
            onToggle?.();
          }
        }}
      />
      <pointLight
        ref={glow}
        position={[0, 0.82, 0]}
        color="#f9c77b"
        distance={2}
        decay={2}
        intensity={0}
      />
    </group>
  );
}
export default function TeaCup(props: TeaCupProps) {
  return (
    <AssetBoundary
      key={props.modelUrl}
      fallback={<PlaceholderCup {...props} />}
    >
      <Suspense fallback={<PlaceholderCup {...props} />}>
        <LoadedCup {...props} />
      </Suspense>
    </AssetBoundary>
  );
}
