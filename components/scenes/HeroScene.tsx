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
      <p className="hero-topline">{t('A QUIETER KIND OF EXTRAORDINARY')}</p>
      <span className="hero-index">{t('OBJECT 01 / THE TEA VESSEL')}</span>
      <h1 className="hero-title" aria-label={t('A CUP OF TEA')}>
        <span>{t('A CUP')}</span>
        <span>{t('OF TEA')}</span>
      </h1>
      <div className="hero-bottom">
        <div>
          <h2>{t('Shaped by time.')}</h2>
          <p>{t('FROM THE EARTH. FOR THE EVERYDAY.')}</p>
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
