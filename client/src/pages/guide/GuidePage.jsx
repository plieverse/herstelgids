import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/layout/BottomNav';

/* ── Search index: all uitleg articles ── */
const CATEGORY_META = {
  '1': { label: 'Eten',        color: '#AF1E1E', circleColor: '#EBCFCF', icon: 'nutrition' },
  '2': { label: 'Drinken',     color: '#378A6C', circleColor: '#CFEBD4', icon: 'coffee' },
  '3': { label: 'Medicijnen',  color: '#377B8A', circleColor: '#E6F4F2', icon: 'pill' },
  '4': { label: 'Slaap',       color: '#C5A500', circleColor: '#EBE9CF', icon: 'hotel' },
  '5': { label: 'Ervaringen',  color: '#8A3773', circleColor: '#EBCFDE', icon: 'diversity_3' },
  '6': { label: 'Bewegen',     color: '#CB6E02', circleColor: '#F4D2BC', icon: 'directions_run' },
};

const SEARCH_INDEX = [
  { catId: '1', idx: 0, title: 'Portiegrootte', icon: 'flatware' },
  { catId: '1', idx: 1, title: 'Gewicht bijhouden', icon: 'balance' },
  { catId: '1', idx: 2, title: 'Eiwitten', icon: 'egg' },
  { catId: '1', idx: 3, title: 'Koolhydraten', icon: 'bakery_dining' },
  { catId: '2', idx: 0, title: 'Porties drinken', icon: 'gastroenterology' },
  { catId: '2', idx: 1, title: 'Drinkvoeding', icon: 'coffee' },
  { catId: '2', idx: 2, title: 'Alcohol', icon: 'wine_bar' },
  { catId: '3', idx: 0, title: 'Medicijnen', icon: 'pill' },
  { catId: '3', idx: 1, title: 'Maagzuur', icon: 'gastroenterology' },
  { catId: '3', idx: 2, title: 'Pijnstillers', icon: 'pill' },
  { catId: '3', idx: 3, title: 'Sondevoeding', icon: 'syringe' },
  { catId: '3', idx: 4, title: 'JP drain', icon: 'syringe' },
  { catId: '4', idx: 0, title: 'Slaaphouding', icon: 'hotel' },
  { catId: '4', idx: 1, title: 'Maagzuur in de nacht', icon: 'gastroenterology' },
  { catId: '4', idx: 2, title: 'Eten voor het slapen', icon: 'flatware' },
  { catId: '4', idx: 3, title: 'Vermoeidheid', icon: 'hotel' },
  { catId: '5', idx: 0, title: 'Verhaal over familie', icon: 'diversity_3' },
  { catId: '5', idx: 1, title: 'Verhaal over vitaminen', icon: 'pill' },
  { catId: '5', idx: 2, title: 'Verhaal over uiteten gaan', icon: 'flatware' },
  { catId: '5', idx: 3, title: 'SPSK', icon: 'diversity_3' },
  { catId: '6', idx: 0, title: 'Beginnen met bewegen', icon: 'directions_walk' },
  { catId: '6', idx: 1, title: 'Bewegen en ademhalen', icon: 'pulmonology' },
  { catId: '6', idx: 2, title: 'Waarom bewegen belangrijk is', icon: 'directions_run' },
  { catId: '6', idx: 3, title: 'Wat je nog niet kan doen', icon: 'close' },
];

