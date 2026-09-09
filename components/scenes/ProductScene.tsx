'use client';
import {
  LanguageSwitch,
  useLanguage,
} from '@/components/experience/LanguageProvider';
import dynamic from 'next/dynamic';
import CanvasBoundary from '../canvas/CanvasBoundary';
import { useRef, useState, useEffect } from 'react';
import { products, type Product } from '@/data/tea';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
const ProductViewer = dynamic(() => import('../canvas/ProductViewer'), {
  ssr: false,
});
export default function ProductScene({
  selected,
  onSelect,
  reduced,
}: {
  reduced: boolean;
  selected: Product | null;
  onSelect: (p: Product | null) => void;
}) {
  const { t, language } = useLanguage();

  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [seen, setSeen] = useState(false);
  const [hover, setHover] = useState(-1);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const v = entries[0].isIntersecting;
        setVisible(v);
        if (v) setSeen(true);
      },
      { rootMargin: '200px' },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <>
      <section
        ref={ref}
        id="collection"
        className="collection-section story-section"
        style={
          {
            '--collection-glow':
              hover < 0 ? '#31372b' : products[hover].gradient,
          } as React.CSSProperties
        }
      >
        <div className="section-marker">
          <span>05</span> {t('THE STUDY COLLECTION')}
        </div>
        <div className="collection-heading">
          <h2>
            {t('Find your')}
            <br />
            <em>{t('own nature.')}</em>
          </h2>
          <p>
            {t('Three expressions.')}
            <br />
            {t('One considered ritual.')}
          </p>
        </div>
        <div
          className="gallery-canvas"
          aria-label={t('Interactive three-dimensional product collection')}
        >
          {seen && (
            <CanvasBoundary>
              <ProductViewer
                reduced={reduced}
                selected={hover}
                onHover={setHover}
                onSelect={onSelect}
                active={visible && !selected}
              />
            </CanvasBoundary>
          )}
        </div>
        <div className="product-labels">
          {products.map((p, i) => (
            <button
              key={p.id}
              className={hover === i ? 'active' : ''}
              onPointerEnter={() => setHover(i)}
              onPointerLeave={() => setHover(-1)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(-1)}
              onClick={() => onSelect(p)}
              aria-label={`${t('Explore')} ${t(p.name)}`}
            >
              <span className="product-number">
                0{i + 1}
                <span>↗</span>
              </span>
              <p className="eyebrow">{t(p.category)}</p>
              <h3>{t(p.name)}</h3>
              <p className="product-description">{t(p.description)}</p>
            </button>
          ))}
        </div>
      </section>
      <Dialog
        open={selected !== null}
        onOpenChange={(v) => {
          if (!v) onSelect(null);
        }}
      >
        <DialogContent className="product-dialog" showCloseButton={false}>
          <LanguageSwitch />
          {selected && (
            <>
              <DialogClose
                className="detail-close"
                aria-label={t('Close product details')}
              >
                {t('CLOSE DETAILS')} <span>×</span>
              </DialogClose>
              <div className="detail-canvas">
                <CanvasBoundary>
                  <ProductViewer
                    reduced={reduced}
                    product={selected}
                    selected={0}
                    onHover={() => {}}
                    onSelect={() => {}}
                  />
                </CanvasBoundary>
              </div>
              <div className="detail-copy">
                <p className="eyebrow">
                  {t('THE STUDY COLLECTION')} / {t(selected.category)}
                </p>
                <DialogTitle className="detail-title">
                  {t(selected.name)}
                  <em>
                    {language === 'zh' ? selected.name : selected.chinese}
                  </em>
                </DialogTitle>
                <DialogDescription className="detail-description">
                  {t(selected.description)}
                </DialogDescription>
                <dl>
                  <div>
                    <dt>{t('ORIGIN')}</dt>
                    <dd>{t(selected.origin)}</dd>
                  </div>
                  <div>
                    <dt>{t('CHARACTER')}</dt>
                    <dd>{t(selected.notes)}</dd>
                  </div>
                </dl>
                <p className="eyebrow">{t('YOUR DAILY RITUAL')}</p>
                <p className="body-copy">{t(selected.ritual)}</p>
                <DialogClose className="line-button">
                  {t('BACK TO THE COLLECTION')} <span>↗</span>
                </DialogClose>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
