import { NavLink, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/dagboek', label: 'Dagboek', icon: 'contract_edit' },
  { to: '/gids',    label: 'Gids',    icon: 'menu_book'    },
  { to: '/berichten', label: 'Berichten', icon: 'chat'     },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: '414px',
      height: '58px',
      background: '#FFFFFF',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '67px',
      zIndex: 100,
      fontFamily: 'Inter, sans-serif',
    }}>
      {navItems.map((item) => {
        const isActive = location.pathname.startsWith(item.to);
        return (
          <NavLink
            key={item.to}
            to={item.to}
            style={{
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1px',
            }}
          >
            {/* Icon wrapper with optional active circle */}
            <div style={{
              position: 'relative',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {isActive && (
                <div style={{
                  position: 'absolute',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: '#E6F4F2',
                  top: '5px',
                  left: '5px',
                  zIndex: 0,
                }} />
              )}
              <span className="material-symbols-outlined" style={{
                fontSize: isActive ? '40px' : '38px',
                color: isActive ? '#377B8A' : '#B3B2B2',
                userSelect: 'none',
                position: 'relative',
                zIndex: 1,
              }}>{item.icon}</span>
            </div>

            {/* Label */}
            <span style={{
              fontFamily: 'Inter',
              fontWeight: isActive ? 700 : 400,
              fontSize: '12px',
              lineHeight: '15px',
              color: isActive ? '#377B8A' : '#B3B2B2',
              textAlign: 'center',
            }}>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
