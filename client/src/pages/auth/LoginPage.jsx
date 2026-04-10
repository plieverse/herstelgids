import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/client';
import { useAuthStore } from '../../store/authStore';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      setAuth(data.accessToken, data.refreshToken, data.user);
      navigate('/dagboek');
    } catch (err) {
      setError(err.response?.data?.error || 'Inloggen mislukt. Probeer opnieuw.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div style={styles.logo}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="12" fill="var(--color-primary)" />
            <path d="M12 20c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M20 12v3M20 25v3M14 20h-3M29 20h-3" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
        <h1 style={styles.appName}>HerstelGids</h1>
        <p style={styles.tagline}>Uw persoonlijke gids voor herstel</p>
      </div>

      <form onSubmit={handleSubmit} style={styles.form} noValidate>
        <h2 style={styles.title}>Inloggen</h2>

        {error && (
          <div role="alert" style={styles.errorBox}>{error}</div>
        )}

        <Input
          label="E-mailadres"
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          autoComplete="email"
          required
        />

        <Input
          label="Wachtwoord"
          id="password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          autoComplete="current-password"
          required
        />

        <Button type="submit" fullWidth loading={loading} size="lg">
          Inloggen
        </Button>

        <p style={styles.switchText}>
          Nog geen account?{' '}
          <Link to="/registreren" style={styles.link}>
            Registreren
          </Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    minheight: '736px',
    padding: 'var(--space-8) var(--space-5)',
    background: 'var(--color-bg)',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 'var(--space-10)',
    paddingBottom: 'var(--space-8)',
    gap: 'var(--space-3)',
  },
  logo: {
    marginBottom: 'var(--space-2)',
  },
  appName: {
    fontSize: 'var(--text-3xl)',
    fontWeight: '800',
    color: 'var(--color-primary-dark)',
    letterSpacing: '-0.5px',
  },
  tagline: {
    fontSize: 'var(--text-base)',
    color: 'var(--color-text-muted)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-5)',
    background: 'var(--color-surface)',
    borderRadius: 'var(--radius-xl)',
    padding: 'var(--space-8) var(--space-6)',
    boxShadow: 'var(--shadow-md)',
  },
  title: {
    fontSize: 'var(--text-xl)',
    fontWeight: '700',
    color: 'var(--color-text)',
  },
  errorBox: {
    padding: 'var(--space-4)',
    borderRadius: 'var(--radius-md)',
    background: 'var(--color-error-bg)',
    color: 'var(--color-error)',
    fontSize: 'var(--text-sm)',
    fontWeight: '500',
  },
  switchText: {
    textAlign: 'center',
    fontSize: 'var(--text-sm)',
    color: 'var(--color-text-muted)',
  },
  link: {
    color: 'var(--color-primary)',
    fontWeight: '600',
  },
};
