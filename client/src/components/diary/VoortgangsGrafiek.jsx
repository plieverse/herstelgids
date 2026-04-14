import { useMemo } from 'react';
import { loadDiaryAnswersForDay } from '../../pages/diary/DiaryPage';

const BAR_W   = 52;
const TOP_PAD = 12; // small breathing room above the top dotted line
const Y_W     = 62;

// 5-grade colours matching the diary answer circles (score 1=best → darkest green, 5=worst → red)
const THEME = {
  1: { bar: '#B2DEB6', icon: '#378A6C' },
  2: { bar: '#CFEBD4', icon: '#378A6C' },
  3: { bar: '#EBE9CF', icon: '#C5A500' },
  4: { bar: '#F0C8AD', icon: '#CB6E02' },
  5: { bar: '#EEC7C7', icon: '#AF1E1E' },
};

// Returns 1 (best/green) … 5 (worst/red)
function themeScore(avg, isStool = false) {
  if (isStool) {
    // stoolAvg: 1.0 = perfect, 0.0 = worst
    if (avg >= 0.85) return 1;
    if (avg >= 0.65) return 2;
    if (avg >= 0.4)  return 3;
    if (avg >= 0.15) return 4;
    return 5;
  }
  // q1–q4: score 1 = best, 5 = worst
  if (avg <= 1.8) return 1;
  if (avg <= 2.6) return 2;
  if (avg <= 3.4) return 3;
  if (avg <= 4.2) return 4;
  return 5;
}

// Seeded fallback score (1-5) matching DiaryHistoriePage logic
// qIdx 0 returns 1 (best) so demo shows a green bar
function seeded(daysAgo, qIdx) {
  if (qIdx === 0) return 1;
  return (Math.abs((daysAgo * 31 + qIdx * 17) % 5)) + 1;
}

// Category icon definitions — matching the diary summary rows
const CAT_DEFS = [
  { label: 'Vergelijking', icon: 'health_metrics', isText: false },
  { label: 'Eten',      icon: 'nutrition',       isText: false },
  { label: 'Ademen',    icon: 'pulmonology',     isText: false },
  { label: 'Pijn',      icon: 'bolt',            isText: false },
  { label: 'Stoelgang', icon: 'WC',              isText: true  },
];

const Y_LINES = [
  { pos: 0,   label: 'Heel goed'    },
  { pos: 0.5, label: 'Middelmatig'  },
  { pos: 1,   label: 'Heel slecht'  },
];

export default function VoortgangsGrafiek({ days = 7, maxBarHeight = 224, baseOffset = 0 }) {
  const CHART_H = TOP_PAD + maxBarHeight;

  const dagData = useMemo(() => {
    const result = [];
    for (let i = 1; i <= days; i++) {
      const d = i + baseOffset; // actual daysAgo to load
      const ans = loadDiaryAnswersForDay(d);
      if (ans && (ans.q1 || ans.q2 || ans.q3 || ans.q4 || ans.q5)) {
        result.push({ q1: ans.q1 ?? seeded(d,0), q2: ans.q2 ?? seeded(d,1), q3: ans.q3 ?? seeded(d,2), q4: ans.q4 ?? seeded(d,3), q5: ans.q5 ?? seeded(d,4) });
      } else {
        result.push({ q1: seeded(d,0), q2: seeded(d,1), q3: seeded(d,2), q4: seeded(d,3), q5: seeded(d,4) });
      }
    }
    return result;
  }, [days, baseOffset]);

  const n = dagData.length;

  const cats = useMemo(() => {
    const sum = dagData.reduce(
      (acc, d) => ({ q1: acc.q1+d.q1, q2: acc.q2+d.q2, q3: acc.q3+d.q3, q4: acc.q4+d.q4, q5: acc.q5+d.q5 }),
      { q1:0, q2:0, q3:0, q4:0, q5:0 },
    );
    const avg = { q1: sum.q1/n, q2: sum.q2/n, q3: sum.q3/n, q4: sum.q4/n };
    const stoolAvg = dagData.reduce((a, d) => a + (1 - Math.abs(d.q5 - 3) / 2), 0) / n;

    // pct: score 1 = best → pct 1.0 (tallest bar); score 5 = worst → pct 0.2
    return [
      { ...CAT_DEFS[0], pct: (6 - avg.q1) / 5, theme: themeScore(avg.q1)         },
      { ...CAT_DEFS[1], pct: (6 - avg.q2) / 5, theme: themeScore(avg.q2)         },
      { ...CAT_DEFS[2], pct: (6 - avg.q3) / 5, theme: themeScore(avg.q3)         },
      { ...CAT_DEFS[3], pct: (6 - avg.q4) / 5, theme: themeScore(avg.q4)         },
      { ...CAT_DEFS[4], pct: stoolAvg,           theme: themeScore(stoolAvg, true) },
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
              top: TOP_PAD + pos * maxBarHeight,
              transform: 'translateY(-50%)',
              fontSize: 10, lineHeight: '13px',
              color: '#377B8A', textAlign: 'right', whiteSpace: 'nowrap',
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
              top: TOP_PAD + pos * maxBarHeight,
              height: 1, borderTop: '1.5px dashed #E0E0E0', zIndex: 0,
            }} />
          ))}

          <div style={{
            position: 'absolute', left: 0, right: 0, top: 0, bottom: 0,
            display: 'flex', alignItems: 'flex-end', zIndex: 1,
          }}>
            {cats.map((cat) => {
              const barH = Math.max(cat.pct * maxBarHeight, 3);
              const iconColor = THEME[cat.theme].icon;
              const showIcon = barH >= 34;

              return (
                <div key={cat.label} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: '100%' }}>
                  <div
                    role="img"
                    aria-label={cat.label}
                    style={{
                      position: 'relative',
                      width: BAR_W,
                      height: barH,
                      background: THEME[cat.theme].bar,
                      borderRadius: '10px 10px 0 0',
                    }}
                  >
                    {showIcon && (
                      <div style={{
                        position: 'absolute', top: 7, left: 0, right: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {cat.isText ? (
                          <span style={{ fontSize: 20, fontWeight: 400, color: iconColor, fontFamily: 'Inter', userSelect: 'none', lineHeight: '22px' }}>
                            {cat.icon}
                          </span>
                        ) : (
                          <span className="material-symbols-outlined" style={{ fontSize: 28, color: iconColor, userSelect: 'none' }}>
                            {cat.icon}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* X-axis labels — same flex:1 structure as bars so they stay perfectly centred */}
      <div style={{ display: 'flex', marginLeft: Y_W, marginTop: 8 }}>
        {cats.map((cat) => (
          <div key={cat.label} style={{ flex: 1, textAlign: 'center', fontSize: 11, lineHeight: '14px', color: '#377B8A', fontWeight: 700 }}>
            {cat.label}
          </div>
        ))}
      </div>
    </div>
  );
}
