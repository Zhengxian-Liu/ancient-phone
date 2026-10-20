import type { Gloss } from '../types';
import { usePhone } from './PhoneContext';

export interface GlossEntry extends Gloss {
  original: string;
  /** Who said or wrote it, shown above the original. */
  who?: string;
}

/** Has something for the 註釋 page: a source or annotations. */
export function hasNotes(g: Gloss) {
  return !!(g.src || g.notes?.length);
}

/** The text to show for an item: its 白話 when 白話 mode is on, else the original. */
export function usePlain() {
  const { plain } = usePhone();
  return (original: string, g: Gloss) => (plain && g.plain ? g.plain : original);
}

/**
 * Nav-bar buttons: 白話/原文 swaps every text on screen in place;
 * 註釋 opens the annotation page.
 */
export function GlossButtons({ canPlain, onNotes, color = 'var(--ios-blue)' }: { canPlain: boolean; onNotes?: () => void; color?: string }) {
  const { plain, setPlain } = usePhone();
  const btn = { padding: '0 7px', color, fontSize: 17 };
  return (
    <span style={{ display: 'flex', alignItems: 'center' }}>
      {canPlain && (
        <button className="nav-btn" aria-pressed={plain} onClick={() => setPlain(!plain)} style={btn}>
          {plain ? '原文' : '白話'}
        </button>
      )}
      {onNotes && <button className="nav-btn" onClick={onNotes} style={btn}>註釋</button>}
    </span>
  );
}

/** Full-screen page listing every original text on a screen with its 註釋 and 出處. */
export function GlossPage({ title, entries, onClose }: { title: string; entries: GlossEntry[]; onClose: () => void }) {
  return (
    <div className="screen-fill push-in" style={{ background: 'var(--ios-bg-grouped)', display: 'flex', flexDirection: 'column', zIndex: 10 }}>
      <div className="status-spacer" />
      <div style={{ height: 44, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 4px' }}>
        <button className="nav-btn" onClick={onClose} style={{ padding: '0 12px', fontWeight: 600 }}>完成</button>
      </div>
      <h1 className="large-title" style={{ paddingBottom: 2 }}>註釋</h1>
      <div style={{ padding: '0 20px 12px', fontSize: 15, color: 'var(--ios-secondary)' }}>{title}</div>
      <div className="scroll" style={{ flex: 1, padding: '0 16px 60px', display: 'flex', flexDirection: 'column', gap: 12 }} data-noshrink>
        {entries.map((e, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 12, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {e.who && <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ios-secondary)' }}>{e.who}</div>}
            <div style={{ fontSize: 17, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{e.original}</div>
            {!!e.notes?.length && (
              <ul style={{ margin: 0, padding: '10px 0 0 18px', borderTop: '0.5px solid var(--ios-separator-light)', display: 'flex', flexDirection: 'column', gap: 4, fontSize: 15, lineHeight: 1.55 }}>
                {e.notes.map((n) => <li key={n}>{n}</li>)}
              </ul>
            )}
            {e.src && <div style={{ fontSize: 12, color: 'var(--ios-secondary)' }}>出處：{e.src}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
