import * as THREE from 'three';
export function createLeafGeometry() {
  const v: number[] = [];
  const cols: number[] = [];
  const ix: number[] = [];
  const rows = 16;
  for (let i = 0; i <= rows; i++) {
    const t = i / rows;
    const w = Math.sin(Math.PI * t) * 0.064 * (i % 2 === 0 ? 1 : 0.94);
    for (let j = 0; j < 3; j++) {
      const side = j - 1;
      v.push(
        side * w,
        Math.sin(t * Math.PI) * 0.011 * (j === 1 ? 1 : -0.35),
        t * 0.29 - 0.145,
      );
      const c = new THREE.Color(j === 1 ? '#8a9c51' : '#52632d');
      c.multiplyScalar(0.7 + t * 0.3);
      cols.push(c.r, c.g, c.b);
    }
  }
  for (let i = 0; i < rows; i++)
    for (let j = 0; j < 2; j++) {
      const a = i * 3 + j,
        b = a + 1,
        c = a + 3,
        d = c + 1;
      ix.push(a, c, b, b, c, d);
    }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(v, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
  g.setIndex(ix);
  g.computeVertexNormals();
  return g;
}
