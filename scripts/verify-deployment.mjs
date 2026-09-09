const origin = new URL(process.argv[2] || 'https://nature-tea.pages.dev/');
async function get(path) {
  const url = new URL(path, origin);
  const response = await fetch(url, { signal: AbortSignal.timeout(20000), cache: 'no-store' });
  if (!response.ok) throw new Error(`${url.pathname}: HTTP ${response.status}`);
  return response;
}
const home = await get('./');
const html = await home.text();
if (!html.includes('NATURE') || !html.includes('中文') || !html.includes('EN')) throw new Error('The bilingual NATURE homepage was not returned.');
const assets = [...new Set([...html.matchAll(/(?:src|href)="([^"]*\/_next\/[^"?#]+)[^"]*"/g)].map(m => m[1]))];
if (!assets.length) throw new Error('No Next.js production assets found.');
for (const path of assets) {
  const response = await get(path);
  if (response.headers.get('content-type')?.includes('text/html')) throw new Error(`Asset returned HTML: ${path}`);
}
const model = new Uint8Array(await (await get('models/tea-cup.glb')).arrayBuffer());
if (String.fromCharCode(...model.slice(0,4)) !== 'glTF') throw new Error('Invalid or missing cup model.');
const decoder = new Uint8Array(await (await get('draco/draco_decoder.wasm')).arrayBuffer());
if (decoder[0] !== 0 || decoder[1] !== 97 || decoder[2] !== 115 || decoder[3] !== 109) throw new Error('Invalid Draco decoder.');
await get('draco/draco_wasm_wrapper.js');
await get('fonts/cormorant-garamond-latin-400-normal.woff');
console.log(`Verified ${origin.href}: bilingual homepage, ${assets.length} JS/CSS assets, GLB, Draco and font.`);
