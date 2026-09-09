import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'NATURE — A cup shaped by time',
  description:
    '自然宇宙。An exploration of tea, time and the objects we choose to keep.',
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
