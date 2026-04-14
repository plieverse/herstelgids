import { useState, useEffect, useRef } from 'react';
import Toast, { useToast } from '../../components/ui/Toast';
import DebugMenu, { useTripleClick } from '../../components/layout/DebugMenu';
import { formatDateTime } from '../../utils/dates';
import ProfileOverlay from '../../components/ui/ProfileOverlay';

const STORAGE_KEY = 'demo_messages';

/* ── Auto-replies from care providers ── */
const AUTO_REPLIES = [
  { sender_name: 'Tessa', sender_role: 'Verpleegkundig Specialist', sender_icon: 'medical_information',
    content: 'Bedankt voor uw bericht. Ik ga dit bespreken met het team en kom zo snel mogelijk bij u terug.' },
  { sender_name: 'Janny', sender_role: 'Dietiste', sender_icon: 'nutrition',
    content: 'Dank u voor de informatie. Ik neem dit mee in ons overleg en adviseer u verder over uw voeding.' },
  { sender_name: 'Tessa', sender_role: 'Verpleegkundig Specialist', sender_icon: 'medical_information',
    content: 'Goed dat u dit aangeeft. We houden uw situatie goed in de gaten. Heeft u verder nog vragen?' },
  { sender_name: 'Janny', sender_role: 'Dietiste', sender_icon: 'nutrition',
    content: 'Begrepen. Ik kijk samen met u naar wat het beste past bij uw herstel. Ik neem snel contact op.' },
];

function getNextReplyIndex(messages) {
  const careCount = messages.filter((m) => m.sender_type === 'care').length;
  return careCount % AUTO_REPLIES.length;
}

function nowTime() {
  return new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long' }) +
    ', ' + new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
}

function loadMessages() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveMessages(msgs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
  } catch {}
}

/* ── Received bubble ── */
function ReceivedBubble({ msg }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: '16px', paddingRight: '50px' }}>
      <div style={{
        width: 0, height: 0, flexShrink: 0,
        borderTop: '7px solid transparent', borderBottom: '7px solid transparent',
        borderRight: '13px solid #FFFFFF', marginTop: '32px',
      }} />
      <div style={{ background: '#FFFFFF', borderRadius: '5px', padding: '5px 25px 5px 15px', flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px', marginBottom: '10px' }}>
          <div style={{ position: 'relative', width: '30px', height: '30px', flexShrink: 0 }}>
            <div style={{ position: 'absolute', width: '30px', height: '30px', borderRadius: '50%', background: '#E6F4F2' }} />
            <span className="material-symbols-outlined" style={{
              position: 'absolute', left: '3px', top: '3px',
              fontSize: '24px', lineHeight: '1', color: '#377B8A', userSelect: 'none',
            }}>{msg.sender_icon || 'medical_information'}</span>
          </div>
          <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '16px', lineHeight: '19px', color: '#377B8A' }}>
            {msg.sender_name || 'Zorgteam'}<br />
            <span style={{ fontWeight: 400, fontSize: '14px' }}>{msg.sender_role || ''}</span>
          </div>
        </div>
        <div style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '14px', lineHeight: '17px', color: '#727272', marginBottom: '10px' }}>
          {msg.content}
        </div>
        <div style={{ fontFamily: 'Inter', fontStyle: 'italic', fontWeight: 400, fontSize: '13px', color: '#727272', textAlign: 'right' }}>
          {msg.display_time || formatDateTime(msg.created_at)}
        </div>
      </div>
    </div>
  );
}

