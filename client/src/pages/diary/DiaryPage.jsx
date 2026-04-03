import { useState, useEffect } from 'react';
import api from '../../api/client';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Toast, { useToast } from '../../components/ui/Toast';
import { formatDate, todayISO } from '../../utils/dates';

const PAIN_LABELS = ['', 'Geen pijn', '', '', 'Lichte pijn', '', 'Matige pijn', '', '', 'Zware pijn', 'Ergste pijn'];
const MOOD_LABELS = ['', 'Heel slecht', '', '', 'Niet goed', '', 'Gaat wel', '', '', 'Goed', 'Uitstekend'];

export default function DiaryPage() {
  const [entries, setEntries] = useState([]);
  const [todayEntry, setTodayEntry] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast, setToast, showToast } = useToast();

  const today = todayISO();

  useEffect(() => {
    api.get('/diary').then(({ data }) => {
      setEntries(data);
      const te = data.find((e) => e.date.slice(0, 10) === today);
      setTodayEntry(te || null);
    }).finally(() => setLoading(false));
  }, [today]);

  function onSaved(entry) {
    setTodayEntry(entry);
    setEntries((prev) => {
      const without = prev.filter((e) => e.id !== entry.id);
      return [entry, ...without].sort((a, b) => b.date.localeCompare(a.date));
    });
    setShowForm(false);
    showToast('Dagboek opgeslagen!', 'success');
  }

  if (loading) return <div style={styles.loading}>Laden…</div>;

  return (
    <main className="page">
      <h1 className="page-title">Dagboek</h1>

      {!todayEntry && !showForm && (
        <Card style={styles.checkinCard}>
          <p style={styles.checkinText}>Hoe gaat het vandaag met u?</p>
          <Button fullWidth size="lg" onClick={() => setShowForm(true)}>
            Invullen voor vandaag
          </Button>
        </Card>
      )}

      {showForm && (
        <DiaryForm
          date={today}
          onSaved={onSaved}
          onCancel={() => setShowForm(false)}
          showToast={showToast}
        />
      )}

      {todayEntry && !showForm && (
        <Card style={styles.todayCard}>
          <p style={styles.todayLabel}>Vandaag ingevuld</p>
          <EntryDetail entry={todayEntry} />
        </Card>
      )}

      {entries.filter((e) => e.date.slice(0, 10) !== today).length > 0 && (
        <section style={{ marginTop: 'var(--space-8)' }}>
          <h2 style={styles.sectionTitle}>Eerdere invoeren</h2>
          <div style={styles.entryList}>
            {entries
              .filter((e) => e.date.slice(0, 10) !== today)
              .map((entry) => (
                <Card key={entry.id} style={styles.entryCard}>
                  <p style={styles.entryDate}>{formatDate(entry.date)}</p>
                  <EntryDetail entry={entry} compact />
                </Card>
              ))}
          </div>
        </section>
      )}

      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </main>
  );
}

function DiaryForm({ date, onSaved, onCancel, showToast }) {
  const [form, setForm] = useState({
    date,
    pain_score: 5,
    mood_score: 5,
    meal_count: 0,
    notes: '',
  });
  const [loading, setLoading] = useState(false);

  function set(field) {
    return (val) => setForm((prev) => ({ ...prev, [field]: val }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/diary', {
        ...form,
        pain_score: Number(form.pain_score),
        mood_score: Number(form.mood_score),
        meal_count: Number(form.meal_count),
      });
      onSaved(data);
    } catch (err) {
      showToast(err.response?.data?.error || 'Opslaan mislukt.', 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        <h2 style={styles.formTitle}>Check-in voor vandaag</h2>

        <ScoreInput
          label="Pijnniveau"
          sublabel={PAIN_LABELS[form.pain_score]}
          value={form.pain_score}
          onChange={set('pain_score')}
          lowLabel="Geen"
          highLabel="Erg"
          color="var(--color-accent)"
        />

        <ScoreInput
          label="Stemming"
          sublabel={MOOD_LABELS[form.mood_score]}
          value={form.mood_score}
          onChange={set('mood_score')}
          lowLabel="Slecht"
          highLabel="Prima"
          color="var(--color-primary)"
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <label style={styles.fieldLabel}>Aantal maaltijden vandaag</label>
          <div style={styles.counterRow}>
            <button
              type="button"
              style={styles.counterBtn}
              onClick={() => set('meal_count')(Math.max(0, form.meal_count - 1))}
              aria-label="Minder"
            >−</button>
            <span style={styles.counterVal}>{form.meal_count}</span>
            <button
              type="button"
              style={styles.counterBtn}
              onClick={() => set('meal_count')(form.meal_count + 1)}
              aria-label="Meer"
            >+</button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <label htmlFor="notes" style={styles.fieldLabel}>
            Notities <span style={{ fontWeight: 400, color: 'var(--color-text-muted)' }}>(optioneel)</span>
          </label>
          <textarea
            id="notes"
            value={form.notes}
            onChange={(e) => set('notes')(e.target.value)}
            rows={3}
            placeholder="Hoe voelt u zich vandaag? Bijzonderheden?"
            style={styles.textarea}
          />
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Button type="button" variant="ghost" fullWidth onClick={onCancel}>
            Annuleren
          </Button>
          <Button type="submit" fullWidth loading={loading}>
            Opslaan
          </Button>
        </div>
      </form>
    </Card>
  );
}

function ScoreInput({ label, sublabel, value, onChange, lowLabel, highLabel, color }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <label style={styles.fieldLabel}>{label}</label>
        <span style={{ ...styles.scoreValue, color }}>{value}/10 — {sublabel}</span>
      </div>
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ ...styles.slider, accentColor: color }}
        aria-label={label}
      />
      <div style={styles.sliderLabels}>
        <span>{lowLabel}</span>
        <span>{highLabel}</span>
      </div>
    </div>
  );
}

