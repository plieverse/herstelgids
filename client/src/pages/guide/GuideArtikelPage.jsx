import { useNavigate, useParams } from 'react-router-dom';
import BottomNav from '../../components/layout/BottomNav';

const CATEGORY_COLORS = {
  '1': { color: '#377B8A', circleColor: '#E6F4F2' },
  '2': { color: '#CB6E02', circleColor: '#F4D2BC' },
  '3': { color: '#4A378A', circleColor: '#DFCFEB' },
  '4': { color: '#378A6C', circleColor: '#CFEBD4' },
  '5': { color: '#8A3773', circleColor: '#EBCFDE' },
};

const ARTICLE_DATA = {
  '1-0': {
    title: 'Vol gevoel',
    body: 'Na de operatie wordt je maag kleiner. Daardoor kun je sneller een vol gevoel hebben.\n\nSoms zit je al vol vóór het eten. Dan is het moeilijk om te beginnen met eten.\n\nIn de video leggen we uit hoe dit komt en wat kan helpen.',
  },
  '1-1': {
    title: 'Geen honger gevoel',
    body: 'Na de operatie kun je minder honger hebben. Dit is normaal. Je maag geeft dan andere signalen aan je hersenen.\n\nIn de video leggen we uit hoe dit komt en wat kan helpen.',
  },
  '2-0': {
    title: 'Moeite met slikken',
    body: 'Na de operatie kun je moeite hebben met slikken. Dit komt door de veranderingen in je keel en maag.\n\nIn de video leggen we uit hoe dit komt en wat kan helpen.',
  },
  '2-1': {
    title: 'Gevoel dat het eten niet zakt',
    body: 'Soms zakt eten niet goed naar beneden. Het kan voelen alsof het eten blijft hangen. Dit kan na de operatie vaker voorkomen.\n\nIn de video leggen we uit hoe dit komt en wat kan helpen.',
  },
  '2-2': {
    title: 'Boeren',
    body: 'Na de operatie kun je meer boeren dan vroeger. Dit komt door de veranderingen in je maag.\n\nIn de video leggen we uit hoe dit komt en wat kan helpen.',
  },
  '2-3': {
    title: 'Veel slijm',
    body: 'Na de operatie kun je meer slijm hebben in je keel of maag. Dit kan vervelend zijn.\n\nIn de video leggen we uit hoe dit komt en wat kan helpen.',
  },
  '3-0': {
    title: 'Gevoel dat het eten terugkomt',
    body: 'Na de operatie kan eten soms omhoog komen. Je voelt dan een zure of bittere smaak in je keel.\n\nIn de video leggen we uit hoe dit komt en wat kan helpen.',
  },
  '3-1': {
    title: 'Dumping (vroeg)',
    body: 'Vroege dumping betekent dat eten te snel door je maag gaat. Dit kan kort na het eten gebeuren. Je kunt je dan misselijk, zweterig of duizelig voelen.\n\nIn de video leggen we uit hoe dit komt en wat kan helpen.',
  },
  '3-2': {
    title: 'Buikkrampen',
    body: 'Kort na het eten kun je pijn in je buik krijgen. Dit noem je buikkrampen. Het komt door de veranderingen in je spijsvertering.\n\nIn de video leggen we uit hoe dit komt en wat kan helpen.',
  },
  '3-3': {
    title: 'Diarree',
    body: 'Na de operatie gaat eten soms te snel door je maag. Daardoor kun je dunne ontlasting krijgen. Dit heet diarree.\n\nIn de video leggen we uit hoe dit komt en wat kan helpen.',
  },
  '4-0': {
    title: 'Misselijkheid',
    body: 'Na de operatie kun je misselijk zijn na het eten. Dit kan lang na het eten voorkomen.\n\nIn de video leggen we uit hoe dit komt en wat kan helpen.',
  },
  '4-1': {
    title: 'Dumping (laat)',
    body: 'Late dumping gebeurt één tot drie uur na het eten. Je bloedsuiker gaat te snel omhoog en daarna te snel omlaag. Je kunt je moe, zweterig of trillerig voelen.\n\nIn de video leggen we uit hoe dit komt en wat kan helpen.',
  },
  '4-2': {
    title: 'Winderigheid',
    body: 'Na de operatie kun je meer last hebben van winderigheid. Dit komt door de veranderingen in je spijsvertering.\n\nIn de video leggen we uit hoe dit komt en wat kan helpen.',
  },
  '4-3': {
    title: 'Diarree',
    body: 'Na de operatie gaat eten soms te snel door je maag. Daardoor kun je dunne ontlasting krijgen. Dit heet diarree.\n\nIn de video leggen we uit hoe dit komt en wat kan helpen.',
  },
  '5-0': {
    title: 'Pijn',
    body: 'Na de operatie kun je soms pijn in je buik hebben. Dit kan verschillende oorzaken hebben. Bespreek dit altijd met je zorgverlener.\n\nIn de video leggen we uit wat mogelijke oorzaken zijn.',
  },
  '5-1': {
    title: 'Gewichtsverlies',
    body: 'Na de operatie kun je afvallen. Dit is soms gewenst, maar het kan ook te veel zijn. Het is belangrijk dat je goed blijft eten.\n\nIn de video leggen we uit hoe je je gewicht gezond houdt.',
  },
  '5-2': {
    title: 'Hoesten',
    body: 'Na de operatie kun je last hebben van hoesten. Dit kan komen door maagzuur dat omhoogkomt.\n\nIn de video leggen we uit hoe dit komt en wat kan helpen.',
  },
};

