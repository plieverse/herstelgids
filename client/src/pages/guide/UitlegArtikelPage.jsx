import { useNavigate, useParams } from 'react-router-dom';
import BottomNav from '../../components/layout/BottomNav';

const UITLEG_CATEGORY_COLORS = {
  '1': { color: '#AF1E1E', circleColor: '#EBCFCF' },
  '2': { color: '#378A6C', circleColor: '#CFEBD4' },
  '3': { color: '#377B8A', circleColor: '#E6F4F2' },
  '4': { color: '#C5A500', circleColor: '#EBE9CF' },
  '5': { color: '#8A3773', circleColor: '#EBCFDE' },
  '6': { color: '#CB6E02', circleColor: '#F4D2BC' },
};

const UITLEG_ARTICLE_DATA = {
  /* ── Eten ── */
  '1-0': {
    title: 'Portiegrootte',
    body: 'Na de operatie is je maag kleiner of anders. Daardoor kun je minder eten per keer.\n\nBegin met kleine porties. Eet rustig en kauw goed.\n\nAls je te veel eet, kun je je misselijk voelen of pijn krijgen. Dat is vervelend.\n\nIn de video leggen we uit hoe groot een goede portie is en hoe je dat goed kunt bijhouden.',
  },
  '1-1': {
    title: 'Gewicht',
    body: 'Na de operatie kun je afvallen. Dit is normaal in het begin.\n\nHet is belangrijk dat je niet te veel afvalt. Je lichaam heeft genoeg energie nodig om te herstellen.\n\nWeeg jezelf regelmatig. Zo zie je of je gewicht stabiel blijft.\n\nIn de video leggen we uit wat een gezond gewicht is na de operatie en wat je kunt doen als je te veel afvalt.',
  },
  '1-2': {
    title: 'Eiwitten',
    body: 'Eiwitten zijn belangrijk voor je lichaam. Ze helpen je wonden genezen en je spieren sterk houden.\n\nNa de operatie heb je meer eiwitten nodig dan normaal.\n\nEiwitten zitten in vlees, vis, eieren, zuivel en peulvruchten.\n\nIn de video leggen we uit hoeveel eiwitten je per dag nodig hebt en hoe je dat makkelijk kunt halen.',
  },
  '1-3': {
    title: 'Koolhydraten',
    body: 'Koolhydraten geven je energie. Ze zitten in brood, rijst, pasta en aardappelen.\n\nNa de operatie is het beter om niet te veel koolhydraten tegelijk te eten. Zeker geen suiker of zoete dranken.\n\nDit kan dumping veroorzaken. Dat is een naar gevoel kort of lang na het eten.\n\nIn de video leggen we uit welke koolhydraten goed zijn voor jou en hoeveel je kunt eten.',
  },

  /* ── Drinken ── */
  '2-0': {
    title: 'Porties',
    body: 'Na de operatie is het belangrijk om goed op te letten hoeveel je drinkt per keer.\n\nDrink kleine hoeveelheden tegelijk. Grote slokken kunnen een naar gevoel geven.\n\nDrink niet tijdens het eten. Wacht minstens 30 minuten na het eten voordat je iets drinkt.\n\nIn de video leggen we uit hoeveel je per keer kunt drinken en hoe je dat goed kunt bijhouden.',
  },
  '2-1': {
    title: 'Drinkvoeding',
    body: 'Soms kun je na de operatie niet genoeg eten. Dan kan drinkvoeding helpen.\n\nDrinkvoeding is een vloeibare maaltijd met veel voedingsstoffen. Je kunt het drinken als aanvulling op je gewone eten.\n\nEr zijn veel soorten drinkvoeding. Je diëtist kan je helpen kiezen welke het beste bij jou past.\n\nIn de video leggen we meer uit over drinkvoeding en hoe je het kunt gebruiken.',
  },
  '2-2': {
    title: 'Alcohol',
    body: 'Na de operatie is het beter om geen alcohol te drinken.\n\nJe lichaam neemt alcohol sneller op dan vroeger. Daardoor kun je al snel dronken zijn van een kleine hoeveelheid.\n\nAlcohol kan ook je maag en darmen prikkelen. Dit kan pijn of misselijkheid geven.\n\nIn de video leggen we uit waarom alcohol gevaarlijk kan zijn na de operatie.',
  },

  /* ── Medicijnen en hulpmiddelen ── */
  '3-0': {
    title: 'Medicijnen',
    body: 'Na de operatie krijg je medicijnen. Deze helpen je te herstellen en houden pijn en infecties weg.\n\nNeem je medicijnen altijd op de tijden die de dokter heeft aangegeven. Sla geen dosis over.\n\nSommige medicijnen moet je met water innemen. Anderen kun je ook met voedsel nemen.\n\nIn de video leggen we uit welke medicijnen je kunt verwachten na de operatie en hoe je ze goed gebruikt.',
  },
  '3-1': {
    title: 'Maagzuur',
    body: 'Na de operatie kun je last hebben van maagzuur. Je voelt dan een brandend gevoel in je keel of borst.\n\nJe krijgt vaak medicijnen tegen maagzuur. Deze verminderen de aanmaak van zuur in je maag.\n\nEet kleine porties en ga niet direct na het eten liggen. Dit helpt ook tegen maagzuur.\n\nIn de video leggen we uit hoe maagzuur ontstaat na de operatie en wat je ertegen kunt doen.',
  },
  '3-2': {
    title: 'Pijnstillers',
    body: 'Na de operatie heb je pijn. Dat is normaal. Je krijgt pijnstillers om de pijn te verminderen.\n\nNeem pijnstillers op de tijden die de dokter aangeeft. Wacht niet tot de pijn heel erg is.\n\nAls de pijn niet minder wordt, neem dan contact op met het ziekenhuis.\n\nIn de video leggen we uit welke pijnstillers je kunt gebruiken en wanneer je om hulp moet vragen.',
  },
  '3-3': {
    title: 'Sondevoeding',
    body: 'Soms kun je na de operatie niet goed eten of drinken. Dan krijg je sondevoeding.\n\nSondevoeding is vloeibaar voedsel dat via een slangetje rechtstreeks in je maag of darmen gaat.\n\nDit zorgt ervoor dat je lichaam genoeg voedingsstoffen krijgt terwijl je herstelt.\n\nIn de video leggen we uit hoe sondevoeding werkt en hoe lang je het nodig kunt hebben.',
  },
  '3-4': {
    title: 'JP drain',
    body: 'Na de operatie heb je soms een JP drain. Dit is een dun slangetje dat vocht uit je lichaam afvoert.\n\nHet vocht dat eruit komt, wordt opgevangen in een klein zakje. Dit zakje moet je regelmatig leegmaken.\n\nDe JP drain blijft zitten totdat er weinig vocht meer uitkomt.\n\nIn de video leggen we uit hoe je voor de JP drain zorgt en wanneer je contact op moet nemen met het ziekenhuis.',
  },

  /* ── Slaap ── */
  '4-0': {
    title: 'Slaaphouding',
    body: 'Na de operatie is het belangrijk hoe je ligt als je slaapt. Plat liggen kan problemen geven.\n\nSlaap met je hoofd en bovenlichaam iets omhoog. Dit voorkomt dat maagzuur omhoogkomt in de nacht.\n\nGebruik een extra kussen of zet het hoofdeinde van je bed iets hoger. Dit helpt ook als je pijn hebt.\n\nIn de video leggen we uit welke slaaphouding het beste is na de operatie.',
  },
  '4-1': {
    title: 'Maagzuur in de nacht',
    body: 'Sommige mensen hebben in de nacht last van maagzuur na de operatie. Je kunt wakker worden van een brandend gevoel in je keel of borst.\n\nDit komt omdat maagzuur omhoogkomt als je plat ligt. Hoog slapen helpt hiertegen.\n\nEet ook niet vlak voor het slapengaan. Wacht minstens twee uur na het avondeten voordat je naar bed gaat.\n\nIn de video leggen we meer uit over maagzuur in de nacht en hoe je dat kunt verminderen.',
  },
  '4-2': {
    title: 'Eten voor het slapen',
    body: 'Na de operatie is het beter om niet vlak voor het slapengaan te eten. Je maag heeft tijd nodig om voedsel te verwerken.\n\nEet je avondmaaltijd minstens twee uur voor het slapengaan. Kies een lichte maaltijd in de avond.\n\nEen volle maag kan ook je slaap verstoren. Je kunt je dan oncomfortabel voelen in de nacht.\n\nIn de video leggen we uit wat je het beste kunt eten en drinken voor het slapengaan.',
  },
  '4-3': {
    title: 'Vermoeidheid',
    body: 'Na de operatie kun je je heel moe voelen. Dit is normaal. Je lichaam werkt hard om te herstellen.\n\nRust genoeg. Doe rustig aan en neem de tijd. Forceer jezelf niet om te snel weer actief te zijn.\n\nDe vermoeidheid wordt meestal minder naarmate je herstelt. Dit kan weken tot maanden duren.\n\nIn de video leggen we uit hoe je goed kunt omgaan met vermoeidheid na de operatie.',
  },

  /* ── Ervaringen andere patiënten ── */
  '5-0': {
    title: 'Verhaal over familie',
    body: 'Een operatie heeft niet alleen invloed op jou, maar ook op je familie. Familieleden maken zich zorgen en willen helpen.\n\nIn dit verhaal vertelt een patient hoe zijn of haar familie reageerde na de operatie. En hoe ze samen door het herstel zijn gegaan.\n\nHet kan fijn zijn om te horen hoe anderen dat hebben ervaren.\n\nBekijk de video om het verhaal te horen.',
  },
  '5-1': {
    title: 'Verhaal over vitaminen',
    body: 'Na de operatie heeft je lichaam extra vitaminen nodig. Sommige patienten merken pas later dat ze tekorten hebben.\n\nIn dit verhaal vertelt Piet hoe hij zich erg moe voelde na de operatie. Hij ontdekte dat hij te weinig vitaminen had. Na het aanvullen voelde hij zich veel beter.\n\nBekijk de video om zijn verhaal te horen.',
  },
  '5-2': {
    title: 'Verhaal over uiteten gaan',
    body: 'Na de operatie vraag je je misschien af of je nog gewoon uit eten kunt gaan. Dat kan, maar je moet wel op een paar dingen letten.\n\nIn dit verhaal vertelt een patient over zijn of haar eerste keer uit eten na de operatie. Wat ging goed en wat was lastig?\n\nBekijk de video om te horen hoe je dat het beste kunt aanpakken.',
  },
  '5-3': {
    title: 'SPSK',
    body: 'SPSK staat voor Stichting voor patienten na een slokdarm- of maagoperatie. Zij helpen mensen die dezelfde operatie hebben gehad.\n\nBij SPSK kun je in contact komen met andere patienten. Je kunt ervaringen delen en vragen stellen.\n\nVeel mensen vinden het fijn om te praten met iemand die begrijpt wat je doormaakt.\n\nBekijk de video voor meer informatie over SPSK en hoe je lid kunt worden.',
  },

  /* ── Bewegen ── */
  '6-0': {
    title: 'Beginnen met bewegen',
    body: 'Na de operatie word je in het ziekenhuis al geholpen om te beginnen met bewegen. Thuis moet je dat zelf doen.\n\nRustig beginnen met bewegen is normaal en belangrijk. Je hoeft niet veel te doen, maar wel regelmatig kleine stapjes. Begin bijvoorbeeld met wandelen in huis. Daarna in de straat. En dn daarna in de wijk.\n\nDe video hieronder geeft meer uitleg en tips.',
  },
  '6-1': {
    title: 'Bewegen en ademhalen',
    body: 'Bewegen en ademhalen hangen samen. Als je beweegt, ademt je dieper. Dat is goed voor je longen.\n\nNa de operatie kunnen je longen wat minder goed werken. Regelmatig bewegen helpt om ze weer sterker te maken.\n\nProbeer elke dag buiten te lopen. Frisse lucht en bewegen samen helpen je sneller te herstellen.\n\nIn de video leggen we uit hoe bewegen en ademhalen elkaar versterken na de operatie.',
  },
  '6-2': {
    title: 'Waarom bewegen belangrijk is',
    body: 'Bewegen na de operatie is heel belangrijk. Het helpt je lichaam om sneller te herstellen.\n\nAls je beweegt, gaat je bloed beter stromen. Dat vermindert het risico op problemen zoals trombose.\n\nBewegen helpt ook tegen vermoeidheid. Hoe meer je beweegt, hoe meer energie je krijgt.\n\nIn de video leggen we uit waarom bewegen zo belangrijk is na de operatie.',
  },
  '6-3': {
    title: 'Wat je nog niet kan doen',
    body: 'Na de operatie zijn er dingen die je nog niet kunt doen. Dat is normaal. Je lichaam heeft tijd nodig.\n\nTil geen zware dingen op. Doe geen zware sport. Vermijd activiteiten waarbij je buik gespannen wordt.\n\nVraag je arts of fysiotherapeut wat wel en niet mag in jouw situatie.\n\nIn de video leggen we uit welke activiteiten je beter kunt vermijden na de operatie en wanneer je meer kunt gaan doen.',
  },
};

