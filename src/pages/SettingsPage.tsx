import React, { useEffect, useState } from 'react';

type Settings = {
  theme: 'dark' | 'light';
  displayName: string;
  focusText: string;
};

export default function SettingsPage({
  settings,
  setSettings,
}: {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}) {
  const [localName, setLocalName] = useState(settings.displayName);
  const [localFocus, setLocalFocus] = useState(settings.focusText);

  useEffect(() => {
    setLocalName(settings.displayName);
    setLocalFocus(settings.focusText);
  }, [settings.displayName, settings.focusText]);

  const save = () => {
    setSettings((prev) => ({
      ...prev,
      displayName: localName.trim() || 'Kullanıcı',
      focusText: localFocus.trim() || 'Bugünkü odak: portfolyo & içerik.',
    }));
  };

  const reset = () => {
    setLocalName('Zeynep');
    setLocalFocus('Bugünkü odak: portfolyo & içerik.');
    setSettings((prev) => ({
      ...prev,
      theme: 'dark',
      displayName: 'Zeynep',
      focusText: 'Bugünkü odak: portfolyo & içerik.',
    }));
  };

  return (
    <div className="content">
      <div className="content-top">
        <div className="pill">Ayarlar</div>
        <div className="content-title">Tema · Profil · Panel davranışı</div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-head">
            <div>
              <div className="h2">Görünüm</div>
              <div className="muted">Tema seçimi ve kişisel dokunuşlar.</div>
            </div>
          </div>

          <div className="form">
            <div className="field">
              <label className="label">Tema</label>
              <div className="btn-row" style={{ justifyContent: 'flex-start' }}>
                <button
                  type="button"
                  className={`btn outline ${settings.theme === 'dark' ? 'isOn' : ''}`}
                  onClick={() => setSettings((p) => ({ ...p, theme: 'dark' }))}
                >
                  🌙 Dark
                </button>
                <button
                  type="button"
                  className={`btn outline ${settings.theme === 'light' ? 'isOn' : ''}`}
                  onClick={() => setSettings((p) => ({ ...p, theme: 'light' }))}
                >
                  ☀️ Light
                </button>
              </div>
            </div>

            <div className="field">
              <label className="label">Görünen ad</label>
              <input className="input" value={localName} onChange={(e) => setLocalName(e.target.value)} />
            </div>

            <div className="field">
              <label className="label">Footer odak metni</label>
              <input className="input" value={localFocus} onChange={(e) => setLocalFocus(e.target.value)} />
              <div className="mutedSmall">Sol altta görünen kısa motivasyon/odak satırı.</div>
            </div>

            <div className="btn-row" style={{ justifyContent: 'flex-end' }}>
              <button className="btn outline" type="button" onClick={reset}>
                Varsayılan
              </button>
              <button className="btn primary" type="button" onClick={save}>
                Kaydet
              </button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <div>
              <div className="h2">Notlar</div>
              <div className="muted">GitHub demo için küçük açıklamalar.</div>
            </div>
          </div>

          <div className="muted" style={{ marginTop: 8, lineHeight: 1.6 }}>
            Bu proje localStorage kullanır. Böylece demo sırasında veri kaydetme, kategori ekleme ve taslak yönetimi
            sorunsuz çalışır. AI entegrasyonu opsiyoneldir; quota yoksa “demo mode” içerik üretimi devreye girer.
          </div>

          <div className="stats" style={{ marginTop: 14 }}>
            <div className="stat">
              <div className="muted">Depolama</div>
              <div className="statValue">localStorage</div>
            </div>
            <div className="stat">
              <div className="muted">Tema</div>
              <div className="statValue green">{settings.theme === 'dark' ? 'Dark' : 'Light'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
