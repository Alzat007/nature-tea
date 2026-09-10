'use client';
import { useLanguage } from '@/components/experience/LanguageProvider';
import { reasons, advantages } from '@/data/tea';
export default function WhyTeaScene({ active }: { active: number }) {
  const { t } = useLanguage();

  return (
    <section id="why" className="why-section story-section">
      <div className="why-stage pinned-stage">
        <div className="section-marker">
          <span>03</span> {t('THE KNOWLEDGE')}
        </div>
        <p className="eyebrow why-kicker">{t('WHAT MAKES IT DISTINCT?')}</p>
        <div className="why-panels">
          {reasons.map((r, i) => (
            <article
              key={r.id}
              className={`why-panel ${active === i ? 'active' : ''}`}
              aria-hidden={active !== i}
            >
              <span className="editorial-index">0{i + 1}</span>
              <p className="eyebrow">{t(r.title)}</p>
              <h2>{t(r.headline)}</h2>
              <p className="body-copy">{t(r.copy)}</p>
              <p className="caption">{t(r.detail)}</p>
            </article>
          ))}
        </div>
        <div className="sequence-track">
          {reasons.map((r, i) => (
            <span className={active === i ? 'active' : ''} key={r.id}>
              0{i + 1} <b>{t(r.title)}</b>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
export function AdvantagesScene({ active }: { active: number }) {
  const { t } = useLanguage();

  return (
    <section id="craft" className="craft-section story-section">
      <div className="craft-stage pinned-stage">
        <div className="section-marker">
          <span>04</span> {t('FIVE STEPS, ONE LIVING CRAFT')}
        </div>
        <div className="craft-panels">
          {advantages.map((a, i) => (
            <article
              key={t(a.word)}
              className={`craft-panel ${active === i ? 'active' : ''}`}
              aria-hidden={active !== i}
            >
              <span className="oversized-word" aria-hidden>
                {t(a.word)}
              </span>
              <div className="craft-bottom">
                <p className="eyebrow">{t(a.label)}</p>
                <h2>{t(a.title)}</h2>
                <p>{t(a.copy)}</p>
              </div>
            </article>
          ))}
        </div>
        <span className="craft-counter">
          0{active + 1} <i>/ 05</i>
        </span>
        <div className="film-rule">
          <i style={{ width: `${(active + 1) * 20}%` }} />
        </div>
      </div>
    </section>
  );
}
