import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/client';

// Simple markdown-to-html: handles ## headings, **bold**, bullet lists, paragraphs
function renderMarkdown(text) {
  const lines = text.split('\n');
  const html = [];
  let inList = false;

  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (inList) { html.push('</ul>'); inList = false; }
      html.push(`<h2>${line.slice(3)}</h2>`);
    } else if (line.startsWith('- ')) {
      if (!inList) { html.push('<ul>'); inList = true; }
      html.push(`<li>${applyInline(line.slice(2))}</li>`);
    } else if (line.trim() === '') {
      if (inList) { html.push('</ul>'); inList = false; }
    } else {
      if (inList) { html.push('</ul>'); inList = false; }
      html.push(`<p>${applyInline(line)}</p>`);
    }
  }
  if (inList) html.push('</ul>');
  return html.join('\n');
}

function applyInline(text) {
  return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

export default function ArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/articles/${id}`).then(({ data }) => setArticle(data)).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={styles.loading}>Laden…</div>;
  if (!article) return <div style={styles.loading}>Artikel niet gevonden.</div>;

  return (
    <main style={styles.page}>
      <button onClick={() => navigate(-1)} style={styles.backBtn} aria-label="Terug">
        ← Terug
      </button>

      <div style={styles.catTag}>{article.category}</div>
      <h1 style={styles.title}>{article.title}</h1>
      <p style={styles.intro}>{article.intro}</p>
      <hr style={styles.divider} />
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(article.body) }}
      />
    </main>
  );
}

const styles = {
  loading: { display: 'flex', justifyContent: 'center', padding: '48px', color: 'var(--color-text-muted)' },
  page: {
    flex: 1,
    padding: 'var(--space-6) var(--space-5)',
    paddingBottom: 'calc(var(--nav-height) + var(--space-6))',
    overflowY: 'auto',
  },
  backBtn: {
    display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
    color: 'var(--color-primary)', fontWeight: '600', fontSize: 'var(--text-base)',
    cursor: 'pointer', padding: '8px 0', marginBottom: 'var(--space-5)',
    minHeight: 'var(--touch-target)',
  },
  catTag: {
    fontSize: 'var(--text-xs)', fontWeight: '700', color: 'var(--color-primary)',
    textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 'var(--space-3)',
  },
  title: {
    fontSize: 'var(--text-2xl)', fontWeight: '800', color: 'var(--color-text)',
    lineHeight: 1.25, marginBottom: 'var(--space-4)',
  },
  intro: {
    fontSize: 'var(--text-lg)', color: 'var(--color-text-muted)', lineHeight: 1.7,
    marginBottom: 'var(--space-5)',
  },
  divider: {
    border: 'none', borderTop: '2px solid var(--color-border)',
    marginBottom: 'var(--space-6)',
  },
};
