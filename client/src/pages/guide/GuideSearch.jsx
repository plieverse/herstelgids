import { useNavigate } from 'react-router-dom';

export const CATEGORY_META = {
  '1': { label: 'Eten',        color: '#AF1E1E', circleColor: '#EBCFCF', icon: 'nutrition' },
  '2': { label: 'Drinken',     color: '#378A6C', circleColor: '#CFEBD4', icon: 'coffee' },
  '3': { label: 'Medicijnen',  color: '#377B8A', circleColor: '#E6F4F2', icon: 'pill' },
  '4': { label: 'Slaap',       color: '#C5A500', circleColor: '#EBE9CF', icon: 'hotel' },
  '5': { label: 'Ervaringen',  color: '#8A3773', circleColor: '#EBCFDE', icon: 'diversity_3' },
  '6': { label: 'Bewegen',     color: '#CB6E02', circleColor: '#F4D2BC', icon: 'directions_run' },
};

/* ── Uitleg articles ── */
export const SEARCH_INDEX = [
  { catId: '1', idx: 0, title: 'Portiegrootte',               icon: 'flatware',        keywords: 'portie hoeveelheid eten weinig vol' },
  { catId: '1', idx: 1, title: 'Gewicht',                     icon: 'balance',         keywords: 'gewichtsverlies afvallen kilo wegen' },
  { catId: '1', idx: 2, title: 'Eiwitten',                    icon: 'egg',             keywords: 'eiwit proteïne vlees vis herstel spieren' },
  { catId: '1', idx: 3, title: 'Koolhydraten',                icon: 'bakery_dining',   keywords: 'koolhydraten suiker brood energie' },
  { catId: '2', idx: 0, title: 'Porties',                     icon: 'gastroenterology',keywords: 'drinken hoeveel vocht water thee' },
  { catId: '2', idx: 1, title: 'Drinkvoeding',                icon: 'coffee',          keywords: 'drinkvoeding voeding drinken shake' },
  { catId: '2', idx: 2, title: 'Alcohol',                     icon: 'wine_bar',        keywords: 'alcohol wijn bier drinken' },
  { catId: '3', idx: 0, title: 'Medicijnen',                  icon: 'pill',            keywords: 'medicijn tablet pil slikken' },
  { catId: '3', idx: 1, title: 'Maagzuur',                    icon: 'gastroenterology',keywords: 'maagzuur brandend gevoel zuur reflux oprispingen' },
  { catId: '3', idx: 2, title: 'Pijnstillers',                icon: 'pill',            keywords: 'pijn pijnstiller ibuprofen paracetamol' },
  { catId: '3', idx: 3, title: 'Sondevoeding',                icon: 'syringe',         keywords: 'sonde voeding tube nasogastrisch' },
  { catId: '3', idx: 4, title: 'JP drain',                    icon: 'syringe',         keywords: 'drain JP wond vocht afvoer' },
  { catId: '4', idx: 0, title: 'Slaaphouding',                icon: 'hotel',           keywords: 'slapen houding bed liggen zijligging' },
  { catId: '4', idx: 1, title: 'Maagzuur in de nacht',        icon: 'gastroenterology',keywords: 'nacht maagzuur reflux zuur oprispingen slapen' },
  { catId: '4', idx: 2, title: 'Eten voor het slapen',        icon: 'flatware',        keywords: 'eten slapen avond laat nacht' },
  { catId: '4', idx: 3, title: 'Vermoeidheid',                icon: 'hotel',           keywords: 'moe vermoeid energie slapen rust herstel' },
  { catId: '5', idx: 0, title: 'Verhaal over familie',        icon: 'diversity_3',     keywords: 'familie thuis gezin ervaringen verhaal patiënt' },
  { catId: '5', idx: 1, title: 'Verhaal over vitaminen',      icon: 'pill',            keywords: 'vitaminen supplement voeding ervaring patiënt' },
  { catId: '5', idx: 2, title: 'Verhaal over uiteten gaan',   icon: 'flatware',        keywords: 'restaurant uit eten gaan ervaringen patiënt' },
  { catId: '5', idx: 3, title: 'SPSK',                        icon: 'diversity_3',     keywords: 'SPSK patiëntenvereniging contact lotgenoten' },
  { catId: '6', idx: 0, title: 'Beginnen met bewegen',        icon: 'directions_walk', keywords: 'bewegen lopen wandelen starten herstel revalidatie' },
  { catId: '6', idx: 1, title: 'Bewegen en ademhalen',        icon: 'pulmonology',     keywords: 'ademhalen longen bewegen ademen kortademig' },
  { catId: '6', idx: 2, title: 'Waarom bewegen belangrijk is',icon: 'directions_run',  keywords: 'bewegen belangrijk herstel spieren conditie' },
  { catId: '6', idx: 3, title: 'Wat je nog niet kan doen',    icon: 'close',           keywords: 'beperking niet mogen tillen zwaar herstel' },
];

