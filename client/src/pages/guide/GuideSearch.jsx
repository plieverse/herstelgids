import { useNavigate } from 'react-router-dom';

export const CATEGORY_META = {
  '1': { label: 'Eten',        color: '#AF1E1E', circleColor: '#EBCFCF', icon: 'nutrition' },
  '2': { label: 'Drinken',     color: '#378A6C', circleColor: '#CFEBD4', icon: 'coffee' },
  '3': { label: 'Medicijnen',  color: '#377B8A', circleColor: '#E6F4F2', icon: 'pill' },
  '4': { label: 'Slaap',       color: '#C5A500', circleColor: '#EBE9CF', icon: 'hotel' },
  '5': { label: 'Ervaringen',  color: '#8A3773', circleColor: '#EBCFDE', icon: 'diversity_3' },
  '6': { label: 'Bewegen',     color: '#CB6E02', circleColor: '#F4D2BC', icon: 'directions_run' },
};

export const SEARCH_INDEX = [
  { catId: '1', idx: 0, title: 'Portiegrootte',              icon: 'flatware' },
  { catId: '1', idx: 1, title: 'Gewicht',                    icon: 'balance' },
  { catId: '1', idx: 2, title: 'Eiwitten',                   icon: 'egg' },
  { catId: '1', idx: 3, title: 'Koolhydraten',               icon: 'bakery_dining' },
  { catId: '2', idx: 0, title: 'Porties',                    icon: 'gastroenterology' },
  { catId: '2', idx: 1, title: 'Drinkvoeding',               icon: 'coffee' },
  { catId: '2', idx: 2, title: 'Alcohol',                    icon: 'wine_bar' },
  { catId: '3', idx: 0, title: 'Medicijnen',                 icon: 'pill' },
  { catId: '3', idx: 1, title: 'Maagzuur',                   icon: 'gastroenterology' },
  { catId: '3', idx: 2, title: 'Pijnstillers',               icon: 'pill' },
  { catId: '3', idx: 3, title: 'Sondevoeding',               icon: 'syringe' },
  { catId: '3', idx: 4, title: 'JP drain',                   icon: 'syringe' },
  { catId: '4', idx: 0, title: 'Slaaphouding',               icon: 'hotel' },
  { catId: '4', idx: 1, title: 'Maagzuur in de nacht',       icon: 'gastroenterology' },
  { catId: '4', idx: 2, title: 'Eten voor het slapen',       icon: 'flatware' },
  { catId: '4', idx: 3, title: 'Vermoeidheid',               icon: 'hotel' },
  { catId: '5', idx: 0, title: 'Verhaal over familie',       icon: 'diversity_3' },
  { catId: '5', idx: 1, title: 'Verhaal over vitaminen',     icon: 'pill' },
  { catId: '5', idx: 2, title: 'Verhaal over uiteten gaan',  icon: 'flatware' },
  { catId: '5', idx: 3, title: 'SPSK',                       icon: 'diversity_3' },
  { catId: '6', idx: 0, title: 'Beginnen met bewegen',       icon: 'directions_walk' },
  { catId: '6', idx: 1, title: 'Bewegen en ademhalen',       icon: 'pulmonology' },
  { catId: '6', idx: 2, title: 'Waarom bewegen belangrijk is', icon: 'directions_run' },
  { catId: '6', idx: 3, title: 'Wat je nog niet kan doen',   icon: 'close' },
];

export function SearchOverlay({ query, setQuery, onClose }) {
  const navigate = useNavigate();

  const results = query.trim().length > 0
    ? SEARCH_INDEX.filter((a) =>
        a.title.toLowerCase().includes(query.trim().toLowerCase()) ||
        CATEGORY_META[a.catId].label.toLowerCase().includes(query.trim().toLowerCase())
      )
    : [];

  function goToArticle(article) {
    onClose();
    navigate(`/gids/uitleg/${article.catId}/${article.idx}`);
  }

  return (
    <div
      style={{
        position: 'absolute', left: 0, top: 0, width: '414px', height: '100%',
        background: 'rgba(0,0,0,0.3)', zIndex: 30,
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'absolute', left: '16px', top: '16px', width: '383px',
          background: '#F6F6F6', borderRadius: '20px',
          padding: '16px', boxSizing: 'border-box',
          maxHeight: 'calc(100% - 90px)', overflow: 'hidden',
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
            overflowY: 'auto',
          }}>
            {results.map((article) => {
              const cat = CATEGORY_META[article.catId];
              return (
                <div
                  key={`${article.catId}-${article.idx}`}
                  onClick={() => goToArticle(article)}
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
          <div style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: '14px', color: '#B3B2B2', padding: '20px 0' }}>
            Geen artikelen gevonden voor "{query}"
          </div>
        )}

        {/* Hint when empty */}
        {query.trim().length === 0 && (
          <div style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: '13px', color: '#B3B2B2', padding: '12px 0' }}>
            Typ een onderwerp om te zoeken
          </div>
        )}
      </div>
    </div>
  );
}
