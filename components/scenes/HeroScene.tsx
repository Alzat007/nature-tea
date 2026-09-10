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
      <p className="hero-topline">{t('KNOWN AS “CHAY” IN UYGHUR')}</p>
      <span className="hero-index">{t('NATIONAL ICH CRAFT / HOTAN')}</span>
      <h1 className="hero-title" aria-label={t('UYGHUR MEDICINAL TEA')}>
        <span>{t('UYGHUR')}</span>
        <span>{t('HERBAL TEA')}</span>
      </h1>
      <div className="hero-bottom">
        <div>
          <h2>{t('Nine centuries, one living cup.')}</h2>
          <p>{t('FROM XINJIANG. SHARED EVERY DAY.')}</p>
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
