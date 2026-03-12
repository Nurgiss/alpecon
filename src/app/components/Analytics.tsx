import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// ⚙️ Замените на свой реальный идентификатор:
export const GA4_MEASUREMENT_ID = 'G-J8RJ1JEH8P';   // Google Analytics 4

/**
 * Отслеживает смену страниц в SPA и отправляет события в
 * Google Analytics 4 и Яндекс.Метрику.
 * Подключается один раз внутри <BrowserRouter>.
 */
export function Analytics() {
  const { pathname, search } = useLocation();

  // useRef to skip the very first render (initial page_view is sent by GA4 automatically)
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const url = pathname + search;

    // Google Analytics 4 — SPA navigation
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: url,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [pathname, search]);

  return null;
}
