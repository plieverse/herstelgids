import { useEffect, useState } from 'react';

const BASE_W = 414;
const BASE_H = 736;

/**
 * Measure the "small viewport height" (svh) in pixels — the visible height
 * when the browser chrome (address bar + bottom bar) is fully visible.
 * This is the most conservative (smallest) height we'll ever have to fit into.
 * We use this so the app is never clipped by the browser chrome.
 */
function measureSvh() {
  // Modern browsers support 100svh directly in CSS
  const el = document.createElement('div');
  el.style.cssText = 'position:fixed;top:-9999px;height:100svh;visibility:hidden;pointer-events:none;';
  document.documentElement.appendChild(el);
  const h = el.offsetHeight;
  el.remove();
  // Fallback: if svh is not supported or returns 0, use innerHeight
  return h > 100 ? h : window.innerHeight;
}

const svh = measureSvh();

function calcScale(w) {
  return Math.min((w ?? window.innerWidth) / BASE_W, svh / BASE_H);
}

export default function ScaleWrapper({ children }) {
  const [scale, setScale] = useState(() => calcScale());

  useEffect(() => {
    // Only recalculate on orientation change (physical device rotation).
    // Width changes on rotation; we re-measure svh after rotation too.
    function onOrientationChange() {
      setTimeout(() => setScale(calcScale(window.innerWidth)), 300);
    }
    window.addEventListener('orientationchange', onOrientationChange);
    return () => window.removeEventListener('orientationchange', onOrientationChange);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      // Use bottom:0 instead of a fixed pixel height so the outer container
      // always covers the full screen — even when iOS Safari hides its chrome
      // and the viewport grows beyond svh. Without this, the body background
      // (grey) shows in the gap below the scaled content.
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      background: '#FFFFFF',
      overflow: 'hidden',
    }}>
      <div style={{
        width: `${BASE_W}px`,
        height: `${BASE_H}px`,
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
        overflow: 'hidden',
        position: 'relative',
        flexShrink: 0,
      }}>
        {children}
      </div>
    </div>
  );
}
