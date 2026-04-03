import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api/client';

const navItems = [
  {
    to: '/dagboek',
    label: 'Dagboek',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
  {
    to: '/gids',
    label: 'Gids',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    to: '/berichten',
    label: 'Berichten',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    badge: true,
  },
  {
    to: '/profiel',
    label: 'Profiel',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    api.get('/messages/unread-count')
      .then((res) => setUnread(res.data.count))
      .catch(() => {});

    const interval = setInterval(() => {
      api.get('/messages/unread-count')
        .then((res) => setUnread(res.data.count))
        .catch(() => {});
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav style={styles.nav} aria-label="Hoofdnavigatie">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          style={({ isActive }) => ({
            ...styles.item,
            color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
          })}
          aria-label={item.label}
        >
          <span style={styles.iconWrap}>
            <span style={styles.icon}>{item.icon}</span>
            {item.badge && unread > 0 && (
              <span style={styles.badge}>{unread > 9 ? '9+' : unread}</span>
            )}
          </span>
          <span style={styles.label}>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

const styles = {
  nav: {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: '480px',
    height: 'var(--nav-height)',
    background: 'var(--color-surface)',
    borderTop: '1px solid var(--color-border)',
    display: 'flex',
    alignItems: 'center',
    paddingBottom: 'env(safe-area-inset-bottom)',
    zIndex: 100,
    boxShadow: '0 -2px 12px rgba(0,0,0,0.06)',
  },
  item: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '3px',
    minHeight: 'var(--touch-target)',
    textDecoration: 'none',
    transition: 'color 0.15s',
  },
  iconWrap: {
    position: 'relative',
    display: 'flex',
  },
  icon: {
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: '-4px',
    right: '-8px',
    background: 'var(--color-error)',
    color: '#fff',
    fontSize: '10px',
    fontWeight: '700',
    borderRadius: 'var(--radius-full)',
    minWidth: '16px',
    height: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 3px',
  },
  label: {
    fontSize: '11px',
    fontWeight: '500',
  },
};
