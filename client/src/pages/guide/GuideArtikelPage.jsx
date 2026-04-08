import { useNavigate, useParams } from 'react-router-dom';
import BottomNav from '../../components/layout/BottomNav';

const ARTICLE_DATA = {
  '1-0': {
    title: 'Vol gevoel',
    body: 'Na de operatie kun je sneller een vol gevoel hebben. Dat komt doordat je maag kleiner is of anders werkt dan vroeger. Soms kan je dan al vóór het eten vol zitten. Daardoor heb je soms minder zin om te eten of is beginnen met eten moeilijk. In deze video leggen we uit hoe dat komt en wat kan helpen.',
  },
  '1-1': {
    title: 'Geen honger',
    body: 'Na de operatie kan het voorkomen dat je minder of geen honger meer voelt. Dit is normaal en heeft te maken met veranderingen in je maag en de signalen die naar je hersenen worden gestuurd. In deze video leggen we uit hoe dat komt en wat kan helpen.',
  },
  '2-0': {
    title: 'Moeite met slikken',
    body: 'Moeite met slikken kan voorkomen na een maagoperatie. Het heeft te maken met de veranderingen in je slokdarm en maag. In deze video leggen we uit waarom dit kan happen en wat je eraan kunt doen.',
  },
  '2-1': {
    title: 'Veel boeren',
    body: 'Na een maagoperatie kan het voorkomen dat je meer boert dan voorheen. Dit heeft te maken met de veranderde werking van je maag en slokdarm. In deze video leggen we uit hoe dat komt en wat kan helpen.',
  },
  '2-2': {
    title: 'Veel slijm',
    body: 'Veel slijm in de keel of maag kan een vervelend bijverschijnsel zijn na een operatie. In deze video leggen we uit hoe dat komt en wat kan helpen.',
  },
  '3-0': {
    title: 'Buikkrampen',
    body: 'Buikkrampen kort na het eten kunnen optreden als gevolg van veranderingen in je spijsvertering. In deze video leggen we uit hoe dat komt en wat kan helpen.',
  },
  '3-1': {
    title: 'Diarree',
    body: 'Diarree na het eten kan voorkomen doordat je maag het voedsel sneller doorgeeft aan je darmen. In deze video leggen we uit hoe dat komt en wat kan helpen.',
  },
  '3-2': {
    title: 'Dumping',
    body: 'Dumping is een veelvoorkomend verschijnsel na maagoperaties waarbij voedsel te snel in de dunne darm terechtkomt. In deze video leggen we uit hoe dat komt en wat kan helpen.',
  },
  '4-0': {
    title: 'Dumping',
    body: 'Late dumping treedt op één tot drie uur na het eten op en hangt samen met een te snelle stijging en daling van de bloedsuikerspiegel. In deze video leggen we uit hoe dat komt en wat kan helpen.',
  },
  '4-1': {
    title: 'Winderigheid',
    body: 'Winderigheid na het eten kan toenemen na een maagoperatie. Dit heeft te maken met veranderingen in de spijsvertering. In deze video leggen we uit hoe dat komt en wat kan helpen.',
  },
  '5-0': {
    title: 'Pijn',
    body: 'Langdurige pijn na een maagoperatie kan verschillende oorzaken hebben. Het is belangrijk dit te bespreken met uw zorgverlener. In deze video leggen we uit wat mogelijke oorzaken zijn en wat kan helpen.',
  },
  '5-1': {
    title: 'Gewichtsverlies',
    body: 'Gewichtsverlies na een maagoperatie is vaak gewenst, maar kan ook te ver gaan. In deze video leggen we uit hoe u een gezond gewicht kunt behouden.',
  },
  '5-2': {
    title: 'Hoesten',
    body: 'Aanhoudend hoesten kan na een maagoperatie optreden, soms door terugvloeiing van maagzuur. In deze video leggen we uit hoe dat komt en wat kan helpen.',
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

      {/* ── Content card: left:34, top:149, width:374, height:515 ── */}
      <div style={{
        position: 'absolute', left: '34px', top: '149px',
        width: '374px', height: '515px',
        background: '#FFFFFF', borderRadius: '20px',
      }}>

        {/* Decorative ellipses */}
        {/* Ellipse 4: 9×9 at left:41, top:49 */}
        <div style={{
          position: 'absolute', width: '9px', height: '9px',
          left: '41px', top: '49px',
          borderRadius: '50%', background: '#E6F4F2',
        }} />
        {/* Ellipse 2: 25×25 at left:21, top:58 */}
        <div style={{
          position: 'absolute', width: '25px', height: '25px',
          left: '21px', top: '58px',
          borderRadius: '50%', background: '#E6F4F2',
        }} />

        {/* "Lees voor" button: left:245, top:15, width:98, height:24 */}
        <div style={{
          position: 'absolute', left: '245px', top: '15px',
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

        {/* Frame 53: title + body text — left:26, top:59, width:303, gap:15 */}
        <div style={{
          position: 'absolute', left: '26px', top: '59px',
          width: '303px',
          display: 'flex', flexDirection: 'column', gap: '15px',
        }}>
          <div style={{
            fontFamily: 'Inter', fontWeight: 700, fontSize: '20px',
            lineHeight: '24px', color: '#377B8A',
            width: '261px',
          }}>{article.title}</div>
          <div style={{
            fontFamily: 'Inter', fontWeight: 400, fontSize: '13px',
            lineHeight: '16px', color: '#727272',
            width: '303px',
          }}>{article.body}</div>
        </div>

        {/* Video thumbnail placeholder — left:21, top:286, width:317, height:178 */}
        <div style={{
          position: 'absolute', left: '21px', top: '286px',
          width: '317px', height: '178px',
          background: '#D0E9E5', borderRadius: '8px',
          overflow: 'hidden',
        }} />

        {/* Play button — centered on image: left:147, top:342, width:65, height:65 */}
        <div style={{
          position: 'absolute', left: '147px', top: '342px',
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

      {/* ── Bottom Nav ── */}
      <BottomNav />
    </div>
  );
}
