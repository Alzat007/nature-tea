import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'NATURE · 维吾尔药茶 | Uyghur Medicinal Tea',
  description:
    '走近维吾尔医药（和田药茶制作技艺）：约九百年历史、三十余种药食同源植物与活在日常里的非遗传承。',
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
