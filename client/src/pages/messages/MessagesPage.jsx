import { useState, useEffect, useRef } from 'react';
import api from '../../api/client';
import { useAuthStore } from '../../store/authStore';
import Toast, { useToast } from '../../components/ui/Toast';
import BottomNav from '../../components/layout/BottomNav';
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

  return (
    <div style={{
      position: 'relative', width: '100%', maxWidth: '414px',
      height: '100dvh', minHeight: '736px', margin: '0 auto',
      background: '#F6F6F6', fontFamily: 'Inter, sans-serif',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>

      {/* ── Topbar ── */}
      <div style={{
        position: 'absolute', left: 0, top: 0, width: '414px', height: '73px',
        background: '#FFFFFF', zIndex: 10,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '5px 0 0',
      }}>
        <div style={{
          display: 'flex', flexDirection: 'row',
          justifyContent: 'space-between', alignItems: 'center',
          padding: '0px 10px', width: '414px', height: '40px',
          boxSizing: 'border-box',
        }}>
          {/* Title with decorative circle */}
          <div style={{
            position: 'relative', display: 'flex', alignItems: 'center',
            padding: '0px 0px 0px 10px', width: '150px', height: '34px',
          }}>
            <div style={{
              position: 'absolute', width: '29px', height: '29px',
              left: '0px', top: '3px', borderRadius: '50%',
              background: '#E6F4F2', zIndex: 1,
            }} />
            <span style={{
              fontFamily: 'Inter', fontWeight: 700, fontSize: '24px',
              lineHeight: '29px', color: '#377B8A',
              position: 'relative', zIndex: 2,
            }}>Berichten</span>
          </div>

          {/* Profile icon */}
          <div style={{ width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#377B8A', userSelect: 'none' }}>account_circle</span>
          </div>
        </div>
      </div>

      {/* ── Notification / expectation box ── */}
      <div style={{
        position: 'absolute', left: '38px', top: '100px',
        width: '346px', height: '70px',
        background: '#E6F4F2', borderRadius: '10px',
        zIndex: 5,
      }}>
        {/* Circle behind icon */}
        <div style={{
          position: 'absolute', width: '31px', height: '31px',
          left: '12px', top: '18.5px',
          borderRadius: '50%', background: '#D0E9E5',
        }} />
        {/* Warning icon */}
        <div style={{
          position: 'absolute', left: '10px', top: '14px',
          width: '35px', height: '35px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span className="material-symbols-outlined" style={{
            fontSize: '22px', color: '#377B8A', userSelect: 'none',
          }}>warning</span>
        </div>
        {/* Text */}
        <div style={{
          position: 'absolute', left: '55px', top: '5px',
          width: '245px', height: '60px',
          display: 'flex', alignItems: 'center',
          fontFamily: 'Inter', fontWeight: 400, fontSize: '12px',
          lineHeight: '15px', color: '#727272',
        }}>
          Zorgverleners kunnen niet altijd meteen je vraag beantwoorden. Binnen 24 uur proberen ze je bericht(en) te beantwoorden.
        </div>
      </div>

      {/* ── Messages list ── */}
      <div style={{
        position: 'absolute', left: 0, top: '180px',
        width: '414px', bottom: '120px',
        overflowY: 'auto', padding: '0 20px',
        boxSizing: 'border-box', display: 'flex',
        flexDirection: 'column', gap: '12px',
      }}>
        {loading ? (
          <div style={{ textAlign: 'center', color: '#B3B2B2', marginTop: '40px', fontSize: '14px' }}>Laden…</div>
        ) : messages.length === 0 ? (
          /* empty – notification box is already visible above */
          null
        ) : (
          messages.map((msg) => {
            const isPatient = msg.sender_type === 'patient';
            return (
              <div key={msg.id} style={{
                alignSelf: isPatient ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                background: isPatient ? '#377B8A' : '#FFFFFF',
                color: isPatient ? '#FFFFFF' : '#333333',
                borderRadius: isPatient ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                padding: '12px 16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              }}>
                {!isPatient && (
                  <div style={{
                    fontFamily: 'Inter', fontWeight: 700, fontSize: '12px',
                    color: '#377B8A', marginBottom: '4px',
                  }}>Zorgteam</div>
                )}
                <div style={{
                  fontFamily: 'Inter', fontWeight: 400, fontSize: '14px',
                  lineHeight: '20px',
                }}>{msg.content}</div>
                <div style={{
                  fontFamily: 'Inter', fontWeight: 400, fontSize: '11px',
                  color: isPatient ? 'rgba(255,255,255,0.7)' : '#B3B2B2',
                  marginTop: '6px', textAlign: 'right',
                }}>{formatDateTime(msg.created_at)}</div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* ── Input area ── */}
      <div style={{
        position: 'absolute', left: 0, bottom: '58px',
        width: '414px', height: '62px',
        background: '#FFFFFF',
        borderTop: '1px solid #E8E8E8',
        display: 'flex', flexDirection: 'row',
        alignItems: 'center', padding: '0 16px',
        boxSizing: 'border-box', gap: '10px',
      }}>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { handleSend(e); } }}
          placeholder="Schrijf een bericht…"
          maxLength={2000}
          style={{
            flex: 1, height: '38px',
            background: '#F6F6F6', border: 'none',
            borderRadius: '19px', padding: '0 16px',
            fontFamily: 'Inter', fontSize: '14px', color: '#333',
            outline: 'none',
          }}
        />
        <button
          onClick={handleSend}
          disabled={!content.trim() || sending}
          style={{
            width: '38px', height: '38px', borderRadius: '50%',
            background: content.trim() ? '#377B8A' : '#E8E8E8',
            border: 'none', cursor: content.trim() ? 'pointer' : 'default',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, transition: 'background 0.2s',
          }}
        >
          <span className="material-symbols-outlined" style={{
            fontSize: '20px', color: content.trim() ? '#FFFFFF' : '#B3B2B2',
            userSelect: 'none',
          }}>send</span>
        </button>
      </div>

      {/* ── Bottom Nav ── */}
      <BottomNav />

      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}
