import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/client';
import { useAuthStore } from '../../store/authStore';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function RegisterPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    surgery_date: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function set(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (form.password.length < 8) {
      setError('Wachtwoord moet minimaal 8 tekens bevatten.');
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', form);
      setAuth(data.accessToken, data.refreshToken, data.user);
      navigate('/dagboek');
    } catch (err) {
      setError(err.response?.data?.error || 'Registratie mislukt. Probeer opnieuw.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.appName}>HerstelGids</h1>
        <p style={styles.tagline}>Maak een nieuw account aan</p>
      </div>

      <form onSubmit={handleSubmit} style={styles.form} noValidate>
        <h2 style={styles.title}>Registreren</h2>

        {error && (
          <div role="alert" style={styles.errorBox}>{error}</div>
        )}

        <Input
          label="Uw naam"
          id="name"
          value={form.name}
          onChange={set('name')}
          autoComplete="name"
          required
        />
        <Input
          label="E-mailadres"
          id="email"
          type="email"
          value={form.email}
          onChange={set('email')}
          autoComplete="email"
          required
        />
        <Input
          label="Wachtwoord"
          id="password"
          type="password"
          value={form.password}
          onChange={set('password')}
          hint="Minimaal 8 tekens"
          autoComplete="new-password"
          required
        />
        <Input
          label="Datum van operatie (optioneel)"
          id="surgery_date"
          type="date"
          value={form.surgery_date}
          onChange={set('surgery_date')}
        />

        <Button type="submit" fullWidth loading={loading} size="lg">
          Account aanmaken
        </Button>

        <p style={styles.switchText}>
          Al een account?{' '}
          <Link to="/login" style={styles.link}>
            Inloggen
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
    minHeight: '100dvh',
    padding: 'var(--space-8) var(--space-5)',
    background: 'var(--color-bg)',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 'var(--space-8)',
    paddingBottom: 'var(--space-6)',
    gap: 'var(--space-2)',
  },
  appName: {
    fontSize: 'var(--text-2xl)',
    fontWeight: '800',
    color: 'var(--color-primary-dark)',
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
