import React from 'react';

type SidebarProps = {
  active: 'posts' | 'categories' | 'settings';
  onChange: (tab: SidebarProps['active']) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ active, onChange }) => {
  const items: { key: SidebarProps['active']; label: string; icon: string }[] = [
    { key: 'posts', label: 'Blog Yazıları', icon: '📝' },
    { key: 'categories', label: 'Kategoriler', icon: '📂' },
    { key: 'settings', label: 'Ayarlar', icon: '⚙️' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-avatar">Z</div>
        <div>
          <div className="sidebar-title">AI Blog Dashboard</div>
          <div className="sidebar-subtitle">Front-end · İçerik · AI</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {items.map((item) => (
          <button
            key={item.key}
            onClick={() => onChange(item.key)}
            className={`sidebar-item ${active === item.key ? 'is-active' : ''}`}
          >
            <span className="sidebar-item-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div>Oturum: <strong>Zeynep</strong></div>
        <div style={{ marginTop: 4 }}>Bugünkü odak: portfolyo & içerik.</div>
      </div>
    </aside>
  );
};

export default Sidebar;