const TILES = [
  {
    id: 1, title: 'Voor het eten', subtitle: 'Vol gevoel en geen honger',
    icon: 'gastroenterology', circleColor: '#E6F4F2', iconColor: '#377B8A',
    tileLeft: 0, tileTop: 0, iconTop: 10,
    circle: { w: 60, h: 60, l: 57, t: 29 },
    dots: [{ w: 17, h: 17, l: 133, t: 6 }, { w: 14, h: 14, l: 148, t: 20 }, { w: 9, h: 9, l: 136, t: 25 }],
  },
  {
    id: 2, title: 'Tijdens het eten', subtitle: 'Slikken, boeren, veel slijm en meer...',
    icon: 'flatware', circleColor: '#F4D2BC', iconColor: '#CB6E02',
    tileLeft: 186, tileTop: 0, iconTop: 10,
    circle: { w: 60, h: 60, l: 57, t: 29 },
    dots: [{ w: 7, h: 7, l: 20, t: 79 }, { w: 10, h: 10, l: 8, t: 73 }, { w: 12, h: 12, l: 8, t: 86 }],
  },
  {
    id: 3, title: 'Kort na het eten', subtitle: 'Buikkrampen, diarree, dumping en meer...',
    icon: 'clock_loader_10', circleColor: '#DFCFEB', iconColor: '#4A378A',
    tileLeft: 0, tileTop: 174, iconTop: 16,
    circle: { w: 60, h: 60, l: 46, t: 34 },
    dots: [{ w: 7, h: 7, l: 103, t: 23 }, { w: 7, h: 7, l: 113, t: 32 }, { w: 7, h: 7, l: 119, t: 45 }],
  },
  {
    id: 4, title: 'Lang na het eten', subtitle: 'Dumping, winderigheid en meer...',
    icon: 'clock_loader_60', circleColor: '#CFEBD4', iconColor: '#378A6C',
    tileLeft: 186, tileTop: 174, iconTop: 16,
    circle: { w: 60, h: 60, l: 60, t: 22 },
    dots: [{ w: 7, h: 7, l: 113, t: 22 }, { w: 7, h: 7, l: 120, t: 32 }, { w: 7, h: 7, l: 123, t: 23 }],
  },
  {
    id: 5, title: 'Langdurig', subtitle: 'Pijn, gewichtsverlies, hoesten en meer...',
    icon: 'all_inclusive', circleColor: '#EBCFDE', iconColor: '#8A3773',
    tileLeft: 0, tileTop: 348, iconTop: 16,
    circle: { w: 54, h: 54, l: 58, t: 26 },
    dots: [{ w: 15, h: 15, l: 108, t: 65 }, { w: 7, h: 7, l: 101, t: 76 }, { w: 15, h: 15, l: 42, t: 38 }, { w: 7, h: 7, l: 55, t: 32 }],
  },
];