function EntryDetail({ entry, compact = false }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 'var(--space-2)' : 'var(--space-3)', marginTop: 'var(--space-3)' }}>
      <div style={styles.detailRow}>
        <ScorePill label="Pijn" value={entry.pain_score} color="var(--color-accent)" />
        <ScorePill label="Stemming" value={entry.mood_score} color="var(--color-primary)" />
        <ScorePill label="Maaltijden" value={entry.meal_count} color="var(--color-text-muted)" suffix="" />
      </div>
      {!compact && entry.notes && (
        <p style={styles.notes}>{entry.notes}</p>
      )}
    </div>
  );
}

function ScorePill({ label, value, color, suffix = '/10' }) {
  return (
    <div style={styles.pill}>
      <span style={{ ...styles.pillValue, color }}>{value}{suffix}</span>
      <span style={styles.pillLabel}>{label}</span>
    </div>
  );
}

const styles = {
  loading: { display: 'flex', justifyContent: 'center', padding: '48px', color: 'var(--color-text-muted)' },
  checkinCard: { background: 'var(--color-primary-bg)', border: '1px solid var(--color-primary-light)' },
  checkinText: { fontSize: 'var(--text-lg)', fontWeight: '600', marginBottom: 'var(--space-4)', color: 'var(--color-primary-dark)' },
  todayCard: { borderLeft: '4px solid var(--color-primary)' },
  todayLabel: { fontSize: 'var(--text-sm)', fontWeight: '700', color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' },
  sectionTitle: { fontSize: 'var(--text-lg)', fontWeight: '700', marginBottom: 'var(--space-4)', color: 'var(--color-text)' },
  entryList: { display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' },
  entryCard: {},
  entryDate: { fontWeight: '700', color: 'var(--color-text)', fontSize: 'var(--text-base)' },
  formTitle: { fontSize: 'var(--text-xl)', fontWeight: '700', color: 'var(--color-text)' },
  fieldLabel: { fontSize: 'var(--text-base)', fontWeight: '600', color: 'var(--color-text)' },
  scoreValue: { fontSize: 'var(--text-sm)', fontWeight: '600' },
  slider: { width: '100%', height: '6px', cursor: 'pointer' },
  sliderLabels: { display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' },
  counterRow: { display: 'flex', alignItems: 'center', gap: 'var(--space-4)' },
  counterBtn: {
    width: '48px', height: '48px', borderRadius: 'var(--radius-full)',
    background: 'var(--color-surface-2)', border: '2px solid var(--color-border)',
    fontSize: 'var(--text-xl)', fontWeight: '700', color: 'var(--color-text)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer',
  },
  counterVal: { fontSize: 'var(--text-2xl)', fontWeight: '700', minWidth: '2ch', textAlign: 'center' },
  textarea: {
    padding: '14px 16px', borderRadius: 'var(--radius-md)',
    border: '2px solid var(--color-border)', background: 'var(--color-surface)',
    fontSize: 'var(--text-base)', resize: 'vertical', minHeight: '80px',
    color: 'var(--color-text)', fontFamily: 'inherit',
  },
  detailRow: { display: 'flex', gap: 'var(--space-3)' },
  pill: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 'var(--space-3)', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-md)' },
  pillValue: { fontSize: 'var(--text-xl)', fontWeight: '700' },
  pillLabel: { fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '2px' },
  notes: { fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', fontStyle: 'italic', padding: 'var(--space-3)', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-md)', lineHeight: 1.6 },
};