const DEFAULT_ARTICLE = {
  title: 'Artikel',
  body: 'Informatie over dit onderwerp volgt binnenkort.',
};

export default function GuideArtikelPage() {
  const navigate = useNavigate();
  const { categoryId, problemIndex } = useParams();
  const key = `${categoryId}-${problemIndex}`;
  const article = ARTICLE_DATA[key] || DEFAULT_ARTICLE;
  const cat = CATEGORY_COLORS[categoryId] || CATEGORY_COLORS['1'];

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
      }}>
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
            <div style={{ width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#377B8A', userSelect: 'none' }}>search</span>
            </div>
            <div style={{ width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#377B8A', userSelect: 'none' }}>account_circle</span>
            </div>
          </div>
        </div>

        {/* Tab switcher: Problemen active */}
        <div style={{
          width: '380px', height: '39px',
          background: '#F5F5F5', borderRadius: '20px',
          display: 'flex', flexDirection: 'row', alignItems: 'center',
          padding: '3px 5px', boxSizing: 'border-box',
        }}>
          <div style={{
            width: '189px', height: '33px',
            background: '#377B8A', borderRadius: '20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '20px', lineHeight: '24px', color: '#FFFFFF', textAlign: 'center' }}>Problemen</span>
          </div>
          <div
            onClick={() => navigate('/gids/uitleg')}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '20px', lineHeight: '24px', color: '#B3B2B2', textAlign: 'center' }}>Uitleg</span>
          </div>
        </div>
      </div>

      {/* ── Back button: 46×46 at left:0, top:110 ── */}
      <div
        onClick={() => navigate(`/gids/${categoryId}`)}
        style={{
          position: 'absolute', left: '0px', top: '110px',
          width: '46px', height: '46px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <div style={{
          width: '26px', height: '26px', borderRadius: '50%',
          background: '#377B8A',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span className="material-symbols-outlined" style={{
            fontSize: '20px', color: '#E6F4F2', userSelect: 'none',
          }}>chevron_left</span>
        </div>
      </div>

      {/* ── Content card: auto height ── */}
      <div style={{
        position: 'absolute', left: '34px', top: '149px',
        width: '374px',
        background: '#FFFFFF', borderRadius: '20px',
        display: 'flex', flexDirection: 'column',
        paddingBottom: '24px',
      }}>

        {/* Top row: Lees voor button right-aligned */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '15px 21px 0 0' }}>
          <div style={{
            width: '98px', height: '24px',
            background: '#377B8A', borderRadius: '5px',
            display: 'flex', flexDirection: 'row', alignItems: 'center',
            padding: '0px 6px 0px 5px', gap: '5px', boxSizing: 'border-box',
            cursor: 'pointer',
          }}>
            <span className="material-symbols-outlined" style={{
              fontSize: '16px', lineHeight: '1', display: 'block',
              color: '#FFFFFF', userSelect: 'none', flexShrink: 0,
            }}>voice_selection</span>
            <span style={{
              fontFamily: 'Inter', fontWeight: 400, fontSize: '12px',
              lineHeight: '15px', color: '#FFFFFF', whiteSpace: 'nowrap',
            }}>Lees voor</span>
          </div>
        </div>

        {/* Title + body text */}
        <div style={{
          marginLeft: '26px', marginRight: '21px', marginTop: '8px',
          display: 'flex', flexDirection: 'column', gap: '15px',
        }}>
          <div style={{
            fontFamily: 'Inter', fontWeight: 700, fontSize: '20px',
            lineHeight: '24px', color: cat.color,
          }}>{article.title}</div>

          {/* Decorative circles below title */}
          <div style={{ position: 'relative', height: '16px', flexShrink: 0 }}>
            <div style={{
              position: 'absolute', width: '9px', height: '9px',
              left: '20px', top: '0px',
              borderRadius: '50%', background: cat.circleColor,
            }} />
            <div style={{
              position: 'absolute', width: '25px', height: '25px',
              left: '0px', top: '-4px',
              borderRadius: '50%', background: cat.circleColor,
            }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {article.body.split('\n\n').map((para, i) => (
              <div key={i} style={{
                fontFamily: 'Inter', fontWeight: 400, fontSize: '13px',
                lineHeight: '16px', color: '#727272',
                margin: 0, padding: 0,
              }}>{para}</div>
            ))}
          </div>
        </div>

        {/* Video thumbnail with play button */}
        <div style={{
          position: 'relative',
          marginLeft: '21px', marginTop: '20px',
          width: '317px', height: '178px',
          borderRadius: '8px', overflow: 'hidden',
          background: '#D0E9E5', flexShrink: 0,
        }}>
          <img
            src="/tumbnail-video.png"
            alt="Video thumbnail"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '65px', height: '65px',
            background: '#377B8A', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}>
            <span className="material-symbols-outlined" style={{
              fontSize: '40px', color: '#FFFFFF', userSelect: 'none',
            }}>play_arrow</span>
          </div>
        </div>
      </div>

      {/* ── Bottom Nav ── */}
      <BottomNav />
    </div>
  );
}
