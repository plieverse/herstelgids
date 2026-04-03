export default function Input({
  label,
  id,
  error,
  hint,
  type = 'text',
  ...props
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {label && (
        <label htmlFor={id} style={styles.label}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        style={{
          ...styles.input,
          borderColor: error ? 'var(--color-error)' : 'var(--color-border)',
        }}
        {...props}
      />
      {hint && !error && <p style={styles.hint}>{hint}</p>}
      {error && <p style={styles.error} role="alert">{error}</p>}
    </div>
  );
}

const styles = {
  label: {
    fontSize: 'var(--text-sm)',
    fontWeight: '600',
    color: 'var(--color-text)',
  },
  input: {
    padding: '14px 16px',
    fontSize: 'var(--text-base)',
    border: '2px solid',
    borderRadius: 'var(--radius-md)',
    background: 'var(--color-surface)',
    color: 'var(--color-text)',
    outline: 'none',
    transition: 'border-color 0.15s',
    minHeight: 'var(--touch-target)',
    width: '100%',
  },
  hint: {
    fontSize: 'var(--text-sm)',
    color: 'var(--color-text-muted)',
  },
  error: {
    fontSize: 'var(--text-sm)',
    color: 'var(--color-error)',
  },
};
