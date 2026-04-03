import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/client';
import { useAuthStore } from '../../store/authStore';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Toast, { useToast } from '../../components/ui/Toast';
import { formatDate } from '../../utils/dates';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, setUser, clear } = useAuthStore();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: '', surgery_date: '' });
  const [loading, setLoading] = useState(false);
  const { toast, setToast, showToast } = useToast();

  useEffect(() => {
    api.get('/profile').then(({ data }) => {
      setProfile(data);
      setForm({ name: data.name, surgery_date: data.surgery_date?.slice(0, 10) || '' });
    });
  }, []);

  async function handleSaveProfile(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.put('/profile', form);
      setProfile(data);
      setUser(data);
      setEditing(false);
      showToast('Profiel opgeslagen.', 'success');
    } catch {
      showToast('Opslaan mislukt.', 'error');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try { await api.post('/auth/logout'); } catch { /* ignore */ }
    clear();
    navigate('/login');
  }

  if (!profile) return <div style={styles.loading}>Laden…</div>;

  const daysSinceSurgery = profile.surgery_date
    ? Math.floor((Date.now() - new Date(profile.surgery_date)) / 86400000)
    : null;

  return (
    <main className="page">
      <h1 className="page-title">Profiel</h1>

      {daysSinceSurgery !== null && (
        <Card style={styles.recoveryCard}>
          <p style={styles.recoveryDays}>{daysSinceSurgery}</p>
          <p style={styles.recoveryLabel}>dagen na de operatie</p>
          <p style={styles.recoveryDate}>Operatiedatum: {formatDate(profile.surgery_date)}</p>
        </Card>
      )}

      <Card style={{ marginBottom: 'var(--space-4)' }}>
        {!editing ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div>
              <p style={styles.fieldLabel}>Naam</p>
              <p style={styles.fieldValue}>{profile.name}</p>
            </div>
            <div>
              <p style={styles.fieldLabel}>E-mailadres</p>
              <p style={styles.fieldValue}>{profile.email}</p>
            </div>
            {profile.surgery_date && (
              <div>
                <p style={styles.fieldLabel}>Operatiedatum</p>
                <p style={styles.fieldValue}>{formatDate(profile.surgery_date)}</p>
              </div>
            )}
            <Button variant="secondary" onClick={() => setEditing(true)}>
              Gegevens wijzigen
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <h2 style={styles.formTitle}>Gegevens wijzigen</h2>
            <Input
              label="Naam"
              id="edit-name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <Input
              label="Operatiedatum"
              id="edit-surgery"
              type="date"
              value={form.surgery_date}
              onChange={(e) => setForm({ ...form, surgery_date: e.target.value })}
            />
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <Button type="button" variant="ghost" fullWidth onClick={() => setEditing(false)}>Annuleren</Button>
              <Button type="submit" fullWidth loading={loading}>Opslaan</Button>
            </div>
          </form>
        )}
      </Card>

      <Button variant="danger" fullWidth onClick={handleLogout} style={{ marginTop: 'var(--space-4)' }}>
        Uitloggen
      </Button>

      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </main>
  );
}

const styles = {
  loading: { display: 'flex', justifyContent: 'center', padding: '48px', color: 'var(--color-text-muted)' },
  recoveryCard: {
    background: 'var(--color-primary-bg)', border: '1px solid var(--color-primary-light)',
    textAlign: 'center', marginBottom: 'var(--space-5)',
  },
  recoveryDays: { fontSize: '56px', fontWeight: '800', color: 'var(--color-primary)', lineHeight: 1 },
  recoveryLabel: { fontSize: 'var(--text-lg)', color: 'var(--color-primary-dark)', fontWeight: '600', marginTop: 'var(--space-2)' },
  recoveryDate: { fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginTop: 'var(--space-2)' },
  fieldLabel: { fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--color-text-muted)', marginBottom: '2px' },
  fieldValue: { fontSize: 'var(--text-base)', color: 'var(--color-text)' },
  formTitle: { fontSize: 'var(--text-xl)', fontWeight: '700' },
};
