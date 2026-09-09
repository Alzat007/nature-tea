# NATURE · 自然宇宙

以金属茶杯为中心的双语 3D 品牌体验。Next.js、React、TypeScript、Three.js、React Three Fiber、Drei、GSAP ScrollTrigger、Tailwind CSS；详情弹窗采用 shadcn / Base UI。

## 本地运行

需要 Node.js 22.13+ 和 pnpm。

```sh
pnpm install
pnpm dev
```

打开 http://localhost:3000。生产版本：

```sh
pnpm typecheck
pnpm lint
pnpm build
pnpm start
```

`pnpm build` 导出至 `out/`。`pnpm start` 使用项目自带的 Node 静态服务器。可通过 `PORT` 环境变量指定端口。部署到静态服务时，将 `out/` 内容作为站点根目录。

## 如何体验

- 右上角「中文 / EN」即时切换；默认中文，浏览器会记住选择。
- 点击杯盖或「开启」按钮：先旋转，再上提；杯内暖光与茶叶随后出现。
- 滚动浏览七个章节。四段择茶理由、五段工艺和茶史使用固定滚动时间轴。
- 点击茶品模型或名称进入全屏详情；支持关闭按钮、Esc 和键盘焦点管理。
- 页尾可减少动态效果；同时尊重系统 `prefers-reduced-motion`。滚动仍可浏览文字，自动漂浮、指针视差和大幅三维旋转关闭。
- URL 加 `?debug=1`，展开右侧 Art direction 面板，可调镜头距离、杯体角度、杯盖高度、灯光、茶叶数量、滚动节奏和开盖时长。

## 内容与模型

`data/tea.ts`：茶叶资料、四段特点、五段工艺、茶品数组和茶史资料。
`data/translations.ts`：中文文案；英文原文是稳定的翻译键。
`components/experience/LanguageProvider.tsx`：语言、持久化、页面 `lang` 属性和切换后的滚动测量。
`models/config.ts`：模型 URL、网格命名、朝向和动画默认值。

网页模型 `public/models/tea-cup.glb` 来自用户提供的 `teacup_refined.blend`，为网页单独导出、简化和 Draco 压缩，约 519 KiB。光滑金属表面、分离杯盖、螺纹及「自然宇宙 / NATURE / 01」山形字标保留。原 Blender 文件未被网页导出覆盖。网页开盖属于视觉演示，不是制造公差验证。

模型采用 Y 向上，整体中心附近为原点，高约 2.63 单位。须保留 `Cup_Body`、`Cup_Lid`、`Cup_Inner`、`Logo` 四个节点，杯盖原点位于旋转轴。默认前向通过配置中的 Y 旋转校正。替换主模型时更改全局配置；每个产品也可通过 `products[].model` 指向独立 GLB。文件缺失时使用占位茶器，WebGL 不可用时保留可阅读内容。

三款茶品是同一用户杯型的材质变体，茶名、产地描述和风味为可编辑的概念展示内容，并非经核实的商业批次资料。茶史叙述区分茶文化史和品牌概念，没有虚构品牌创立年份。资料链接来自大英博物馆和联合国教科文组织，直接附于相应节点。

## 结构与性能

- `components/canvas/`：杯体、叶片、叶群、灯光、相机和产品查看器。
- `components/scenes/`：七个可访问的 HTML 叙事章节。
- `components/experience/`：状态、滚动、双语、调试和可选 WebMCP 入口。
- `components/ui/`：使用到的 shadcn 弹窗和按钮组件。
- `styles/`：基础样式与桌面、手机、中英文排版。
- `lib/`：确定性噪声和工具函数；`shaders/` 说明后续 GPU 扩展位置。

历史叶群使用单个 InstancedMesh，桌面默认 420 片、手机 150 片；开盖叶片另用一个 InstancedMesh。没有为每片叶创建 React 组件。采用本地 Draco 解码器、本地字体、缓存 GLB、克隆材质、离屏陈列暂停与自适应 DPR。桌面目标 60fps，实际帧率取决于设备和浏览器，未承诺所有设备恒定 60fps。

React Compiler 未启用；R3F 与 GSAP 使用可变对象驱动每帧动画，相关目录仅关闭不适用于该架构的 React Compiler 静态规则，其余类型、Hooks 和无障碍检查保留。第三方生成的 Draco 解码器不参与源代码 lint。

## 已验证

- TypeScript 和源代码 lint。
- 桌面与手机逐章视觉检查；开合杯盖、茶叶揭示、固定滚动切换、产品详情及 Esc 关闭、茶史汇聚。
- 右上角双语切换，导航、叙事和产品详情联动，语言选择在刷新后保留。
- WebMCP 正常参数执行及缺失/错误参数拒绝。

无账户、支付、订单或真实商品库存功能。

## Cloudflare 自动部署

正式网址为 https://nature-tea.pages.dev/，对应 GitHub 仓库 Alzat007/nature-tea。
`.github/workflows/cloudflare-pages.yml` 会在推送 main 时安装锁定依赖、检查代码、构建静态网站、部署到既有 Cloudflare Pages 项目，并检查首页、JS/CSS、杯体 GLB、Draco 和字体是否可访问。

一次性配置：

1. 仓库 Actions 变量 `CLOUDFLARE_ACCOUNT_ID` 填写现有 Cloudflare 账户 ID。
2. 仓库 Actions 密钥 `CLOUDFLARE_API_TOKEN` 填写仅限该账户的 `Account / Cloudflare Pages / Edit` 令牌。
3. 在 GitHub Actions 中手动执行或重新运行部署。不要把令牌写进源码或普通变量。

现有项目采用 Direct Upload，使用 Actions + Wrangler 可以保留原网址。GitHub Pages 也可托管此静态导出，但仓库子路径部署需要同时处理 Next.js basePath 与 GLB、Draco、字体的资源前缀，当前生产配置使用 Cloudflare 根路径。
