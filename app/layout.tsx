import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: '帕热 · 自然宇宙 | 维吾尔药茶',
  description:
    '帕热 · 自然宇宙，以一盏草木连接自然与日常。探索维吾尔药茶的植物香气、四季配伍与待客文化。',
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
