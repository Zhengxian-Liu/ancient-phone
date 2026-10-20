import { useState } from 'react';
import { usePhone } from '../phone/PhoneContext';
import { GlossButtons, GlossPage, hasNotes, usePlain } from '../phone/Gloss';
import { Glyph } from '../phone/icons';

export function Notes() {
  const { figure, go } = usePhone();
  const [open, setOpen] = useState<number | null>(null);
  const [glossOpen, setGlossOpen] = useState(false);
  const notes = figure.notes;
  const note = open !== null ? notes[open] : undefined;

  return (
    <div className="screen-fill" style={{ background: 'var(--ios-bg-grouped)', display: 'flex', flexDirection: 'column' }}>
      <div className="status-spacer" />
      <div style={{ height: 44, display: 'flex', alignItems: 'center', padding: '0 4px' }}>
        <button className="nav-btn" style={{ color: 'var(--notes-accent)' }} onClick={() => go({ name: 'home' })}>{Glyph.chevronLeft('var(--notes-accent)')}檔案夾</button>
      </div>
      <h1 className="large-title" style={{ paddingBottom: 10 }}>備忘錄</h1>
      <div className="search-field" style={{ background: '#E3E3E8', marginBottom: 14 }}>{Glyph.search()}搜尋</div>
      <div style={{ padding: '0 20px 6px', fontSize: 20, fontWeight: 700 }}>今天</div>
      <div style={{ margin: '0 16px', background: '#fff', borderRadius: 12, overflow: 'hidden' }}>
        {notes.map((n, i) => (
          <button key={n.title} className="plain-btn" onClick={() => setOpen(i)} style={{ width: '100%', borderBottom: i < notes.length - 1 ? '0.5px solid var(--ios-separator-light)' : 0, padding: '11px 16px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 17, fontWeight: 600 }}>{n.title}</span>
            <span style={{ fontSize: 15, color: 'var(--ios-secondary)' }}>{n.preview}</span>
          </button>
        ))}
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ height: 84, display: 'flex', justifyContent: 'center', paddingTop: 12, position: 'relative', fontSize: 12, color: '#3C3C43' }}>
        {notes.length} 則備忘錄
        <span role="img" aria-label="新增備忘錄" style={{ position: 'absolute', right: 20, top: 8 }}>{Glyph.compose('var(--notes-accent)')}</span>
      </div>

      {note && (
        <div className="screen-fill push-in" style={{ background: '#fff', display: 'flex', flexDirection: 'column', zIndex: 5 }}>
          <div className="status-spacer" />
          <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
            <button className="nav-btn" style={{ color: 'var(--notes-accent)' }} onClick={() => setOpen(null)}>{Glyph.chevronLeft('var(--notes-accent)')}備忘錄</button>
            {note.plain || hasNotes(note) ? (
              <GlossButtons color="var(--notes-accent)" canPlain={!!note.plain} onNotes={hasNotes(note) ? () => setGlossOpen(true) : undefined} />
            ) : (
              <span style={{ padding: '0 12px', color: 'var(--notes-accent)', fontSize: 17, fontWeight: 600 }}>完成</span>
            )}
          </div>
          <NoteBody index={open!} />
          {glossOpen && <GlossPage title={note.title} entries={[{ ...note, original: note.body ?? '' }]} onClose={() => setGlossOpen(false)} />}
        </div>
      )}
    </div>
  );
}

function NoteBody({ index }: { index: number }) {
  const { figure } = usePhone();
  const n = figure.notes[index];
  const show = usePlain();
  return (
    <div className="scroll" style={{ padding: '4px 20px 40px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--ios-secondary)' }}>{n.header}</div>
      <div style={{ fontSize: 28, fontWeight: 700 }}>{n.title}</div>
      {n.checklist && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 17, lineHeight: 1.4 }}>
          {n.checklist.map((c) => (
            <span key={c.text} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', color: c.done ? 'var(--ios-tertiary)' : '#000' }}>
              {c.done ? Glyph.check('#E5A50A') : <span style={{ flex: 'none', width: 22, height: 22, borderRadius: 11, border: '1.5px solid #C7C7CC' }} />}
              {c.text}
            </span>
          ))}
        </div>
      )}
      {n.body && <div style={{ fontSize: 17, lineHeight: 1.9, whiteSpace: 'pre-line' }}>{show(n.body, n)}</div>}
    </div>
  );
}
