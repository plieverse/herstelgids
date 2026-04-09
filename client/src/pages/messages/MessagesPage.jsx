import { useState, useEffect, useRef } from 'react';
import api from '../../api/client';
import Toast, { useToast } from '../../components/ui/Toast';
import BottomNav from '../../components/layout/BottomNav';
import { formatDateTime } from '../../utils/dates';

/* ── Demo messages shown in the prototype ── */
const DEMO_MESSAGES = [
  {
    id: 'demo-0',
    sender_type: 'care',
    sender_name: 'Tessa',
    sender_role: 'Verpleegkundig Specialist',
    sender_icon: 'medical_information',
    content: 'Goedemorgen meneer Jansen. Ik zie dat u heeft ingevuld dat u bent afgevallen en minder eetlust heeft. Kunt u vertellen hoe het eten de afgelopen dagen ging?',
    display_time: '14 april, 10:33',
  },
  {
    id: 'demo-1',
    sender_type: 'patient',
    content: 'Goedemorgen. Ik krijg mijn eten niet goed op. Na een paar happen zit ik al vol. Ik ben deze week weer een kilo afgevallen.',
    display_time: '14 april, 10:33',
  },
  {
    id: 'demo-2',
    sender_type: 'care',
    sender_name: 'Janny',
    sender_role: 'Dietiste',
    sender_icon: 'nutrition',
    content: 'Dank u voor uw bericht. Dat u snel vol zit, komt vaak voor na deze operatie. Het is belangrijk om vaker kleine porties te eten. Lukt het om 6 keer per dag iets kleins te nemen?',
    display_time: '14 april, 14:17',
  },
];

/* ── Received bubble (care provider) ── */
function ReceivedBubble({ msg }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: '16px', paddingRight: '60px' }}>
      {/* Left tail */}
      <div style={{
        width: 0, height: 0, flexShrink: 0,
        borderTop: '8px solid transparent',
        borderBottom: '8px solid transparent',
        borderRight: '12px solid #FFFFFF',
        marginTop: '28px',
      }} />
      {/* White bubble */}
      <div style={{
        background: '#FFFFFF', borderRadius: '5px',
        padding: '8px 15px 8px 12px', flex: 1,
        minWidth: 0,
      }}>
        {/* Sender row */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <div style={{ position: 'relative', width: '30px', height: '30px', flexShrink: 0 }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#E6F4F2' }} />
            <span className="material-symbols-outlined" style={{
              position: 'absolute', left: '3px', top: '3px',
              fontSize: '24px', lineHeight: '1', color: '#377B8A', userSelect: 'none',
            }}>{msg.sender_icon || 'medical_information'}</span>
          </div>
          <div style={{
            fontFamily: 'Inter', fontWeight: 700, fontSize: '14px',
            lineHeight: '17px', color: '#377B8A',
          }}>
            {msg.sender_name || 'Zorgteam'}<br />
            <span style={{ fontStyle: 'italic' }}>{msg.sender_role || ''}</span>
          </div>
        </div>
        {/* Message text */}
        <div style={{
          fontFamily: 'Inter', fontWeight: 400, fontSize: '14px',
          lineHeight: '17px', color: '#727272', marginBottom: '6px',
        }}>{msg.content}</div>
        {/* Timestamp */}
        <div style={{
          fontFamily: 'Inter', fontStyle: 'italic', fontWeight: 400,
          fontSize: '13px', lineHeight: '16px', color: '#727272', textAlign: 'right',
        }}>{msg.display_time || formatDateTime(msg.created_at)}</div>
      </div>
    </div>
  );
}

/* ── Sent bubble (patient) ── */
function SentBubble({ msg }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', marginBottom: '16px', paddingLeft: '60px' }}>
      {/* Grey bubble */}
      <div style={{
        background: '#E2E2E2', borderRadius: '5px',
        padding: '8px 12px 8px 15px',
      }}>
        {/* Message text */}
        <div style={{
          fontFamily: 'Inter', fontWeight: 400, fontSize: '14px',
          lineHeight: '17px', color: '#727272', marginBottom: '6px',
        }}>{msg.content}</div>
        {/* Timestamp */}
        <div style={{
          fontFamily: 'Inter', fontStyle: 'italic', fontWeight: 400,
          fontSize: '13px', lineHeight: '16px', color: '#727272', textAlign: 'right',
        }}>{msg.display_time || formatDateTime(msg.created_at)}</div>
      </div>
      {/* Right tail */}
      <div style={{
        width: 0, height: 0, flexShrink: 0,
        borderTop: '8px solid transparent',
        borderBottom: '8px solid transparent',
        borderLeft: '12px solid #E2E2E2',
        marginBottom: '8px',
      }} />
    </div>
  );
}

/* ── Main page ── */
export default function MessagesPage() {
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

  /* Combine demo messages with real API messages */
  const allMessages = [...DEMO_MESSAGES, ...messages];

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
        display: 'flex', alignItems: 'center',
        padding: '5px 10px 0',
        boxSizing: 'border-box',
        justifyContent: 'space-between',
      }}>
        <div style={{
          position: 'relative', display: 'flex', alignItems: 'center',
          padding: '0 0 0 10px', height: '34px',
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
        <div style={{ width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#377B8A', userSelect: 'none' }}>account_circle</span>
        </div>
      </div>

      {/* ── Messages list ── */}
      <div style={{
        position: 'absolute', left: 0, top: '73px',
        width: '414px', bottom: '120px',
        overflowY: 'auto', padding: '16px 16px 0',
        boxSizing: 'border-box',
      }}>
        {loading ? (
          <div style={{ textAlign: 'center', color: '#B3B2B2', marginTop: '40px', fontSize: '14px' }}>Laden…</div>
        ) : (
          allMessages.map((msg) =>
            msg.sender_type === 'care'
              ? <ReceivedBubble key={msg.id} msg={msg} />
              : <SentBubble key={msg.id} msg={msg} />
          )
        )}
        <div ref={bottomRef} />
      </div>

      {/* ── Input area ── */}
      <div style={{
        position: 'absolute', left: 0, bottom: '58px',
        width: '414px', height: '62px',
        background: '#FFFFFF',
        borderTop: '1px solid #E8E8E8',
        borderBottom: '1px solid #377B8A',
        display: 'flex', flexDirection: 'row',
        alignItems: 'center', padding: '0 16px',
        boxSizing: 'border-box', gap: '10px',
      }}>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) handleSend(e); }}
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
            fontSize: '20px',
            color: content.trim() ? '#FFFFFF' : '#B3B2B2',
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
