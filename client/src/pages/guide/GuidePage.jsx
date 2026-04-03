import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/client';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';

const CATEGORIES = [
  { id: 'voeding', label: 'Eten & drinken', emoji: '🥗' },
  { id: 'bewegen', label: 'Bewegen & rust', emoji: '🚶' },
  { id: 'herstel', label: 'Klachten & wond', emoji: '💊' },
  { id: 'vragen', label: 'Veelgestelde vragen', emoji: '❓' },
];

export default function GuidePage() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    api.get('/articles').then(({ data }) => setArticles(data)).finally(() => setLoading(false));
  }, []);

  const filtered = articles.filter((a) => {
    const matchesCategory = !activeCategory || a.category === activeCategory;
    const matchesQuery =
      !query ||
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.intro.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  if (loading) return <div style={styles.loading}>Laden…</div>;

  return (
    <main className="page">
      <h1 className="page-title">Gids</h1>

      <Input
        id="search"
        type="search"
        placeholder="Zoek een onderwerp…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginBottom: 'var(--space-5)' }}
      />

      <div style={styles.categories}>
        <button
          style={{ ...styles.catBtn, ...(activeCategory === null ? styles.catBtnActive : {}) }}
          onClick={() => setActiveCategory(null)}
        >
          Alles
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            style={{ ...styles.catBtn, ...(activeCategory === cat.id ? styles.catBtnActive : {}) }}
            onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p style={styles.empty}>Geen artikelen gevonden.</p>
      ) : (
        <div style={styles.list}>
          {filtered.map((article) => (
            <Card
              key={article.id}
              onClick={() => navigate(`/gids/${article.id}`)}
              style={styles.articleCard}
            >
              <div style={styles.catTag}>
                {CATEGORIES.find((c) => c.id === article.category)?.emoji}{' '}
                {CATEGORIES.find((c) => c.id === article.category)?.label || article.category}
              </div>
              <h2 style={styles.articleTitle}>{article.title}</h2>
              <p style={styles.articleIntro}>{article.intro}</p>
              <span style={styles.readMore}>Lees meer →</span>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}

const styles = {
  loading: { display: 'flex', justifyContent: 'center', padding: '48px', color: 'var(--color-text-muted)' },
  categories: { display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-5)' },
  catBtn: {
    padding: '8px 16px', borderRadius: 'var(--radius-full)',
    border: '2px solid var(--color-border)', background: 'var(--color-surface)',
    fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--color-text-muted)',
    cursor: 'pointer', minHeight: '40px', whiteSpace: 'nowrap',
    transition: 'all 0.15s',
  },
  catBtnActive: {
    background: 'var(--color-primary)', color: '#fff',
    borderColor: 'var(--color-primary)',
  },
  list: { display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' },
  articleCard: { cursor: 'pointer', transition: 'box-shadow 0.15s', ':hover': { boxShadow: 'var(--shadow-md)' } },
  catTag: { fontSize: 'var(--text-xs)', fontWeight: '700', color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 'var(--space-2)' },
  articleTitle: { fontSize: 'var(--text-lg)', fontWeight: '700', color: 'var(--color-text)', marginBottom: 'var(--space-2)', lineHeight: 1.3 },
  articleIntro: { fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: 'var(--space-3)' },
  readMore: { fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--color-primary)' },
  empty: { color: 'var(--color-text-muted)', textAlign: 'center', padding: 'var(--space-8)' },
};
