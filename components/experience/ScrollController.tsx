'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { chapterIds, type Chapter, type MotionState } from '@/models/config';
gsap.registerPlugin(ScrollTrigger);
type Props = {
  motion: MotionState;
  reduced: boolean;
  onChapter: (c: Chapter) => void;
  onWhy: (i: number) => void;
  onCraft: (i: number) => void;
  onHistory: (i: number) => void;
  onFinale: (v: boolean) => void;
  scrollSpeed: number;
};
export default function ScrollController({
  motion,
  reduced,
  onChapter,
  onWhy,
  onCraft,
  onHistory,
  onFinale,
  scrollSpeed,
}: Props) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const activate = (c: Chapter) => {
        motion.chapter = c;
        onChapter(c);
      };
      const sequences = [
        {
          id: 'why',
          key: 'whyProgress',
          length: 3.3,
          count: 4,
          callback: onWhy,
        },
        {
          id: 'craft',
          key: 'craftProgress',
          length: 4.2,
          count: 5,
          callback: onCraft,
        },
        {
          id: 'history',
          key: 'historyProgress',
          length: 6.4,
          count: 5,
          callback: onHistory,
        },
      ];
      // Create in document order so later chapters include earlier pin spacing.
      for (const id of chapterIds) {
        const item = sequences.find((s) => s.id === id);
        if (!item) {
          ScrollTrigger.create({
            trigger: `#${id}`,
            start: 'top 55%',
            end: 'bottom 55%',
            onToggle: (self) => {
              if (self.isActive) activate(id);
            },
            onUpdate: (self) => {
              if (self.isActive) {
                motion.progress = self.progress;
                activate(id);
              }
            },
          });
          continue;
        }
        gsap.fromTo(
          motion,
          { [item.key]: 0 },
          {
            [item.key]: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: `#${id}`,
              start: 'top top',
              end: () =>
                `+=${(window.innerHeight * item.length) / scrollSpeed}`,
              pin: `.${id}-stage`,
              scrub: reduced ? true : 0.7,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onEnter: () => activate(id),
              onEnterBack: () => activate(id),
              onUpdate: (self) => {
                const p = self.progress;
                item.callback(
                  Math.min(
                    item.count - 1,
                    Math.floor(p * (id === 'history' ? 5.8 : item.count)),
                  ),
                );
                if (id === 'history') onFinale(p > 0.85);
                if (self.isActive) activate(id);
              },
            },
          },
        );
      }
      if (!reduced)
        gsap.utils
          .toArray<HTMLElement>('.ritual-copy,.leaf-copy,.collection-heading')
          .forEach((el) => {
            gsap.fromTo(
              el,
              { y: 65, clipPath: 'inset(18% 0 0 0)', filter: 'blur(3px)' },
              {
                y: 0,
                clipPath: 'inset(0% 0 0 0)',
                filter: 'blur(0px)',
                ease: 'none',
                scrollTrigger: {
                  trigger: el,
                  start: 'top 90%',
                  end: 'top 40%',
                  scrub: 1,
                },
              },
            );
          });
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          document.documentElement.style.setProperty(
            '--film-progress',
            `${self.progress * 100}%`,
          );
        },
      });
    });
    let disposed = false;
    const refresh = () => {
      if (!disposed) ScrollTrigger.refresh();
    };
    void document.fonts.ready.then(refresh);
    window.addEventListener('load', refresh);
    return () => {
      disposed = true;
      ctx.revert();
      window.removeEventListener('load', refresh);
    };
  }, [
    motion,
    reduced,
    onChapter,
    onWhy,
    onCraft,
    onHistory,
    onFinale,
    scrollSpeed,
  ]);
  return null;
}
