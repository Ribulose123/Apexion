'use client';
import { useEffect } from "react";

declare global {
  interface Window {
    _smartsupp?: { key: string };
    smartsupp?: unknown;
  }
}

export default function ChatWidget() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    window._smartsupp = { key: '1e187f723b9eadb76b7ef851f751a2d299b6230a' };

    if (!window.smartsupp) {
      const script = document.createElement('script');
      script.src = 'https://www.smartsuppchat.com/loader.js?';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return null;
}