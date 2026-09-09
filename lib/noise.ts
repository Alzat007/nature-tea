export function noise(x: number, y: number, z: number) {
  return (
    Math.sin(x * 1.13 + y * 0.61 + z * 0.72) * 0.5 +
    Math.sin(x * 0.43 - y * 1.47 + z * 0.38) * 0.3 +
    Math.sin(x * 2.17 + y * 0.19 - z * 1.21) * 0.2
  );
}
export function seeded(i: number, s = 1) {
  const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453123;
  return x - Math.floor(x);
}
