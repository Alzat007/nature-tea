'use client';
import { Leva, useControls } from 'leva';
import { useEffect } from 'react';
import type { DebugConfig } from '@/models/config';
export default function DebugPanel({
  onChange,
}: {
  onChange: (c: DebugConfig) => void;
}) {
  const values = useControls('Art direction', {
    cameraDistance: { value: 6.2, min: 4, max: 10, step: 0.1 },
    cupRotation: { value: 0, min: -3.14, max: 3.14, step: 0.01 },
    lidLift: { value: 0.72, min: 0.3, max: 1.6, step: 0.01 },
    lighting: { value: 1, min: 0.2, max: 3, step: 0.1 },
    leafCount: { value: 420, min: 50, max: 600, step: 10 },
    scrollSpeed: { value: 1, min: 0.5, max: 2, step: 0.1 },
    timing: { value: 2.8, min: 1, max: 6, step: 0.1 },
  });
  useEffect(() => onChange(values), [values, onChange]);
  return (
    <Leva
      collapsed
      titleBar={{ title: 'NATURE / Art direction', drag: true, filter: false }}
    />
  );
}
