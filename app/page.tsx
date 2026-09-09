import LanguageProvider from '@/components/experience/LanguageProvider';
import Experience from '@/components/experience/Experience';
export default function Home() {
  return (
    <LanguageProvider>
      <Experience />
    </LanguageProvider>
  );
}
