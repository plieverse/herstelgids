import { useNavigate } from 'react-router-dom';

/* ── Uitleg category colours ── */
const UITLEG_CAT = {
  '1': { color: '#AF1E1E', circleColor: '#EBCFCF', icon: 'nutrition',      label: 'Eten' },
  '2': { color: '#378A6C', circleColor: '#CFEBD4', icon: 'coffee',         label: 'Drinken' },
  '3': { color: '#377B8A', circleColor: '#E6F4F2', icon: 'pill',           label: 'Medicijnen' },
  '4': { color: '#C5A500', circleColor: '#EBE9CF', icon: 'hotel',          label: 'Slaap' },
  '5': { color: '#8A3773', circleColor: '#EBCFDE', icon: 'diversity_3',    label: 'Ervaringen' },
  '6': { color: '#CB6E02', circleColor: '#F4D2BC', icon: 'directions_run', label: 'Bewegen' },
};

/* ── Problemen category colours ── */
const PROBLEEM_CAT = {
  1: { color: '#377B8A', circleColor: '#E6F4F2' },
  2: { color: '#CB6E02', circleColor: '#F4D2BC' },
  3: { color: '#4A378A', circleColor: '#DFCFEB' },
  4: { color: '#378A6C', circleColor: '#CFEBD4' },
  5: { color: '#8A3773', circleColor: '#EBCFDE' },
};

/* ── All searchable items ── */
const ALL_ITEMS = [
  /* ── Problemen ── */
  { type: 'probleem', catId: 1, idx: 0, title: 'Vol gevoel',                         icon: 'gastroenterology' },
  { type: 'probleem', catId: 1, idx: 1, title: 'Geen honger',                        icon: 'gastroenterology' },
  { type: 'probleem', catId: 2, idx: 0, title: 'Moeite met slikken',                 icon: 'ent' },
  { type: 'probleem', catId: 2, idx: 1, title: 'Gevoel dat het eten niet zakt',      icon: 'gastroenterology' },
  { type: 'probleem', catId: 2, idx: 2, title: 'Boeren',                             icon: 'voice_selection' },
  { type: 'probleem', catId: 2, idx: 3, title: 'Veel slijm',                         icon: 'water_drops' },
  { type: 'probleem', catId: 3, idx: 0, title: 'Gevoel dat het eten terugkomt',      icon: 'gastroenterology' },
  { type: 'probleem', catId: 3, idx: 1, title: 'Dumping (vroeg)',                    icon: 'sentiment_stressed' },
  { type: 'probleem', catId: 3, idx: 2, title: 'Buikkrampen',                        icon: 'bolt' },
  { type: 'probleem', catId: 3, idx: 3, title: 'Diarree',                            icon: 'WC' },
  { type: 'probleem', catId: 4, idx: 0, title: 'Misselijkheid',                      icon: 'gastroenterology' },
  { type: 'probleem', catId: 4, idx: 1, title: 'Dumping (laat)',                     icon: 'sentiment_stressed' },
  { type: 'probleem', catId: 4, idx: 2, title: 'Winderigheid',                       icon: 'air' },
  { type: 'probleem', catId: 4, idx: 3, title: 'Diarree',                            icon: 'WC' },
  { type: 'probleem', catId: 5, idx: 0, title: 'Moeheid',                            icon: 'hotel' },
  { type: 'probleem', catId: 5, idx: 1, title: 'Hoesten',                            icon: 'voice_selection' },
  { type: 'probleem', catId: 5, idx: 2, title: 'Gewichtsverlies',                    icon: 'balance' },
  { type: 'probleem', catId: 5, idx: 3, title: 'Slijm',                              icon: 'water_drops' },

  /* ── Uitleg ── */
  { type: 'uitleg', catId: '1', idx: 0, title: 'Portiegrootte',                      icon: 'flatware' },
  { type: 'uitleg', catId: '1', idx: 1, title: 'Gewicht',                            icon: 'balance' },
  { type: 'uitleg', catId: '1', idx: 2, title: 'Eiwitten',                           icon: 'egg' },
  { type: 'uitleg', catId: '1', idx: 3, title: 'Koolhydraten',                       icon: 'bakery_dining' },
  { type: 'uitleg', catId: '2', idx: 0, title: 'Porties',                            icon: 'gastroenterology' },
  { type: 'uitleg', catId: '2', idx: 1, title: 'Drinkvoeding',                       icon: 'coffee' },
  { type: 'uitleg', catId: '2', idx: 2, title: 'Alcohol',                            icon: 'wine_bar' },
  { type: 'uitleg', catId: '3', idx: 0, title: 'Medicijnen',                         icon: 'pill' },
  { type: 'uitleg', catId: '3', idx: 1, title: 'Maagzuur',                           icon: 'gastroenterology' },
  { type: 'uitleg', catId: '3', idx: 2, title: 'Pijnstillers',                       icon: 'pill' },
  { type: 'uitleg', catId: '3', idx: 3, title: 'Sondevoeding',                       icon: 'syringe' },
  { type: 'uitleg', catId: '3', idx: 4, title: 'JP drain',                           icon: 'syringe' },
  { type: 'uitleg', catId: '4', idx: 0, title: 'Slaaphouding',                       icon: 'hotel' },
  { type: 'uitleg', catId: '4', idx: 1, title: 'Maagzuur in de nacht',               icon: 'gastroenterology' },
  { type: 'uitleg', catId: '4', idx: 2, title: 'Eten voor het slapen',               icon: 'flatware' },
  { type: 'uitleg', catId: '4', idx: 3, title: 'Vermoeidheid',                       icon: 'hotel' },
  { type: 'uitleg', catId: '5', idx: 0, title: 'Verhaal over familie',               icon: 'diversity_3' },
  { type: 'uitleg', catId: '5', idx: 1, title: 'Verhaal over vitaminen',             icon: 'pill' },
  { type: 'uitleg', catId: '5', idx: 2, title: 'Verhaal over uiteten gaan',          icon: 'flatware' },
  { type: 'uitleg', catId: '5', idx: 3, title: 'SPSK',                               icon: 'diversity_3' },
  { type: 'uitleg', catId: '6', idx: 0, title: 'Beginnen met bewegen',               icon: 'directions_walk' },
  { type: 'uitleg', catId: '6', idx: 1, title: 'Bewegen en ademhalen',               icon: 'pulmonology' },
  { type: 'uitleg', catId: '6', idx: 2, title: 'Waarom bewegen belangrijk is',       icon: 'directions_run' },
  { type: 'uitleg', catId: '6', idx: 3, title: 'Wat je nog niet kan doen',           icon: 'close' },
];

