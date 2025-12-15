import React, { useEffect, useMemo, useState } from 'react';

type Category = {
  id: number;
  name: string;
  slug: string;
  color: string; // hex
  createdAt: number;
};

const CATS_KEY = 'ai-blog-dashboard-categories-v1';

const defaultCats: Category[] = [
  { id: 1, name: 'Front-end', slug: 'front-end', color: '#38bdf8', createdAt: Date.now() - 86400000 * 4 },
  { id: 2, name: 'AI', slug: 'ai', color: '#34d399', createdAt: Date.now() - 86400000 * 3 },
  { id: 3, name: 'Kariyer', slug: 'kariyer', color: '#a78bfa', createdAt: Date.now() - 86400000 * 2 },
];

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replaceAll('ç', 'c')
    .replaceAll('ğ', 'g')
    .replaceAll('ı', 'i')
    .replaceAll('ö', 'o')
    .replaceAll('ş', 's')
    .replaceAll('ü', 'u')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function CategoriesPage() {
  const [cats, setCats] = useState<Category[]>(() => {
    try {
      const raw = localStorage.getItem(CATS_KEY);
      if (!raw) return defaultCats;
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as Category[]) : defaultCats;
    } catch {
      return defaultCats;
    }
  });

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [color, setColor] = useState('#34d399');
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CATS_KEY, JSON.stringify(cats));
    } catch {}
  }, [cats]);

  useEffect(() => {
    if (editingId === null) setSlug(slugify(name));
  }, [name, editingId]);

  const sorted = useMemo(() => [...cats].sort((a, b) => b.createdAt - a.createdAt), [cats]);

  const reset = () => {
    setName('');
    setSlug('');
    setColor('#34d399');
    setEditingId(null);
  };

  const handleSave = () => {
    const n = name.trim();
    const s = slugify(slug || n);

    if (!n) return alert('Kategori adı boş olamaz 💙');
    if (!s) return alert('Slug boş olamaz 💙');

    const duplicateSlug = cats.some((c) => c.slug === s && c.id !== editingId);
    if (duplicateSlug) return alert('Bu slug zaten var. Lütfen farklı bir slug seç.');

    if (editingId === null) {
      setCats((prev) => [
        { id: Date.now(), name: n, slug: s, color, createdAt: Date.now() },
        ...prev,
      ]);
    } else {
      setCats((prev) => prev.map((c) => (c.id === editingId ? { ...c, name: n, slug: s, color } : c)));
    }

    reset();
  };

  const handleEdit = (c: Category) => {
    setEditingId(c.id);
    setName(c.name);
    setSlug(c.slug);
    setColor(c.color);
  };

  const handleDelete = (id: number) => {
    const ok = confirm('Bu kategoriyi silmek istiyor musun?');
    if (!ok) return;
    setCats((prev) => prev.filter((c) => c.id !== id));
    if (editingId === id) reset();
  };

  return (
    <div className="content">
      <div className="content-top">
        <div className="pill">Kategoriler</div>
        <div className="content-title">Yazılarını düzenli tut · etiketle · büyüt</div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-head">
            <div>
              <div className="h2">
                Kategori {editingId !== null ? 'düzenle' : 'ekle'}
                {editingId !== null && <span className="badge">Düzenleniyor</span>}
              </div>
              <div className="muted">Kategori yapısı blog panelini “CMS gibi” gösterir.</div>
            </div>
          </div>

          <div className="form">
            <div className="field">
              <label className="label">Kategori adı</label>
              <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Örn. UI/UX" />
            </div>

            <div className="field">
              <label className="label">Slug</label>
              <input className="input" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="örn. ui-ux" />
              <div className="mutedSmall">Slug URL uyumlu isimdir. Otomatik üretir ama istersen değiştirebilirsin.</div>
            </div>

            <div className="field">
              <label className="label">Renk</label>
              <div className="row" style={{ gap: 12, alignItems: 'center' }}>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  style={{ width: 44, height: 34, background: 'transparent', border: 'none' }}
                />
                <div className="chip" style={{ borderColor: color }}>
                  <span className="dot" style={{ background: color }} />
                  <span>{color.toUpperCase()}</span>
                </div>
              </div>
            </div>

            <div className="btn-row" style={{ justifyContent: 'flex-end' }}>
              {editingId !== null && (
                <button className="btn outline" type="button" onClick={reset}>
                  İptal
                </button>
              )}
              <button className="btn primary" type="button" onClick={handleSave}>
                {editingId === null ? 'Kategori ekle' : 'Kaydet'}
              </button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <div>
              <div className="h2">Genel görünüm</div>
              <div className="muted">Kategoriler daha sonra post’lara bağlanabilir.</div>
            </div>
          </div>

          <div className="stats">
            <div className="stat">
              <div className="muted">Toplam kategori</div>
              <div className="statValue">{cats.length}</div>
            </div>
            <div className="stat">
              <div className="muted">Öneri</div>
              <div className="statValue green">3–7 kategori ideal</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card listCard">
        <div className="listHead">
          <div className="h2">Kategoriler</div>
          <div className="muted">En son eklenen en üstte.</div>
        </div>

        <div className="list">
          {sorted.map((c) => (
            <div className="item" key={c.id}>
              <div className="itemText">
                <div className="itemTitle" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span className="dot" style={{ background: c.color }} />
                  {c.name}
                  <span className="pill" style={{ fontSize: 12, opacity: 0.85 }}>{c.slug}</span>
                </div>
                <div className="mutedSmall">Renk: {c.color.toUpperCase()}</div>
              </div>

              <div className="itemActions">
                <button className="btn outline" type="button" onClick={() => handleEdit(c)}>
                  Düzenle
                </button>
                <button className="btn danger" type="button" onClick={() => handleDelete(c.id)}>
                  Sil
                </button>
              </div>
            </div>
          ))}

          {sorted.length === 0 && <div className="empty">Henüz kategori yok. Yukarıdan ekleyebilirsin ✨</div>}
        </div>
      </div>
    </div>
  );
}
