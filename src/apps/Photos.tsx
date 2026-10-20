import { useState } from 'react';
import { usePhone, Src } from '../phone/PhoneContext';
import { Glyph } from '../phone/icons';

export function Photos() {
  const { figure } = usePhone();
  const [open, setOpen] = useState<number | null>(null);
  const photos = figure.photos;

  return (
    <div className="screen-fill" style={{ background: '#fff', display: 'flex', flexDirection: 'column' }}>
      <div className="status-spacer" />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '6px 16px 10px' }}>
        <span style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 34, fontWeight: 700 }}>圖庫</span>
          <span style={{ fontSize: 15, color: 'var(--ios-secondary)' }}>
            {photos.length} 張照片 · {figure.photosRange}
          </span>
        </span>
        <span style={{ height: 30, padding: '0 12px', borderRadius: 15, background: 'var(--ios-fill)', color: 'var(--ios-blue)', fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', marginBottom: 6 }}>選取</span>
      </div>
      <div className="scroll" style={{ flex: 1, paddingBottom: 120 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 2 }}>
          {photos.map((p, i) => (
            <button key={i} aria-label={p.title} onClick={() => setOpen(i)} style={{ aspectRatio: '1 / 1', border: 0, padding: 0, background: p.bg, color: p.fg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'var(--font-glyph)', fontWeight: 900, fontSize: 58, lineHeight: 1 }}>{p.glyph}</span>
            </button>
          ))}
        </div>
        <div style={{ padding: '18px 16px 0', textAlign: 'center', fontSize: 13, lineHeight: 1.6, color: 'var(--ios-secondary)', whiteSpace: 'pre-line' }}>{figure.photosFootnote}</div>
      </div>

      <div className="glass" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: 44, height: 38, borderRadius: 19, background: 'rgba(240,240,242,0.88)', display: 'flex', alignItems: 'center', padding: 3, gap: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.12)' }}>
        <span style={{ padding: '0 16px', fontSize: 14, fontWeight: 600 }}>年</span>
        <span style={{ padding: '0 16px', fontSize: 14, fontWeight: 600 }}>月</span>
        <span style={{ height: 32, padding: '0 16px', borderRadius: 16, background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 600 }}>所有照片</span>
      </div>

      {open !== null && <PhotoViewer index={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

function PhotoViewer({ index, onClose }: { index: number; onClose: () => void }) {
  const { figure } = usePhone();
  const p = figure.photos[index];
  const rows: [string, string][] = [
    ['裝置', '無（當時尚無相機）'],
    ['地點', p.place],
    ['日期', p.date],
  ];
  return (
    <div className="screen-fill zoom-in" style={{ background: '#fff', display: 'flex', flexDirection: 'column', zIndex: 5 }}>
      <div className="status-spacer" />
      <div style={{ height: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 6px' }}>
        <button className="nav-btn" aria-label="返回圖庫" onClick={onClose} style={{ minWidth: 44, justifyContent: 'center' }}>{Glyph.chevronLeft()}</button>
        <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: 15, fontWeight: 600 }}>{p.place}</span>
          <span style={{ fontSize: 12, color: 'var(--ios-secondary)' }}>{p.date}</span>
        </span>
        <span style={{ padding: '0 12px', fontSize: 17, color: 'var(--ios-blue)' }}>編輯</span>
      </div>
      <div className="scroll" style={{ flex: 1, paddingBottom: 96 }}>
        <div style={{ width: 393, height: 393, background: p.bg, color: p.fg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'var(--font-glyph)', fontWeight: 900, fontSize: 200, lineHeight: 1 }}>{p.glyph}</span>
        </div>
        <div style={{ padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{p.title}</div>
          <div style={{ fontSize: 16, lineHeight: 1.6, color: '#1C1C1E' }}>{p.desc}</div>
          <div style={{ borderRadius: 12, background: 'var(--ios-bg-grouped)', overflow: 'hidden' }}>
            {rows.map(([k, v], i) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 14px', fontSize: 15, borderBottom: i < rows.length - 1 ? '0.5px solid var(--ios-separator-light)' : 0 }}>
                <span style={{ color: 'var(--ios-secondary)' }}>{k}</span><span>{v}</span>
              </div>
            ))}
          </div>
          <Src text={p.src} style={{ fontSize: 12 }} />
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 34, height: 50, display: 'flex', justifyContent: 'space-around', alignItems: 'center', background: 'rgba(255,255,255,0.96)', borderTop: '0.5px solid var(--ios-separator-light)' }}>
        <svg width="22" height="26" viewBox="0 0 22 26" fill="none" stroke="var(--ios-blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label="分享"><path d="M11 2v14" /><path d="M6 7l5-5 5 5" /><path d="M6 11H3v13h16V11h-3" /></svg>
        <svg width="24" height="22" viewBox="0 0 24 22" fill="none" stroke="var(--ios-blue)" strokeWidth="1.8" strokeLinejoin="round" role="img" aria-label="喜好項目"><path d="M12 20S2 13.5 2 7.5A5 5 0 0 1 12 5a5 5 0 0 1 10 2.5C22 13.5 12 20 12 20z" /></svg>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ios-blue)" strokeWidth="1.8" strokeLinecap="round" role="img" aria-label="資訊"><circle cx="12" cy="12" r="10" /><path d="M12 11v6" /><path d="M12 7.5v.01" /></svg>
        <svg width="22" height="24" viewBox="0 0 22 24" fill="none" stroke="var(--ios-blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label="刪除"><path d="M2 5h18" /><path d="M8 5V2h6v3" /><path d="M4 5l1 17h12l1-17" /></svg>
      </div>
    </div>
  );
}
