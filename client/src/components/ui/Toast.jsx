import { useState, useEffect } from 'react';

export function useToast() {
  const [toast, setToast] = useState(null);

  const show = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
  };

  return { toast, setToast, showToast: show };
}

export default function Toast({ toast, onDismiss }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [toast, onDismiss]);

  if (!toast) return null;

  const colors = {
    info: { bg: 'var(--color-primary)', color: '#fff' },
    success: { bg: 'var(--color-success)', color: '#fff' },
    error: { bg: 'var(--color-error)', color: '#fff' },
  };

  return (
    <div
      role="alert"
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: 'calc(var(--nav-height) + 16px)',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 40px)',
        maxWidth: '440px',
        padding: '14px 18px',
        borderRadius: 'var(--radius-md)',
        fontWeight: '600',
        fontSize: 'var(--text-sm)',
        zIndex: 200,
        boxShadow: 'var(--shadow-lg)',
        ...colors[toast.type],
      }}
    >
      {toast.message}
    </div>
  );
}