export function SearchOverlay({ query, setQuery, onClose }) {
  const navigate = useNavigate();
  const q = query.trim().toLowerCase();

  const results = q.length > 0
    ? ALL_ITEMS.filter((a) => a.title.toLowerCase().includes(q))
    : [];

  function handleClick(item) {
    onClose();
    if (item.type === 'probleem') {
      navigate(`/gids/${item.catId}/${item.idx}`);
    } else {
      navigate(`/gids/uitleg/${item.catId}/${item.idx}`);
    }
  }

  function getColor(item) {
    return item.type === 'probleem'
      ? PROBLEEM_CAT[item.catId].color
      : UITLEG_CAT[item.catId].color;
  }

  function getCircleColor(item) {
    return item.type === 'probleem'
      ? PROBLEEM_CAT[item.catId].circleColor
      : UITLEG_CAT[item.catId].circleColor;
  }

  function getCatIcon(item) {
    return item.type === 'uitleg' ? UITLEG_CAT[item.catId].icon : item.icon;
  }

  return (
    <div
      style={{ position: 'absolute', left: 0, top: 0, width: '414px', height: '100%', background: 'rgba(0,0,0,0.3)', zIndex: 30 }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'absolute', left: '16px', top: '16px', width: '383px',
          background: '#F6F6F6', borderRadius: '20px', padding: '16px',
          boxSizing: 'border-box', maxHeight: 'calc(100% - 90px)',
          overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '12px',
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
          <div style={{ background: '#E8E8E8', borderRadius: '20px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
            {results.map((item, i) => {
              const color = getColor(item);
              const circleColor = getCircleColor(item);
              const catIcon = getCatIcon(item);
              return (
                <div
                  key={i}
                  onClick={() => handleClick(item)}
                  style={{ position: 'relative', width: '100%', height: '70px', background: '#FFFFFF', borderRadius: '20px', cursor: 'pointer', flexShrink: 0 }}
                >
                  <div style={{ position: 'absolute', width: '26px', height: '26px', left: '12px', top: '22px', borderRadius: '50%', background: circleColor }} />
                  <span className="material-symbols-outlined" style={{ position: 'absolute', left: '15px', top: '18px', fontSize: '28px', color, userSelect: 'none' }}>
                    {catIcon}
                  </span>
                  <div style={{ position: 'absolute', left: '56px', top: '50%', transform: 'translateY(-50%)', right: '40px' }}>
                    <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '15px', lineHeight: '19px', color }}>{item.title}</div>
                    <div style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '11px', color: '#B3B2B2', marginTop: '2px' }}>
                      {item.type === 'probleem' ? 'Problemen' : `Uitleg · ${UITLEG_CAT[item.catId].label}`}
                    </div>
                  </div>
                  <span className="material-symbols-outlined" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: '24px', color: '#B3B2B2', userSelect: 'none' }}>keyboard_arrow_right</span>
                </div>
              );
            })}
          </div>
        )}

        {/* No results */}
        {q.length > 0 && results.length === 0 && (
          <div style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: '14px', color: '#B3B2B2', padding: '20px 0' }}>
            Geen resultaten gevonden voor "{query}"
          </div>
        )}

        {/* Hint */}
        {q.length === 0 && (
          <div style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: '13px', color: '#B3B2B2', padding: '12px 0' }}>
            Typ een onderwerp om te zoeken
          </div>
        )}
      </div>
    </div>
  );
}
