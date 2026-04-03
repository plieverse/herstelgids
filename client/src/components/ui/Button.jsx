export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  type = 'button',
  onClick,
  style: extraStyle,
}) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: 'inherit',
    fontWeight: '600',
    borderRadius: 'var(--radius-md)',
    border: '2px solid transparent',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled || loading ? 0.6 : 1,
    transition: 'background 0.15s, transform 0.1s',
    width: fullWidth ? '100%' : undefined,
    minHeight: 'var(--touch-target)',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
  };

  const sizes = {
    sm: { padding: '8px 16px', fontSize: 'var(--text-sm)' },
    md: { padding: '12px 24px', fontSize: 'var(--text-base)' },
    lg: { padding: '16px 32px', fontSize: 'var(--text-lg)' },
  };

  const variants = {
    primary: {
      background: 'var(--color-primary)',
      color: '#fff',
    },
    secondary: {
      background: 'var(--color-primary-bg)',
      color: 'var(--color-primary-dark)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-text-muted)',
      border: '2px solid var(--color-border)',
    },
    danger: {
      background: 'var(--color-error-bg)',
      color: 'var(--color-error)',
    },
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      style={{ ...base, ...sizes[size], ...variants[variant], ...extraStyle }}
    >
      {loading ? <Spinner size={16} /> : children}
    </button>
  );
}

function Spinner({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      style={{ animation: 'spin 0.8s linear infinite' }}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}
