'use client';
import { useFrame } from '@react-three/fiber';
import { useMemo } from 'react';
import * as THREE from 'three';
import type { MotionState } from '@/models/config';
export default function CameraRig({
  motion,
  mobile,
  reduced,
}: {
  motion: MotionState;
  mobile: boolean;
  reduced: boolean;
}) {
  const focus = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ camera }, dt) => {
    const open = motion.openProgress;
    const hist = motion.chapter === 'history';
    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      reduced ? 0 : motion.pointerX * 0.13,
      2,
      dt,
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      hist ? 0.12 : 0.18 + open * 0.22 + (reduced ? 0 : motion.pointerY * 0.06),
      2,
      dt,
    );
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      motion.debug.cameraDistance +
        (mobile ? 1.4 : 0) -
        (hist ? 0.5 : open * 0.22),
      2,
      dt,
    );
    focus.set(0, open * 0.14, 0);
    camera.lookAt(focus);
  });
  return null;
}