/* ── Sent bubble ── */
function SentBubble({ msg }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', marginBottom: '16px', paddingLeft: '50px' }}>
      <div style={{ background: '#E2E2E2', borderRadius: '5px', padding: '5px 15px 5px 25px' }}>
        <div style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '14px', lineHeight: '17px', color: '#727272', marginBottom: '10px' }}>
          {msg.content}
        </div>
        <div style={{ fontFamily: 'Inter', fontStyle: 'italic', fontWeight: 400, fontSize: '13px', color: '#727272', textAlign: 'right' }}>
          {msg.display_time || formatDateTime(msg.created_at)}
        </div>
      </div>
      <div style={{
        width: 0, height: 0, flexShrink: 0,
        borderTop: '7px solid transparent', borderBottom: '7px solid transparent',
        borderLeft: '13px solid #E2E2E2', marginBottom: '10px',
      }} />
    </div>
  );
}

/* ── Empty state ── */
function EmptyState() {
  return (
    <div style={{ position: 'relative', height: '100%' }}>

      {/* Info card */}
      <div style={{
        position: 'absolute', left: '24px', right: '24px', top: '24px',
        background: '#E6F4F2', borderRadius: '10px',
        padding: '14px 16px 14px 54px', boxSizing: 'border-box',
        minHeight: '70px',
      }}>
        {/* Decorative circle behind icon */}
        <div style={{
          position: 'absolute', width: '31px', height: '31px',
          left: '12px', top: '50%', transform: 'translateY(-50%)',
          borderRadius: '50%', background: '#D0E9E5',
        }} />
        {/* Warning icon */}
        <span className="material-symbols-outlined" style={{
          position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)',
          fontSize: '32px', color: '#377B8A', userSelect: 'none',
        }}>warning</span>
        {/* Text */}
        <div style={{
          fontFamily: 'Inter', fontWeight: 400, fontSize: '12px',
          lineHeight: '17px', color: '#727272',
        }}>
          Zorgverleners kunnen niet altijd meteen je vraag beantwoorden. Binnen 24 uur proberen ze je bericht(en) te beantwoorden.
        </div>
      </div>

      {/* Centered empty state */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: '160px', bottom: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: '16px',
        padding: '0 40px', boxSizing: 'border-box',
      }}>
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%',
          background: '#E6F4F2', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: '44px', color: '#377B8A', userSelect: 'none' }}>chat</span>
        </div>
        <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '18px', color: '#377B8A', textAlign: 'center' }}>
          Nog geen berichten
        </div>
        <div style={{
          fontFamily: 'Inter', fontWeight: 400, fontSize: '14px',
          lineHeight: '20px', color: '#B3B2B2', textAlign: 'center',
        }}>
          Stel een vraag aan uw zorgteam via het tekstveld hieronder.
        </div>
      </div>

    </div>
  );
}

