import React from 'react';

type TopbarProps = {
  darkMode: boolean;
  onToggleDarkMode: () => void;
};

const Topbar: React.FC<TopbarProps> = ({ darkMode, onToggleDarkMode }) => {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="topbar-pill-row">
          <span className="topbar-pill">İçerik paneli</span>
          <span className="topbar-text-muted">
            Front-end odaklı blog taslakları
          </span>
        </div>
        <div className="topbar-title">
          Bloglarını yönet · taslak oluştur · portfolyona taşı
        </div>
      </div>

      <div className="topbar-actions">
        <div className="topbar-search">
          <span>Ctrl + K</span>
          <span style={{ width: 1, height: 12, background: '#4b5563' }} />
          <span>Bloglarda ara…</span>
        </div>
        <button className="topbar-theme-btn" onClick={onToggleDarkMode}>
          {darkMode ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </header>
  );
};

export default Topbar;