const DEFAULT_ARTICLE = {
  title: 'Artikel',
  body: 'Informatie over dit onderwerp volgt binnenkort.',
};

export default function UitlegArtikelPage() {
  const navigate = useNavigate();
  const { id, articleIndex } = useParams();
  const key = `${id}-${articleIndex}`;
  const article = UITLEG_ARTICLE_DATA[key] || DEFAULT_ARTICLE;
  const cat = UITLEG_CATEGORY_COLORS[id] || UITLEG_CATEGORY_COLORS['1'];

  return (
    <div style={{
      position: 'relative', width: '100%', maxWidth: '414px',
      height: '736px', margin: '0 auto',
      background: '#F6F6F6', fontFamily: 'Inter, sans-serif', overflow: 'hidden',
    }}>

      {/* ── Topbar ── */}
      <div style={{
        position: 'absolute', left: 0, top: 0, width: '414px', height: '110px',
        background: '#FFFFFF', zIndex: 10,
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

        {/* Tab switcher: Uitleg active */}
        <div style={{
          width: '380px', height: '39px',
          background: '#F5F5F5', borderRadius: '20px',
          display: 'flex', flexDirection: 'row', alignItems: 'center',
          padding: '3px 5px', boxSizing: 'border-box',
        }}>
          <div
            onClick={() => navigate('/gids')}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '20px', lineHeight: '24px', color: '#B3B2B2', textAlign: 'center' }}>Problemen</span>
          </div>
          <div style={{
            width: '189px', height: '33px',
            background: '#377B8A', borderRadius: '20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '20px', lineHeight: '24px', color: '#FFFFFF', textAlign: 'center' }}>Uitleg</span>
          </div>
        </div>
      </div>

      {/* ── Back button ── */}
      <div
        onClick={() => navigate(`/gids/uitleg/${id}`)}
        style={{
          position: 'absolute', left: '0px', top: '110px',
          width: '46px', height: '46px', zIndex: 10,
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

      {/* ── Centred content area ── */}
      <div style={{
        position: 'absolute', top: '110px', bottom: '58px', left: 0, right: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
      {/* ── Content card ── */}
      <div style={{
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
          <div style={{ position: 'relative' }}>
            {/* Decorative circles behind title */}
            <div style={{
              position: 'absolute', width: '9px', height: '9px',
              left: '15px', top: '-10px',
              borderRadius: '50%', background: cat.circleColor, zIndex: 0,
            }} />
            <div style={{
              position: 'absolute', width: '25px', height: '25px',
              left: '-5px', top: '-5px',
              borderRadius: '50%', background: cat.circleColor, zIndex: 0,
            }} />
            <div style={{
              fontFamily: 'Inter', fontWeight: 700, fontSize: '20px',
              lineHeight: '24px', color: cat.color,
              position: 'relative', zIndex: 1,
            }}>{article.title}</div>
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
          margin: '20px auto 0',
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
      </div>{/* end centred area */}

      {/* ── Bottom Nav ── */}
      <BottomNav />
    </div>
  );
}