export default function GuidePage() {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  const results = query.trim().length > 0
    ? SEARCH_INDEX.filter((a) => a.title.toLowerCase().includes(query.trim().toLowerCase()))
    : [];

  function closeSearch() { setSearchOpen(false); setQuery(''); }

  return (
    <div style={{
      position: 'relative', width: '100%', maxWidth: '414px',
      height: '100dvh', minHeight: '736px', margin: '0 auto',
      background: '#F6F6F6', fontFamily: 'Inter, sans-serif', overflow: 'hidden',
    }}>

      {/* ── Topbar ── */}
      <div style={{
        position: 'absolute', left: 0, top: 0, width: '414px', height: '110px',
        background: '#FFFFFF',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', gap: '20px',
        zIndex: 20,
      }}>
        {/* Title row */}
        <div style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
          alignItems: 'center', padding: '0px 10px', width: '414px', height: '40px',
          boxSizing: 'border-box',
        }}>
          <div style={{
            position: 'relative', display: 'flex', flexDirection: 'row',
            alignItems: 'center', padding: '0px 0px 0px 10px',
            isolation: 'isolate', width: '150px', height: '34px',
          }}>
            <div style={{
              position: 'absolute', width: '29px', height: '29px',
              left: '0px', top: '3px', borderRadius: '50%',
              background: '#E6F4F2', zIndex: 1,
            }} />
            <span style={{
              fontFamily: 'Inter', fontWeight: 700, fontSize: '24px',
              lineHeight: '29px', color: '#377B8A', position: 'relative', zIndex: 2,
            }}>Gids</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '11px' }}>
            <div
              onClick={() => setSearchOpen(true)}
              style={{ width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#377B8A', userSelect: 'none' }}>search</span>
            </div>
            <div style={{ width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#377B8A', userSelect: 'none' }}>account_circle</span>
            </div>
          </div>
        </div>

        {/* Tab switcher */}
        <div style={{
          width: '380px', height: '39px', background: '#F5F5F5', borderRadius: '20px',
          display: 'flex', flexDirection: 'row', alignItems: 'center',
          padding: '3px 5px', boxSizing: 'border-box',
        }}>
          <div style={{
            width: '189px', height: '33px', background: '#377B8A', borderRadius: '20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '20px', lineHeight: '24px', color: '#FFFFFF' }}>Problemen</span>
          </div>
          <div onClick={() => navigate('/gids/uitleg')} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '20px', lineHeight: '24px', color: '#B3B2B2' }}>Uitleg</span>
          </div>
        </div>
      </div>

      {/* ── Tiles grid ── */}
      <div style={{ position: 'absolute', width: '355px', height: '503px', left: '38px', top: '150px' }}>
        {TILES.map((tile) => (
          <div key={tile.id} onClick={() => navigate(`/gids/${tile.id}`)} style={{
            position: 'absolute', width: '169px', height: '155px',
            left: `${tile.tileLeft}px`, top: `${tile.tileTop}px`,
            background: '#FFFFFF', borderRadius: '7px', overflow: 'hidden', cursor: 'pointer',
          }}>
            <div style={{ position: 'absolute', width: `${tile.circle.w}px`, height: `${tile.circle.h}px`, left: `${tile.circle.l}px`, top: `${tile.circle.t}px`, borderRadius: '50%', background: tile.circleColor }} />
            {tile.dots.map((dot, i) => (
              <div key={i} style={{ position: 'absolute', width: `${dot.w}px`, height: `${dot.h}px`, left: `${dot.l}px`, top: `${dot.t}px`, borderRadius: '50%', background: tile.circleColor }} />
            ))}
            <div style={{ position: 'absolute', left: '42px', top: `${tile.iconTop}px`, width: '85px', height: '85px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '85px', lineHeight: '1', color: tile.iconColor, userSelect: 'none' }}>{tile.icon}</span>
            </div>
            <div style={{ position: 'absolute', left: '0px', top: '104px', width: '169px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 5px', boxSizing: 'border-box' }}>
              <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '15px', lineHeight: '18px', color: '#1C1B1F', textAlign: 'center', width: '160px' }}>{tile.title}</div>
              <div style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '13px', lineHeight: '16px', color: '#B3B2B2', textAlign: 'center', width: '160px', marginTop: '2px' }}>{tile.subtitle}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Search overlay ── */}
      {searchOpen && (
        <div style={{
          position: 'absolute', left: 0, top: 0, width: '414px', height: '100%',
          background: 'rgba(0,0,0,0.3)', zIndex: 30,
        }} onClick={closeSearch}>
          <div
            style={{
              position: 'absolute', left: '16px', top: '16px',
              width: '383px', background: '#F6F6F6',
              borderRadius: '20px', padding: '16px',
              boxSizing: 'border-box',
              maxHeight: 'calc(100% - 32px)', overflow: 'hidden',
              display: 'flex', flexDirection: 'column', gap: '12px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search bar */}
            <div style={{ position: 'relative', width: '100%', height: '44px' }}>
              <div style={{ position: 'absolute', inset: 0, background: '#FFFFFF', borderRadius: '20px' }} />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Zoek uitleg over een probleem of onderwerp"
                style={{
                  position: 'absolute', left: '16px', top: 0, right: '44px', height: '44px',
                  background: 'transparent', border: 'none', outline: 'none',
                  fontFamily: 'Inter', fontSize: '13px', color: '#377B8A',
                }}
              />
              <div style={{ position: 'absolute', right: '6px', top: '5px', width: '33px', height: '33px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '26px', color: '#377B8A', userSelect: 'none' }}>search</span>
              </div>
            </div>

            {/* Results */}
            {results.length > 0 && (
              <div style={{
                background: '#E8E8E8', borderRadius: '20px',
                padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px',
                maxHeight: '400px', overflowY: 'auto',
              }}>
                {results.map((article) => {
                  const cat = CATEGORY_META[article.catId];
                  return (
                    <div
                      key={`${article.catId}-${article.idx}`}
                      onClick={() => { closeSearch(); navigate(`/gids/uitleg/${article.catId}/${article.idx}`); }}
                      style={{
                        position: 'relative', width: '100%', height: '70px',
                        background: '#FFFFFF', borderRadius: '20px',
                        cursor: 'pointer', flexShrink: 0,
                      }}
                    >
                      {/* Colored circle */}
                      <div style={{
                        position: 'absolute', width: '26px', height: '26px',
                        left: '12px', top: '22px', borderRadius: '50%',
                        background: cat.circleColor,
                      }} />
                      {/* Category icon */}
                      <span className="material-symbols-outlined" style={{
                        position: 'absolute', left: '15px', top: '18px',
                        fontSize: '28px', color: cat.color, userSelect: 'none',
                      }}>{cat.icon}</span>
                      {/* Title */}
                      <div style={{
                        position: 'absolute', left: '56px', top: '50%',
                        transform: 'translateY(-50%)', right: '40px',
                        fontFamily: 'Inter', fontWeight: 700, fontSize: '15px',
                        lineHeight: '19px', color: cat.color,
                      }}>{article.title}</div>
                      {/* Arrow */}
                      <span className="material-symbols-outlined" style={{
                        position: 'absolute', right: '10px', top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: '24px', color: '#B3B2B2', userSelect: 'none',
                      }}>keyboard_arrow_right</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* No results */}
            {query.trim().length > 0 && results.length === 0 && (
              <div style={{
                textAlign: 'center', fontFamily: 'Inter', fontSize: '14px',
                color: '#B3B2B2', padding: '20px 0',
              }}>
                Geen artikelen gevonden voor "{query}"
              </div>
            )}

            {/* Hint when empty */}
            {query.trim().length === 0 && (
              <div style={{
                textAlign: 'center', fontFamily: 'Inter', fontSize: '13px',
                color: '#B3B2B2', padding: '12px 0',
              }}>
                Typ een onderwerp om te zoeken
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Bottom Nav ── */}
      <BottomNav />
    </div>
  );
}
