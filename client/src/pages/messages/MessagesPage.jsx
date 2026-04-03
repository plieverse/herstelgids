import { useState, useEffect, useRef } from 'react';
import api from '../../api/client';
import { useAuthStore } from '../../store/authStore';
import Button from '../../components/ui/Button';
import Toast, { useToast } from '../../components/ui/Toast';
import { formatDateTime } from '../../utils/dates';

export default function MessagesPage() {
  const user = useAuthStore((s) => s.user);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const { toast, setToast, showToast } = useToast();
  const bottomRef = useRef(null);

  useEffect(() => {
    api.get('/messages').then(({ data }) => {
      setMessages(data);
      // Mark care messages as read
      data.filter((m) => m.sender_type === 'care' && !m.read_at).forEach((m) => {
        api.put(`/messages/${m.id}/read`).catch(() => {});
      });
    }).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSend(e) {
    e.preventDefault();
    if (!content.trim()) return;
    setSending(true);
    try {
      const { data } = await api.post('/messages', { content: content.trim() });
      setMessages((prev) => [...prev, data]);
      setContent('');
    } catch {
      showToast('Bericht sturen mislukt.', 'error');
    } finally {
      setSending(false);
    }
  }

  if (loading) return <div style={styles.loading}>Laden…</div>;

  return (
    <main style={styles.page}>
      <h1 style={styles.title}>Berichten</h1>

      <div style={styles.messageList}>
        {messages.length === 0 ? (
          <div style={styles.empty}>
            <p style={styles.emptyTitle}>Nog geen berichten</p>
            <p style={styles.emptyText}>U kunt hier een bericht sturen naar uw zorgteam. Zij reageren zo snel mogelijk.</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isPatient = msg.sender_type === 'patient';
            return (
              <div key={msg.id} style={{ ...styles.bubble, ...(isPatient ? styles.bubblePatient : styles.bubbleCare) }}>
                <p style={styles.bubbleSender}>{isPatient ? 'U' : 'Zorgteam'}</p>
                <p style={styles.bubbleContent}>{msg.content}</p>
                <p style={styles.bubbleTime}>{formatDateTime(msg.created_at)}</p>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} style={styles.inputArea}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Schrijf een bericht…"
          rows={3}
          style={styles.textarea}
          maxLength={2000}
          aria-label="Berichtinhoud"
        />
        <Button type="submit" fullWidth loading={sending} disabled={!content.trim()}>
          Versturen
        </Button>
      </form>

      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </main>
  );
}

const styles = {
  loading: { display: 'flex', justifyContent: 'center', padding: '48px', color: 'var(--color-text-muted)' },
  page: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: 'var(--space-6) var(--space-5)',
    paddingBottom: 'calc(var(--nav-height) + var(--space-4))',
    height: '100dvh',
    overflowY: 'auto',
  },
  title: { fontSize: 'var(--text-2xl)', fontWeight: '700', marginBottom: 'var(--space-5)' },
  messageList: { flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', overflowY: 'auto', marginBottom: 'var(--space-4)' },
  bubble: {
    maxWidth: '85%', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)',
  },
  bubblePatient: {
    alignSelf: 'flex-end',
    background: 'var(--color-primary)',
    color: '#fff',
    borderBottomRightRadius: '4px',
  },
  bubbleCare: {
    alignSelf: 'flex-start',
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderBottomLeftRadius: '4px',
  },
  bubbleSender: { fontSize: 'var(--text-xs)', fontWeight: '700', opacity: 0.7, marginBottom: '4px' },
  bubbleContent: { fontSize: 'var(--text-base)', lineHeight: 1.5 },
  bubbleTime: { fontSize: '11px', opacity: 0.6, marginTop: '6px', textAlign: 'right' },
  empty: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-8)', textAlign: 'center', gap: 'var(--space-3)' },
  emptyTitle: { fontSize: 'var(--text-lg)', fontWeight: '700', color: 'var(--color-text)' },
  emptyText: { fontSize: 'var(--text-base)', color: 'var(--color-text-muted)', lineHeight: 1.6 },
  inputArea: { display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-border)' },
  textarea: {
    padding: '14px 16px', borderRadius: 'var(--radius-md)',
    border: '2px solid var(--color-border)', background: 'var(--color-surface)',
    fontSize: 'var(--text-base)', resize: 'none', color: 'var(--color-text)',
    fontFamily: 'inherit',
  },
};
