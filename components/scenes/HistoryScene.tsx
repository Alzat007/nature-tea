'use client';
import { useLanguage } from '@/components/experience/LanguageProvider';
import { milestones } from '@/data/tea';
export default function HistoryScene({
  active,
  finale,
}: {
  active: number;
  finale: boolean;
}) {
  const { t } = useLanguage();

  return (
    <section id="history" className="history-section story-section">
      <div
        className={`history-stage pinned-stage ${finale ? 'is-finale' : ''}`}
      >
        <div className="section-marker">
          <span>06</span> {t('A LEAF THROUGH TIME')}
        </div>
        <div
          className={`history-intro ${active === 0 && !finale ? 'active' : ''}`}
        >
          <p className="eyebrow">
            {t('THOUSANDS OF MOMENTS. ONE CONTINUOUS STORY.')}
          </p>
          <h2>
            {t('Time flows.')}
            <br />
            <em>{t('The leaf remembers.')}</em>
          </h2>
        </div>
        <div className={`milestone-wrap ${finale ? 'is-hidden' : ''}`}>
          {milestones.map((m, i) => (
            <article
              className={`milestone ${active === i ? 'active' : ''}`}
              key={t(m.year)}
              aria-hidden={active !== i}
            >
              <div className="milestone-year">
                {t(m.year)}
                <small>{i === 0 ? t('CE') : i === 1 ? '— 1000' : ''}</small>
              </div>
              <p className="eyebrow">
                {t('CHAPTER')} 0{i + 1}
              </p>
              <h3>{t(m.title)}</h3>
              <p className="body-copy">{t(m.story)}</p>
              {m.source && (
                <a
                  className="source-link"
                  href={m.source}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={active === i ? 0 : -1}
                >
                  {t(m.sourceLabel)} ↗
                </a>
              )}
            </article>
          ))}
        </div>
        <div
          className={`history-finale ${finale ? 'active' : ''}`}
          aria-hidden={!finale}
        >
          <p className="eyebrow">自然宇宙</p>
          <h2>
            {t('TIME MADE')}
            <br />
            <em>{t('VISIBLE.')}</em>
          </h2>
          <p>{t('A little nature. A little time. A little more you.')}</p>
          <a href="#home" className="line-button" tabIndex={finale ? 0 : -1}>
            {t('BEGIN AGAIN')} <span>↗</span>
          </a>
        </div>
        <div className="history-track" aria-hidden>
          {milestones.map((m, i) => (
            <span key={t(m.year)} className={active >= i ? 'active' : ''}>
              {t(m.year)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
