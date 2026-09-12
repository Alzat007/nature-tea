import LanguageProvider from '@/components/experience/LanguageProvider';
import Experience from '@/components/experience/Experience';
export default function Home() {
  return (
    <LanguageProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            { '@type': 'Organization', '@id': 'https://nature-tea.pages.dev/#brand', name: '帕热', alternateName: '帕热 · 自然宇宙', url: 'https://nature-tea.pages.dev/', description: '帕热是以维吾尔药茶为主题的茶品牌。' },
            { '@type': 'WebSite', '@id': 'https://nature-tea.pages.dev/#website', name: '帕热', alternateName: '帕热 · 自然宇宙', url: 'https://nature-tea.pages.dev/', inLanguage: 'zh-CN', publisher: { '@id': 'https://nature-tea.pages.dev/#brand' } },
          ],
        }).replace(/</g, '\\u003c') }}
      />
      <Experience />
    </LanguageProvider>
  );
}
