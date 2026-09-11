'use client';
import { useLanguage } from '@/components/experience/LanguageProvider';
export default function HeroScene({
  open,
  toggle,
  hovered,
}: {
  open: boolean;
  toggle: () => void;
  hovered: boolean;
}) {
  const { t } = useLanguage();

  return (
    <section id="home" className="hero story-section">
      <p className="hero-topline">{t('PARE / UYGHUR MEDICINAL TEA')}</p>
      <span className="hero-index">{t('BOTANICALS / XINJIANG')}</span>
      <h1 className="hero-title nature-title" aria-label={t('PARE · NATURE UNIVERSE')}>
        <span>{t('NATURE')}</span>
        <span>{t('UNIVERSE')}</span>
      </h1>
      <div className="hero-bottom">
        <div>
          <h2>{t('A universe in a cup.')}</h2>
          <p>{t('PARE. BOTANICALS, SEASONS & EVERYDAY RITUALS.')}</p>
        </div>
        <button
          className={`open-button ${hovered ? 'is-hovered' : ''}`}
          onClick={toggle}
          aria-label={open ? t('Close the tea cup') : t('Open the tea cup')}
          aria-pressed={open}
        >
          <span>{open ? t('CLOSE') : t('OPEN')}</span>
          <span aria-hidden>↗</span>
        </button>
      </div>
      <span className={`lid-cue ${hovered ? 'visible' : ''}`} aria-hidden>
        {open ? t('CLOSE') : t('OPEN')} {t('THE VESSEL')}
      </span>
      <a href="#ritual" className="scroll-cue">
        {t('EXPLORE')} <span>↓</span>
      </a>
    </section>
  );
}
