import type { Gloss } from '../types';

export interface GlossEntry extends Gloss {
  original: string;
  /** Who said or wrote it, shown above the original. */
  who?: string;
}

export function hasGloss(g: Gloss) {
  return !!(g.src || g.plain || g.notes?.length);
}

/** Nav-bar text button that opens the 白話註釋 page. */
export function GlossButton({ onClick, color = 'var(--ios-blue)' }: { onClick: () => void; color?: string }) {
  return (
    <button className="nav-btn" onClick={onClick} style={{ padding: '0 12px', color, fontSize: 17 }}>
      白話註釋
    </button>
  );
}

/** Full-screen page listing every original text on a screen with its 白話, 註釋 and 出處. */
export function GlossPage({ title, entries, onClose }: { title: string; entries: GlossEntry[]; onClose: () => void }) {
  return (
    <div className="screen-fill push-in" style={{ background: 'var(--ios-bg-grouped)', display: 'flex', flexDirection: 'column', zIndex: 10 }}>
      <div className="status-spacer" />
      <div style={{ height: 44, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 4px' }}>
        <button className="nav-btn" onClick={onClose} style={{ padding: '0 12px', fontWeight: 600 }}>完成</button>
      </div>
      <h1 className="large-title" style={{ paddingBottom: 2 }}>白話註釋</h1>
      <div style={{ padding: '0 20px 12px', fontSize: 15, color: 'var(--ios-secondary)' }}>{title}</div>
      <div className="scroll" style={{ flex: 1, padding: '0 16px 60px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {entries.map((e, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 12, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {e.who && <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ios-secondary)' }}>{e.who}</div>}
            <div style={{ fontSize: 17, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{e.original}</div>
            {e.plain && (
              <Section label="白話">
                <div style={{ fontSize: 16, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{e.plain}</div>
              </Section>
            )}
            {!!e.notes?.length && (
              <Section label="註釋">
                <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 4, fontSize: 15, lineHeight: 1.55 }}>
                  {e.notes.map((n) => <li key={n}>{n}</li>)}
                </ul>
              </Section>
            )}
            {e.src && <div style={{ fontSize: 12, color: 'var(--ios-secondary)' }}>出處：{e.src}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ borderTop: '0.5px solid var(--ios-separator-light)', paddingTop: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ios-secondary)' }}>{label}</div>
      {children}
    </div>
  );
}
