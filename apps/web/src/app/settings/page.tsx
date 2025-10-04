'use client';

import { useState, useEffect } from 'react';

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [logoUrl, setLogoUrl] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#20e28f');
  const [fontFamily, setFontFamily] = useState('Plus Jakarta Sans');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/settings');
        if (res.ok) {
          const data = await res.json();
          setLogoUrl(data.logoUrl || '');
          setPrimaryColor(data.primaryColor || '#20e28f');
          setFontFamily(data.fontFamily || 'Plus Jakarta Sans');
        }
      } catch (e) {
        console.error('Failed to load settings', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleFile = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('logo', file);
    try {
      const res = await fetch('/api/settings/logo', { method: 'POST', body: fd });
      const data = await res.json();
      if (data?.url) {
        setLogoUrl(data.url);
      }
    } catch (err) {
      console.error('Upload failed', err);
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logoUrl, primaryColor, fontFamily }),
      });
      alert('Settings saved');
    } catch (err) {
      console.error('Save failed', err);
      alert('Failed to save settings');
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Brand Settings</h1>

      <label className="block mb-2">Logo</label>
      {logoUrl ? <img src={logoUrl} alt="logo" className="h-12 mb-2" /> : <div className="h-12 mb-2 text-sm text-muted-foreground">No logo</div>}
      <input type="file" accept="image/*" onChange={handleFile} />
      {uploading && <div className="text-sm mt-2">Uploading...</div>}

      <div className="mt-4">
        <label className="block mb-2">Primary Color</label>
        <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
      </div>

      <div className="mt-4">
        <label className="block mb-2">Font Family</label>
        <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
          <option>Plus Jakarta Sans</option>
          <option>Inter</option>
          <option>Roboto</option>
          <option>Helvetica</option>
        </select>
      </div>

      <div className="mt-6">
        <button onClick={save} className="px-4 py-2 bg-primary text-white rounded">Save</button>
      </div>
    </div>
  );
}
