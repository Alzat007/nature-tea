const origin = new URL(process.argv[2] || 'https://nature-tea.pages.dev/');
async function get(path) {
  const url = new URL(path, origin);
  const response = await fetch(url, {
    signal: AbortSignal.timeout(20000),
    cache: 'no-store',
    headers: { 'cache-control': 'no-cache' },
  });
  if (!response.ok) throw new Error(`${url.pathname}: HTTP ${response.status}`);
  return response;
}

const hasCurrentHomepage = (html) =>
  html.includes('帕热') &&
  html.includes('自然宇宙') &&
  !html.includes('和田') &&
  html.includes('维吾尔药茶') &&
  html.includes('Uyghur Medicinal Tea') &&
  html.includes('中文') &&
  html.includes('EN');

async function getCurrentHomepage() {
  let lastError;
  for (let attempt = 1; attempt <= 7; attempt++) {
    try {
      const home = await get(`./?deployment-check=${Date.now()}`);
      const html = await home.text();
      if (hasCurrentHomepage(html)) return html;
      lastError = new Error('The production domain returned an older page.');
    } catch (error) {
      lastError = error;
    }
    if (attempt < 7) {
      console.log(`Waiting for production propagation (${attempt}/6)…`);
      await new Promise((resolve) => setTimeout(resolve, 10000));
    }
  }
  throw new Error(
    `The bilingual Uyghur medicinal tea homepage was not returned: ${lastError instanceof Error ? lastError.message : 'unknown error'}`,
  );
}

const html = await getCurrentHomepage();
const assets = [
  ...new Set(
    [...html.matchAll(/(?:src|href)="([^"]*\/_next\/[^"?#]+)[^"]*"/g)].map(
      (m) => m[1],
    ),
  ),
];
if (!assets.length) throw new Error('No Next.js production assets found.');
for (const path of assets) {
  const response = await get(path);
  if (response.headers.get('content-type')?.includes('text/html'))
    throw new Error(`Asset returned HTML: ${path}`);
}
const model = new Uint8Array(
  await (await get('models/tea-cup.glb')).arrayBuffer(),
);
if (String.fromCharCode(...model.slice(0, 4)) !== 'glTF')
  throw new Error('Invalid or missing cup model.');
const decoder = new Uint8Array(
  await (await get('draco/draco_decoder.wasm')).arrayBuffer(),
);
if (
  decoder[0] !== 0 ||
  decoder[1] !== 97 ||
  decoder[2] !== 115 ||
  decoder[3] !== 109
)
  throw new Error('Invalid Draco decoder.');
await get('draco/draco_wasm_wrapper.js');
await get('fonts/cormorant-garamond-latin-400-normal.woff');
console.log(
  `Verified ${origin.href}: bilingual Uyghur medicinal tea homepage, ${assets.length} JS/CSS assets, GLB, Draco and font.`,
);