/* ── Main page ── */
export default function MessagesPage() {
  const [localMessages, setLocalMessages] = useState(() => loadMessages());
  const [content, setContent] = useState('');
  const [debugOpen, setDebugOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const handleTripleClick = useTripleClick(() => setDebugOpen(true));
  const { toast, setToast } = useToast();
  const listRef = useRef(null);

  // Save messages and scroll list to bottom.
  // Use direct scrollTop instead of scrollIntoView() — scrollIntoView() inside
  // a CSS transform context on iOS Safari can disturb the visual viewport and
  // cause the ScaleWrapper scale to update to a wrong persistent value.
  useEffect(() => {
    saveMessages(localMessages);
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [localMessages]);

  async function handleSend(e) {
    e.preventDefault();
    const trimmed = content.trim();
    if (!trimmed) return;

    const sentMsg = {
      id: 'sent-' + Date.now(),
      sender_type: 'patient',
      content: trimmed,
      display_time: nowTime(),
    };

    setLocalMessages((prev) => {
      const updated = [...prev, sentMsg];
      const replyIdx = getNextReplyIndex(updated);
      const replyData = AUTO_REPLIES[replyIdx];

      setTimeout(() => {
        const replyMsg = {
          id: 'reply-' + Date.now(),
          sender_type: 'care',
          sender_name: replyData.sender_name,
          sender_role: replyData.sender_role,
          sender_icon: replyData.sender_icon,
          content: replyData.content,
          display_time: nowTime(),
        };
        setLocalMessages((prev2) => {
          const next = [...prev2, replyMsg];
          saveMessages(next);
          return next;
        });
      }, 1500);

      return updated;
    });

    setContent('');
  }

  return (
    <div style={{
      position: 'relative', width: '100%', maxWidth: '414px',
      height: '736px', margin: '0 auto',
      background: '#F6F6F6', fontFamily: 'Inter, sans-serif', overflow: 'hidden',
    }}>

      {/* ── Topbar ── */}
      <div style={{
        position: 'absolute', left: 0, top: 0, width: '414px', height: '73px',
        background: '#FFFFFF', zIndex: 10,
      }}>
        {/* 40px title row — same height/structure as Dagboek and Gids so titles align */}
        <div style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
          alignItems: 'center', padding: '0px 10px', width: '414px', height: '40px',
          boxSizing: 'border-box',
        }}>
          <div style={{
            position: 'relative', display: 'flex', flexDirection: 'row',
            alignItems: 'center', padding: '0px 0px 0px 10px',
            isolation: 'isolate', height: '34px',
          }}>
            <div style={{ position: 'absolute', width: '29px', height: '29px', left: '0px', top: '3px', borderRadius: '50%', background: '#E6F4F2', zIndex: 1 }} />
            <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '24px', lineHeight: '29px', color: '#377B8A', position: 'relative', zIndex: 2 }} onClick={handleTripleClick}>Berichten</span>
          </div>
          <div onClick={() => setProfileOpen(true)} style={{ width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#377B8A', userSelect: 'none' }}>account_circle</span>
          </div>
        </div>
      </div>

      {/* ── Messages list / Empty state ── */}
      <div
        ref={listRef}
        style={{
          position: 'absolute', left: 0, top: '73px', width: '414px', bottom: '120px',
          overflowY: 'auto',
          overscrollBehavior: 'none',
          padding: localMessages.length > 0 ? '14px 10px 0' : '0',
          boxSizing: 'border-box',
        }}
      >
        {localMessages.length === 0 ? (
          <EmptyState />
        ) : (
          localMessages.map((msg) =>
            msg.sender_type === 'care'
              ? <ReceivedBubble key={msg.id} msg={msg} />
              : <SentBubble key={msg.id} msg={msg} />
          )
        )}
      </div>

      {/* ── Input area ── */}
      <div style={{
        position: 'absolute', left: 0, bottom: '58px', width: '414px', height: '62px',
        background: '#FFFFFF', borderTop: '1px solid #E8E8E8', borderBottom: '1px solid #377B8A',
        display: 'flex', alignItems: 'center', padding: '0 16px', boxSizing: 'border-box', gap: '10px',
      }}>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) handleSend(e); }}
          placeholder="Schrijf een bericht…"
          maxLength={2000}
          style={{
            flex: 1, height: '38px', background: '#F6F6F6', border: 'none',
            borderRadius: '19px', padding: '0 16px',
            // iOS Safari auto-zooms (and resizes the viewport) when focused
            // input font-size < 16px — this causes the layout jump on navigation.
            fontFamily: 'Inter', fontSize: '16px', color: '#333', outline: 'none',
          }}
        />
        <button
          onClick={handleSend}
          disabled={!content.trim()}
          style={{
            width: '38px', height: '38px', borderRadius: '50%',
            background: content.trim() ? '#377B8A' : '#E8E8E8',
            border: 'none', cursor: content.trim() ? 'pointer' : 'default',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, transition: 'background 0.2s',
          }}
        >
          <span className="material-symbols-outlined" style={{
            fontSize: '20px', color: content.trim() ? '#FFFFFF' : '#B3B2B2', userSelect: 'none',
          }}>send</span>
        </button>
      </div>

      {profileOpen && <ProfileOverlay onClose={() => setProfileOpen(false)} />}
      {debugOpen && <DebugMenu onClose={() => setDebugOpen(false)} />}

      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}
