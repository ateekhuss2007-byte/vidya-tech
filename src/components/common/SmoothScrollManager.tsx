/**
 * ============================================================================
 * VIDYA AI — 120 FPS High-Refresh Smooth Scroll Manager
 * ============================================================================
 * Leverages Lenis (GitHub: darkroomengineering/lenis) for silky smooth,
 * 120Hz/120fps hardware-accelerated momentum scrolling across Mac ProMotion
 * and high-refresh displays.
 * 
 * Features:
 * - 120fps ProMotion display refresh sync via requestAnimationFrame
 * - Calibrated momentum interpolation (lerp: 0.1) with zero sluggish drag
 * - Automatic pause during modal dialogs and fullscreen test sessions
 * - Native accessibility respect for prefers-reduced-motion
 * - Global hook `useSmoothScroll()` and `[data-scroll-to]` event delegation
 * ============================================================================
 */

import React, { useEffect, createContext, useContext, useRef } from 'react';
import Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, options?: { offset?: number; duration?: number }) => void;
  stop: () => void;
  start: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {}
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

interface SmoothScrollManagerProps {
  children: React.ReactNode;
}

export const SmoothScrollManager: React.FC<SmoothScrollManagerProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect user's accessibility preferences for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      console.info('[VIDYA AI] Reduced motion preferred; Lenis smooth momentum disabled for accessibility.');
      return;
    }

    // Initialize Lenis optimized for 120 FPS ProMotion displays
    const lenis = new Lenis({
      lerp: 0.1, // Responsive momentum curve, responsive without floaty drag
      wheelMultiplier: 1.05,
      touchMultiplier: 1.6,
      smoothWheel: true,
      infinite: false,
      orientation: 'vertical',
      gestureOrientation: 'vertical'
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    // High-precision RAF loop synchronized with 120Hz display refresh
    let rafId: number;
    function onFrame(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(onFrame);
    }
    rafId = requestAnimationFrame(onFrame);

    // Global listener for [data-scroll-to] anchor buttons
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('[data-scroll-to]') as HTMLElement | null;
      if (target) {
        const selector = target.getAttribute('data-scroll-to');
        if (selector) {
          e.preventDefault();
          const targetEl = document.querySelector(selector);
          if (targetEl) {
            lenis.scrollTo(targetEl as HTMLElement, { offset: -70, duration: 1.2 });
          }
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);

    // Observe modal open/close states to stop background scrolling
    const observer = new MutationObserver(() => {
      const isAnyModalOpen = Boolean(
        document.querySelector('[data-state="open"][role="dialog"]') ||
        document.querySelector('.radix-dialog-open') ||
        document.body.classList.contains('modal-open')
      );
      if (isAnyModalOpen) {
        lenis.stop();
      } else {
        lenis.start();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true, attributes: true });

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      observer.disconnect();
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      delete window.__lenis;
    };
  }, []);

  const scrollTo = (
    target: string | number | HTMLElement,
    options?: { offset?: number; duration?: number }
  ) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target as any, {
        offset: options?.offset ?? -60,
        duration: options?.duration ?? 1.2
      });
    } else {
      // Fallback if reduced motion or Lenis inactive
      if (typeof target === 'string') {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: 'smooth' });
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const stop = () => lenisRef.current?.stop();
  const start = () => lenisRef.current?.start();

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef.current, scrollTo, stop, start }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};
