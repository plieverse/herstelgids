export default function Card({ children, style: extraStyle, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        padding: 'var(--space-5)',
        boxShadow: 'var(--shadow-sm)',
        cursor: onClick ? 'pointer' : undefined,
        ...extraStyle,
      }}
    >
      {children}
    </div>
  );
}
