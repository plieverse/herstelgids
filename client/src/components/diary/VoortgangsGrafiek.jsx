import { useMemo } from 'react';
import { loadDiaryAnswersForDay } from '../../pages/diary/DiaryPage';

const MAX_BAR    = 224;
const BAR_W      = 52;
const SMILEY     = 34;
const SMILEY_GAP = 6;
const TOP_PAD    = SMILEY + SMILEY_GAP; // 40px
const CHART_H    = TOP_PAD + MAX_BAR;   // 264px
const Y_W        = 62;

// Diary traffic-light colours (same as summary rows)
const THEME = {
  green: { bar: '#B2DEB6', icon: '#378A6C' },
  amber: { bar: '#F2EFC2', icon: '#C5A500' },
  red:   { bar: '#EEC7C7', icon: '#AF1E1E' },
};

function themeKey(avg, isStool = false) {
  if (isStool) return avg >= 0.75 ? 'green' : avg >= 0.4 ? 'amber' : 'red';
  return avg >= 4 ? 'green' : avg >= 2.5 ? 'amber' : 'red';
}

// Seeded fallback score (1-5) matching DiaryHistoriePage logic
function seeded(daysAgo, qIdx) {
  return (Math.abs((daysAgo * 31 + qIdx * 17) % 5)) + 1;
}

function SmileyFace({ theme }) {
  const s = SMILEY;
  const cx = s / 2, cy = s / 2;
  const { bar, icon } = THEME[theme];

  const mouth =
    theme === 'green' ? `M ${cx - 7},${cy + 3} Q ${cx},${cy + 9} ${cx + 7},${cy + 3}` :
    theme === 'amber' ? `M ${cx - 7},${cy + 5} L ${cx + 7},${cy + 5}` :
                        `M ${cx - 7},${cy + 8} Q ${cx},${cy + 2} ${cx + 7},${cy + 8}`;

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} style={{ display: 'block', flexShrink: 0 }} aria-hidden="true">
      <circle cx={cx} cy={cy} r={cx - 1} fill={bar} stroke={icon} strokeWidth="1.5" />
      <circle cx={cx - 5} cy={cy - 3} r="2.5" fill={icon} />
      <circle cx={cx + 5} cy={cy - 3} r="2.5" fill={icon} />
      <path d={mouth} stroke={icon} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

const Y_LINES = [
  { pos: 0,   label: 'Heel goed'   },
  { pos: 0.5, label: 'Matig'       },
  { pos: 1,   label: 'Heel slecht' },
];

export default function VoortgangsGrafiek({ days = 7 }) {
  const dagData = useMemo(() => {
    const result = [];
    for (let i = 1; i <= days; i++) {
      const ans = loadDiaryAnswersForDay(i);
      if (ans && (ans.q1 || ans.q2 || ans.q3 || ans.q4 || ans.q5)) {
        result.push({ q1: ans.q1 ?? seeded(i,0), q2: ans.q2 ?? seeded(i,1), q3: ans.q3 ?? seeded(i,2), q4: ans.q4 ?? seeded(i,3), q5: ans.q5 ?? seeded(i,4) });
      } else {
        result.push({ q1: seeded(i,0), q2: seeded(i,1), q3: seeded(i,2), q4: seeded(i,3), q5: seeded(i,4) });
      }
    }
    return result;
  }, [days]);

  const n = dagData.length;

  const cats = useMemo(() => {
    const sum = dagData.reduce(
      (acc, d) => ({ q1: acc.q1+d.q1, q2: acc.q2+d.q2, q3: acc.q3+d.q3, q4: acc.q4+d.q4, q5: acc.q5+d.q5 }),
      { q1:0, q2:0, q3:0, q4:0, q5:0 },
    );
    const avg = { q1: sum.q1/n, q2: sum.q2/n, q3: sum.q3/n, q4: sum.q4/n };
    const stoolAvg = dagData.reduce((a, d) => a + (1 - Math.abs(d.q5 - 3) / 2), 0) / n;

    return [
      { label: 'Gevoel',    pct: avg.q1/5,  theme: themeKey(avg.q1)           },
      { label: 'Eten',      pct: avg.q2/5,  theme: themeKey(avg.q2)           },
      { label: 'Ademen',    pct: avg.q3/5,  theme: themeKey(avg.q3)           },
      { label: 'Pijn',      pct: avg.q4/5,  theme: themeKey(avg.q4)           },
      { label: 'Stoelgang', pct: stoolAvg,  theme: themeKey(stoolAvg, true)   },
    ];
  }, [dagData, n]);

  return (
    <div style={{ fontFamily: 'Inter', width: '100%', boxSizing: 'border-box' }}>

      {/* Chart body */}
      <div style={{ display: 'flex', flexDirection: 'row' }}>

        {/* Y-axis labels */}
        <div style={{ position: 'relative', width: Y_W, height: CHART_H, flexShrink: 0 }}>
          {Y_LINES.map(({ pos, label }) => (
            <div key={label} style={{
              position: 'absolute', right: 8,
              top: TOP_PAD + pos * MAX_BAR,
              transform: 'translateY(-50%)',
              fontSize: 10, lineHeight: '13px',
              color: '#9E9E9E', textAlign: 'right', whiteSpace: 'nowrap',
            }}>
              {label}
            </div>
          ))}
        </div>

        {/* Bars + dotted lines */}
        <div style={{ position: 'relative', flex: 1, height: CHART_H }}>

          {Y_LINES.map(({ pos, label }) => (
            <div key={label} style={{
              position: 'absolute', left: 0, right: 0,
              top: TOP_PAD + pos * MAX_BAR,
              height: 1, borderTop: '1.5px dashed #E0E0E0', zIndex: 0,
            }} />
          ))}

          <div style={{
            position: 'absolute', left: 0, right: 0, top: 0, bottom: 0,
            display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', zIndex: 1,
          }}>
            {cats.map((cat) => {
              const barH = Math.max(cat.pct * MAX_BAR, 3);
              return (
                <div key={cat.label}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: SMILEY_GAP }}
                  role="img" aria-label={cat.label}
                >
                  <SmileyFace theme={cat.theme} />
                  <div style={{
                    width: BAR_W, height: barH,
                    background: THEME[cat.theme].bar,
                    borderRadius: '10px 10px 0 0',
                  }} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* X-axis labels */}
      <div style={{ display: 'flex', justifyContent: 'space-around', marginLeft: Y_W, marginTop: 8 }}>
        {cats.map((cat) => (
          <div key={cat.label} style={{ width: BAR_W, textAlign: 'center', fontSize: 11, lineHeight: '14px', color: '#727272' }}>
            {cat.label}
          </div>
        ))}
      </div>
    </div>
  );
}
