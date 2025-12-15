import React, { useEffect, useMemo, useState } from 'react';
import { generateSummaryFromTitle } from '../services/ai';

type Post = { id: number; title: string; summary: string; createdAt: number };
const STORAGE_KEY = 'ai-blog-dashboard-posts-v1';

const seed: Post[] = [
  {
    id: 1,
    title: 'Front-end geliştiriciler için AI destekli blog stratejisi',
    summary:
      'Teknik içerikleri, kariyer hikâyelerini ve GitHub projelerini yapay zeka yardımıyla nasıl daha görünür hale getirebileceğini anlatan bir rehber.',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: 2,
    title: 'Portfolyo odaklı içerik üretimi',
    summary:
      'LinkedIn, GitHub ve kişisel web siteni aynı hikâye etrafında birleştiren, sürdürülebilir bir içerik sistemi kurma fikri.',
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
  },
];

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return seed;
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? (parsed as Post[]) : seed;
    } catch {
      return seed;
    }
  });

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const [aiLoading, setAiLoading] = useState(false);
  const [aiMode, setAiMode] = useState<'openai' | 'demo' | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch {}
  }, [posts]);

  const sortedPosts = useMemo(
    () => [...posts].sort((a, b) => b.createdAt - a.createdAt),
    [posts]
  );

  const resetForm = () => {
    setTitle('');
    setSummary('');
    setEditingId(null);
    setAiMode(null);
  };

  const handleSave = () => {
    const t = title.trim();
    const s = summary.trim();
    if (!t) {
      alert('Başlık boş olamaz 💙');
      return;
    }

    if (editingId === null) {
      setPosts((prev) => [
        { id: Date.now(), title: t, summary: s, createdAt: Date.now() },
        ...prev,
      ]);
    } else {
      setPosts((prev) =>
        prev.map((p) => (p.id === editingId ? { ...p, title: t, summary: s } : p))
      );
    }

    resetForm();
  };

  const handleEdit = (post: Post) => {
    setTitle(post.title);
    setSummary(post.summary);
    setEditingId(post.id);
    setAiMode(null);
  };

  const handleDelete = (id: number) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    if (editingId === id) resetForm();
  };

  const handleAiFill = async () => {
    const t = title.trim();
    if (!t) return alert('Önce bir başlık yaz 💙');

    try {
      setAiLoading(true);
      const result = await generateSummaryFromTitle(t); // { summary, source }
      setSummary(result.summary);
      setAiMode(result.source);
    } catch (e: any) {
      console.error('AI ERROR =>', e);
      alert(String(e?.message || e));
      setAiMode('demo');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="content">
      <div className="content-top">
        <div className="pill">İçerik paneli</div>
        <div className="content-title">Bloglarını yönet · taslak oluştur · portfolyona taşı</div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-head">
            <div>
              <div className="h2">
                Yeni blog taslağı
                {editingId !== null && <span className="badge">Düzenleniyor</span>}
              </div>
              <div className="muted">Taslaklar yayınlanmadan önce sadece seninle ✨</div>
            </div>
          </div>

          <div className="form">
            <div className="field">
              <label className="label">Başlık</label>
              <input
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Örn. React ile modern dashboard tasarımı"
              />
            </div>

            <div className="field">
              <label className="label">Kısa özet</label>
              <textarea
                className="textarea"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="AI burada kısa, net bir özet üretecek…"
              />
              {aiMode === 'demo' && (
                <div className="badgeDemo">Demo mode: quota yoksa örnek metin üretildi</div>
              )}
              {aiMode === 'openai' && <div className="badgeLive">AI: Canlı üretim</div>}
            </div>
          </div>

          <div className="row-between">
            <div className="hint">İpucu: Taslakları burada biriktir, sonra LinkedIn & portfolyona taşı.</div>

            <div className="btn-row">
              <button className="btn ghost" type="button" onClick={handleAiFill} disabled={aiLoading}>
                {aiLoading ? 'Yükleniyor…' : '🤖 AI ile doldur'}
              </button>

              <button className="btn primary" type="button" onClick={handleSave}>
                {editingId === null ? 'Taslağı kaydet' : 'Değişiklikleri kaydet'}
              </button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <div>
              <div className="h2">Genel görünüm</div>
              <div className="muted">Paneli, kariyer yolculuğunu yazıya dökmek için kullan.</div>
            </div>
          </div>

          <p className="muted" style={{ marginTop: 8 }}>
            Bu alanı GitHub projelerin, hackathon deneyimlerin ve front-end hikâyeni anlatan içerikleri planlamak için
            kullan.
          </p>

          <div className="stats">
            <div className="stat">
              <div className="muted">Toplam taslak</div>
              <div className="statValue">{posts.length}</div>
            </div>
            <div className="stat">
              <div className="muted">Bugünkü mood</div>
              <div className="statValue green">Build & Create</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card listCard">
        <div className="listHead">
          <div className="h2">Blog taslakları</div>
          <div className="muted">En son eklenen en üstte.</div>
        </div>

        <div className="list">
          {sortedPosts.map((p) => (
            <div className="item" key={p.id}>
              <div className="itemText">
                <div className="itemTitle">{p.title}</div>
                {p.summary && <div className="itemSummary">{p.summary}</div>}
              </div>

              <div className="itemActions">
                <button className="btn outline" type="button" onClick={() => handleEdit(p)}>
                  Düzenle
                </button>
                <button className="btn danger" type="button" onClick={() => handleDelete(p.id)}>
                  Sil
                </button>
              </div>
            </div>
          ))}

          {sortedPosts.length === 0 && (
            <div className="empty">Henüz taslak yok. İlk taslağını yukarıdan oluştur. ✨</div>
          )}
        </div>
      </div>
    </div>
  );
}
