'use client';
import { useLanguage } from '@/components/experience/LanguageProvider';
import { tea } from '@/data/tea';
export function RitualScene({
  open,
  toggle,
}: {
  open: boolean;
  toggle: () => void;
}) {
  const { t } = useLanguage();

  return (
    <section id="ritual" className="ritual story-section">
      <div className="section-marker">
        <span>01</span> {t('THE RITUAL')}
      </div>
      <div className="ritual-copy">
        <p className="eyebrow">{t('A MOMENT, JUST FOR YOU')}</p>
        <h2>
          {t('A ritual.')}
          <br />
          <em>{t('Not a routine.')}</em>
        </h2>
        <p className="body-copy">
          {t('A gentle twist. A little warmth.')}
          <br />
          {t('Some things ask only that we slow down.')}
        </p>
        <button
          className="line-button"
          onClick={toggle}
          aria-label={open ? t('Close the vessel') : t('Twist open the vessel')}
        >
          {open ? t('CLOSE THE VESSEL') : t('TWIST TO DISCOVER')} <span>↗</span>
        </button>
        <span className="interaction-note">
          {t('TOUCH THE LID. LET THE MOMENT OPEN.')}
        </span>
      </div>
    </section>
  );
}
export function LeafScene() {
  const { t, language } = useLanguage();

  return (
    <section id="leaf" className="leaf-section story-section">
      <div className="section-marker">
        <span>02</span> {t('THE LEAF')}
      </div>
      <div className="leaf-copy">
        <p className="eyebrow">{t('A WORLD INSIDE')}</p>
        <h2>
          {t('FROM LEAF')}
          <br />
          <em>{t('TO CUP.')}</em>
        </h2>
        <p className="body-copy">
          {t('Every leaf carries a place.')}
          <br />
          {t('Every cup brings you a little closer.')}
        </p>
        <div className="tea-dossier">
          <div>
            <span>{t('THE TEA')}</span>
            <strong>{t(tea.name)}</strong>
            <i>{language === 'zh' ? tea.name : tea.chinese}</i>
          </div>
          <dl>
            <div>
              <dt>{t('ORIGIN')}</dt>
              <dd>{t(tea.origin)}</dd>
            </div>
            <div>
              <dt>{t('ALTITUDE')}</dt>
              <dd>{t(tea.altitude)}</dd>
            </div>
            <div>
              <dt>{t('HARVEST')}</dt>
              <dd>{t(tea.harvest)}</dd>
            </div>
            <div>
              <dt>{t('CRAFT')}</dt>
              <dd>{t(tea.processing)}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
