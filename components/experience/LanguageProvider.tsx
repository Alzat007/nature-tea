'use client';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { zh } from '@/data/translations';
type Language = 'zh' | 'en';
const LanguageContext = createContext({
  language: 'zh' as Language,
  setLanguage: (_v: Language) => {},
  t: (text: string) => text,
});
export function useLanguage() {
  return useContext(LanguageContext);
}
export default function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [language, setValue] = useState<Language>('zh');
  useEffect(() => {
    try {
      const saved = localStorage.getItem('nature-language');
      if (saved === 'en' || saved === 'zh') setValue(saved);
    } catch {}
  }, []);
  const setLanguage = useCallback((value: Language) => {
    setValue(value);
    try {
      localStorage.setItem('nature-language', value);
    } catch {}
  }, []);
  const t = useCallback(
    (text: string) => (language === 'zh' ? (zh[text] ?? text) : text),
    [language],
  );
  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    let frame = 0;
    let disposed = false;
    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        if (!disposed) ScrollTrigger.refresh();
      });
    });
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
    };
  }, [language]);
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
      <LanguageSwitch className="global-language-switch" />
    </LanguageContext.Provider>
  );
}

export function LanguageSwitch({ className = '' }: { className?: string }) {
  const { language, setLanguage } = useLanguage();
  return (
    <fieldset
      className={`language-switch ${className}`}
      aria-label={language === 'zh' ? '选择语言' : 'Choose language'}
    >
      <button
        type="button"
        lang="zh-CN"
        aria-pressed={language === 'zh'}
        onClick={() => setLanguage('zh')}
      >
        中文
      </button>
      <span aria-hidden>/</span>
      <button
        type="button"
        lang="en"
        aria-pressed={language === 'en'}
        onClick={() => setLanguage('en')}
      >
        EN
      </button>
    </fieldset>
  );
}
