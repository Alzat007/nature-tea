'use client';
import { useLanguage } from '@/components/experience/LanguageProvider';
import dynamic from 'next/dynamic';
import { useState, useMemo, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import HeroScene from '../scenes/HeroScene';
import { RitualScene, LeafScene } from '../scenes/RitualScene';
import WhyTeaScene, { AdvantagesScene } from '../scenes/WhyTeaScene';
import HistoryScene from '../scenes/HistoryScene';
import ProductScene from '../scenes/ProductScene';
import ScrollController from './ScrollController';
import WebMCP from './WebMCP';
import CanvasBoundary from '../canvas/CanvasBoundary';
import {
  chapterIds,
  initialMotion,
  type Chapter,
  type DebugConfig,
} from '@/models/config';
import type { Product } from '@/data/tea';
const World = dynamic(() => import('../canvas/World'), { ssr: false });
const DebugPanel = dynamic(() => import('./DebugPanel'), { ssr: false });
export default function Experience() {
  const { t } = useLanguage();

  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [chapter, setChapter] = useState<Chapter>('home');
  const [why, setWhy] = useState(0);
  const [craft, setCraft] = useState(0);
  const [history, setHistory] = useState(0);
  const [finale, setFinale] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [mobile, setMobile] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);
  const [debug, setDebug] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(1);
  const motion = useMemo(initialMotion, []);
  useEffect(() => {
    if (chapter === 'leaf') setOpen(true);
  }, [chapter]);
  const toggle = useCallback(() => setOpen((v) => !v), []);
  const onProduct = useCallback((p: Product) => setProduct(p), []);
  const changeDebug = useCallback(
    (c: DebugConfig) => {
      motion.debug = c;
      setScrollSpeed(c.scrollSpeed);
    },
    [motion],
  );
  useEffect(() => {
    const media = matchMedia('(max-width: 700px)');
    const pref = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      setMobile(media.matches);
      setReduced(pref.matches);
    };
    update();
    media.addEventListener('change', update);
    pref.addEventListener('change', update);
    setDebug(new URLSearchParams(location.search).has('debug'));
    return () => {
      media.removeEventListener('change', update);
      pref.removeEventListener('change', update);
    };
  }, []);
  useEffect(() => {
    const anim = gsap.to(motion, {
      openProgress: open ? 1 : 0,
      duration: reduced || paused ? 0.01 : motion.debug.timing,
      ease: 'power2.inOut',
      overwrite: 'auto',
    });
    return () => {
      anim.kill();
    };
  }, [open, motion, reduced, paused]);
  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (reduced || paused) return;
      motion.pointerX = (e.clientX / innerWidth) * 2 - 1;
      motion.pointerY = 1 - (e.clientY / innerHeight) * 2;
      document.documentElement.style.setProperty(
        '--mouse-x',
        `${50 + motion.pointerX * 5}%`,
      );
      document.documentElement.style.setProperty(
        '--mouse-y',
        `${45 - motion.pointerY * 5}%`,
      );
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [motion, reduced, paused]);
  return (
    <div
      className={`experience chapter-${chapter} ${reduced || paused ? 'reduced-motion' : ''}`}
      data-chapter={chapter}
      data-lid-open={open}
    >
      <a className="skip-link" href="#ritual">
        {t('Skip to the story')}
      </a>
      <div
        className="world"
        aria-label={t(
          'Interactive metallic tea vessel. Use the Open button or click its lid.',
        )}
      >
        <CanvasBoundary>
          <World
            motion={motion}
            onToggle={toggle}
            onHover={setHover}
            mobile={mobile}
            reduced={reduced || paused}
          />
        </CanvasBoundary>
      </div>
      <header className="site-header">
        <a
          className="wordmark"
          href="#home"
          aria-label={t('NATURE Uyghur Medicinal Tea, return to beginning')}
        >
          NATURE<span>{t('UYGHUR MEDICINAL TEA')}</span>
        </a>
        <nav aria-label={t('Main navigation')}>
          <a href="#ritual">{t('TEA & HOSPITALITY')}</a>
          <a href="#collection">{t('FORMULAS')}</a>
          <a href="#history">
            {t('HERITAGE')} <span>↗</span>
          </a>
        </nav>
      </header>
      <div className="chapter-rail" aria-label={t('Experience chapters')}>
        {chapterIds.map((id, i) => (
          <a
            key={id}
            className={chapter === id ? 'active' : ''}
            href={`#${id}`}
            aria-label={`${t('CHAPTER')} ${i + 1}: ${t(id)}`}
            aria-current={chapter === id ? 'step' : undefined}
          >
            <span>0{i + 1}</span>
            <i />
          </a>
        ))}
      </div>
      <main>
        <HeroScene open={open} toggle={toggle} hovered={hover} />
        <RitualScene open={open} toggle={toggle} />
        <LeafScene />
        <WhyTeaScene active={why} />
        <AdvantagesScene active={craft} />
        <ProductScene
          reduced={reduced || paused}
          selected={product}
          onSelect={setProduct}
        />
        <HistoryScene active={history} finale={finale} />
      </main>
      <footer className="site-footer">
        <a href="#home" className="wordmark">
          NATURE<span>{t('UYGHUR MEDICINAL TEA')}</span>
        </a>
        <p>
          {t('AN EXPLORATION OF UYGHUR MEDICINAL TEA, CRAFT & CULTURE.')}
          <br />
          <span>{t('Cultural introduction / 2026')}</span>
        </p>
        <button onClick={() => setPaused((v) => !v)} aria-pressed={paused}>
          {paused ? t('RESUME MOTION') : t('PAUSE MOTION')}{' '}
          <span>{paused ? '▷' : 'Ⅱ'}</span>
        </button>
      </footer>
      <div className="page-progress" aria-hidden />
      <ScrollController
        motion={motion}
        reduced={reduced || paused}
        onChapter={setChapter}
        onWhy={setWhy}
        onCraft={setCraft}
        onHistory={setHistory}
        onFinale={setFinale}
        scrollSpeed={scrollSpeed}
      />
      <WebMCP setOpen={setOpen} onProduct={onProduct} />
      {debug && <DebugPanel onChange={changeDebug} />}
    </div>
  );
}