/* ── Problemen categories (navigates to /gids/:id) ── */
const PROBLEM_INDEX = [
  { type: 'probleem', id: 1, title: 'Voor het eten',    icon: 'gastroenterology', color: '#377B8A', circleColor: '#E6F4F2', keywords: 'vol honger eetlust geen trek misselijk' },
  { type: 'probleem', id: 2, title: 'Tijdens het eten', icon: 'flatware',         color: '#CB6E02', circleColor: '#F4D2BC', keywords: 'slikken boeren slijm verslikken moeite eten' },
  { type: 'probleem', id: 3, title: 'Kort na het eten', icon: 'clock_loader_10',  color: '#4A378A', circleColor: '#DFCFEB', keywords: 'buikkrampen diarree dumping krampen buikpijn kort na' },
  { type: 'probleem', id: 4, title: 'Lang na het eten', icon: 'clock_loader_60',  color: '#378A6C', circleColor: '#CFEBD4', keywords: 'dumping winderigheid winderig opgeblazen lang na' },
  { type: 'probleem', id: 5, title: 'Langdurig',        icon: 'all_inclusive',    color: '#8A3773', circleColor: '#EBCFDE', keywords: 'pijn gewichtsverlies hoesten langdurig chronisch aanhoudend' },
];

export function SearchOverlay({ query, setQuery, onClose }) {
  const navigate = useNavigate();
  const q = query.trim().toLowerCase();

  const uitlegResults = q.length > 0
    ? SEARCH_INDEX.filter((a) =>
        a.title.toLowerCase().includes(q) ||
        (a.keywords || '').toLowerCase().includes(q) ||
        CATEGORY_META[a.catId].label.toLowerCase().includes(q)
      )
    : [];

  const problemResults = q.length > 0
    ? PROBLEM_INDEX.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        (p.keywords || '').toLowerCase().includes(q)
      )
    : [];

  const totalResults = [...problemResults, ...uitlegResults];

  function goToArticle(article) {
    onClose();
    navigate(`/gids/uitleg/${article.catId}/${article.idx}`);
  }

  function goToProblem(problem) {
    onClose();
    navigate(`/gids/${problem.id}`);
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
        {totalResults.length > 0 && (
          <div style={{
            background: '#E8E8E8', borderRadius: '20px',
            padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px',
            overflowY: 'auto',
          }}>
            {totalResults.map((item) => {
              const isProblem = item.type === 'probleem';
              const color = isProblem ? item.color : CATEGORY_META[item.catId].color;
              const circleColor = isProblem ? item.circleColor : CATEGORY_META[item.catId].circleColor;
              const icon = isProblem ? item.icon : CATEGORY_META[item.catId].icon;
              const key = isProblem ? `p-${item.id}` : `${item.catId}-${item.idx}`;
              const onClick = isProblem ? () => goToProblem(item) : () => goToArticle(item);
              return (
                <div
                  key={key}
                  onClick={onClick}
                  style={{
                    position: 'relative', width: '100%', height: '70px',
                    background: '#FFFFFF', borderRadius: '20px',
                    cursor: 'pointer', flexShrink: 0,
                  }}
                >
                  <div style={{ position: 'absolute', width: '26px', height: '26px', left: '12px', top: '22px', borderRadius: '50%', background: circleColor }} />
                  <span className="material-symbols-outlined" style={{ position: 'absolute', left: '15px', top: '18px', fontSize: '28px', color, userSelect: 'none' }}>{icon}</span>
                  <div style={{ position: 'absolute', left: '56px', top: '50%', transform: 'translateY(-50%)', right: '40px', fontFamily: 'Inter', fontWeight: 700, fontSize: '15px', lineHeight: '19px', color }}>
                    {item.title}
                    {isProblem && <span style={{ fontWeight: 400, fontSize: '12px', color: '#B3B2B2', display: 'block' }}>Problemen</span>}
                  </div>
                  <span className="material-symbols-outlined" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: '24px', color: '#B3B2B2', userSelect: 'none' }}>keyboard_arrow_right</span>
                </div>
              );
            })}
          </div>
        )}

        {/* No results */}
        {query.trim().length > 0 && totalResults.length === 0 && (
          <div style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: '14px', color: '#B3B2B2', padding: '20px 0' }}>
            Geen resultaten gevonden voor "{query}"
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
