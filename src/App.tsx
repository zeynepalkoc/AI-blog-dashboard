import React, { useEffect, useMemo, useState } from 'react';
import PostsPage from './pages/PostsPage';
import CategoriesPage from './pages/CategoriesPage';
import SettingsPage from './pages/SettingsPage';
import './App.css';

type PageKey = 'posts' | 'categories' | 'settings';

const SETTINGS_KEY = 'ai-blog-dashboard-settings-v1';

type Settings = {
  theme: 'dark' | 'light';
  displayName: string;
  focusText: string;
};

const defaultSettings: Settings = {
  theme: 'dark',
  displayName: 'Zeynep',
  focusText: 'Bugünkü odak: portfolyo & içerik.',
};

export default function App() {
  const [page, setPage] = useState<PageKey>('posts');
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (!raw) return defaultSettings;
      const parsed = JSON.parse(raw);
      return { ...defaultSettings, ...parsed };
    } catch {
      return defaultSettings;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch {}
  }, [settings]);

  useEffect(() => {
    // Theme apply
    document.documentElement.setAttribute('data-theme', settings.theme);
  }, [settings.theme]);

  const pageTitle = useMemo(() => {
    if (page === 'posts') return 'Blog Yazıları';
    if (page === 'categories') return 'Kategoriler';
    return 'Ayarlar';
  }, [page]);

  const quickToggleTheme = () => {
    setSettings((prev) => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' }));
  };

  return (
    <div className="appShell">
      <aside className="sidebar">
        <div className="brand">
          <div className="avatar">{(settings.displayName?.[0] || 'Z').toUpperCase()}</div>
          <div className="brandText">
            <div className="brandTitle">AI Blog Dashboard</div>
            <div className="brandSub">Front-end · İçerik · AI</div>
          </div>
        </div>

        <nav className="nav">
          <button
            className={`navItem ${page === 'posts' ? 'active' : ''}`}
            onClick={() => setPage('posts')}
            type="button"
          >
            📝 <span>Blog Yazıları</span>
          </button>

          <button
            className={`navItem ${page === 'categories' ? 'active' : ''}`}
            onClick={() => setPage('categories')}
            type="button"
          >
            🗂️ <span>Kategoriler</span>
          </button>

          <button
            className={`navItem ${page === 'settings' ? 'active' : ''}`}
            onClick={() => setPage('settings')}
            type="button"
          >
            ⚙️ <span>Ayarlar</span>
          </button>
        </nav>

        <div className="sidebarFooter">
          <div className="mutedSmall">Oturum: {settings.displayName || 'Kullanıcı'}</div>
          <div className="mutedSmall">{settings.focusText}</div>
        </div>
      </aside>

      <main className="main">
        <div className="topbar">
          <div className="topbarLeft">
            <div className="pill">İçerik paneli</div>
            <div className="topbarTitle">Bloglarını yönet · taslak oluştur · portfolyona taşı</div>
          </div>

          <div className="topbarRight">
            <div className="kbdHint">Ctrl + K · Bloglarda ara…</div>
            <button className="btn ghost" type="button" onClick={quickToggleTheme}>
              {settings.theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>
        </div>

        {page === 'posts' && <PostsPage />}
        {page === 'categories' && <CategoriesPage />}
        {page === 'settings' && <SettingsPage settings={settings} setSettings={setSettings} />}
      </main>

      <div className="bgGlow" />
    </div>
  );
}
