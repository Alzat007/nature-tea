import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL('https://nature-tea.pages.dev/'),
  title: '帕热官网 · 自然宇宙 | 维吾尔药茶品牌',
  applicationName: '帕热 · 自然宇宙',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: '帕热 · 自然宇宙',
    title: '帕热官网 · 自然宇宙 | 维吾尔药茶品牌',
    description: '帕热茶品牌，以一盏草木连接自然与日常。探索维吾尔药茶的植物香气、四季配伍与待客文化。',
    locale: 'zh_CN',
  },
  description:
    '帕热茶品牌官方网站。自然宇宙，以一盏草木连接自然与日常。探索维吾尔药茶的植物香气、四季配伍与待客文化。',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
