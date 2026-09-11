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
        <span>01</span> {t('TEA & HOSPITALITY')}
      </div>
      <div className="ritual-copy">
        <p className="eyebrow">{t('A CUP THAT BRINGS PEOPLE TOGETHER')}</p>
        <h2>
          {t('More than a drink.')}
          <br />
          <em>{t('A way of welcome.')}</em>
        </h2>
        <p className="body-copy">
          {t('“A day may pass without food, but not without tea.”')}
          <br />
          {t(
            'In Xinjiang, the saying lives through meals, visits and conversation.',
          )}
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
        <span>02</span> {t('THE BOTANICALS')}
      </div>
      <div className="leaf-copy">
        <p className="eyebrow">{t('MORE THAN THIRTY INGREDIENTS')}</p>
        <h2>
          {t('NOT TEA LEAVES')}
          <br />
          <em>{t('BUT A LIVING FORMULA.')}</em>
        </h2>
        <p className="body-copy">
          {t('Clove, rose, ginger and cardamom meet in one cup.')}
          <br />
          {t('The blend changes with the seasons.')}
        </p>
        <div className="tea-dossier">
          <div>
            <span>{t('THE HERITAGE TEA')}</span>
            <strong>{t(tea.name)}</strong>
            <i>{language === 'zh' ? tea.name : tea.chinese}</i>
          </div>
          <dl>
            <div>
              <dt>{t('ORIGIN')}</dt>
              <dd>{t(tea.origin)}</dd>
            </div>
            <div>
              <dt>{t('HERITAGE')}</dt>
              <dd>{t(tea.heritage)}</dd>
            </div>
            <div>
              <dt>{t('INGREDIENTS')}</dt>
              <dd>{t(tea.ingredients)}</dd>
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
