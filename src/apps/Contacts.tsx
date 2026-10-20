import { useState, type ReactNode } from 'react';
import { usePhone, type Screen } from '../phone/PhoneContext';
import { Glyph } from '../phone/icons';
import { GlossButtons, GlossPage, hasNotes } from '../phone/Gloss';
import type { Contact } from '../types';

const avatarBg = 'linear-gradient(#A6ABB6, #858B97)';

export function ContactsList() {
  const { figure, go } = usePhone();
  const groups = [...new Set(figure.contacts.map((c) => c.group))];
  const open = (c: Contact) => go({ name: 'contact', contactId: c.id });

  return (
    <div className="screen-fill" style={{ background: '#fff', display: 'flex', flexDirection: 'column' }}>
      <div className="status-spacer" />
      <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
        <button className="nav-btn" onClick={() => go({ name: 'home' })}>{Glyph.chevronLeft()}列表</button>
        <span role="img" aria-label="新增聯絡人" style={{ padding: '0 12px' }}>{Glyph.plus('var(--ios-blue)', 20)}</span>
      </div>
      <h1 className="large-title">通訊錄</h1>
      <div className="search-field">{Glyph.search()}搜尋</div>
      <div className="scroll" style={{ flex: 1, paddingBottom: 34 }}>
        <button className="plain-btn" onClick={() => open(figure.me)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '8px 20px 14px', borderBottom: '0.5px solid var(--ios-separator)' }}>
          <Avatar text={figure.me.avatar} size={60} />
          <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 20, fontWeight: 600 }}>{figure.me.name}</span>
            <span style={{ fontSize: 13, color: 'var(--ios-secondary)' }}>我的名片</span>
          </span>
        </button>
        {groups.map((g) => (
          <div key={g}>
            <div style={{ padding: '14px 20px 4px', fontSize: 15, fontWeight: 600, color: 'var(--ios-secondary)' }}>{g}</div>
            {figure.contacts.filter((c) => c.group === g).map((c) => (
              <button key={c.id} className="plain-btn" onClick={() => open(c)} style={{ width: '100%', display: 'flex', alignItems: 'baseline', gap: 8, margin: '0 0 0 20px', padding: '11px 20px 11px 0', borderBottom: '0.5px solid var(--ios-separator-light)' }}>
                <span style={{ fontSize: 17, fontWeight: 600 }}>{c.name}</span>
                <span style={{ fontSize: 15, color: 'var(--ios-secondary)' }}>{c.status ?? ''}</span>
              </button>
            ))}
          </div>
        ))}
        <div style={{ padding: '18px 0', textAlign: 'center', fontSize: 15, color: 'var(--ios-secondary)' }}>{figure.contacts.length} 位聯絡人</div>
      </div>
    </div>
  );
}

export function ContactCard({ contactId, back }: { contactId: string; back?: Screen }) {
  const { figure, go } = usePhone();
  const c = contactId === figure.me.id ? figure.me : figure.contacts.find((x) => x.id === contactId) ?? figure.contacts[0];
  const [glossOpen, setGlossOpen] = useState(false);
  const thread = c.threadId ? figure.threads.find((t) => t.id === c.threadId) : undefined;
  const backTo = back ?? { name: 'contacts' };
  const backLabel = backTo.name === 'thread' ? '' : '通訊錄';
  const blocked = c.status === '已封鎖';

  return (
    <div className="screen-fill" style={{ background: 'var(--ios-bg-grouped)', display: 'flex', flexDirection: 'column' }}>
      <div className="status-spacer" />
      <div style={{ height: 44, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
        <button className="nav-btn" onClick={() => go(backTo)}>{Glyph.chevronLeft()}{backLabel}</button>
        {hasNotes(c) ? <GlossButtons canPlain={false} onNotes={() => setGlossOpen(true)} /> : <span style={{ padding: '0 12px', fontSize: 17, color: 'var(--ios-blue)' }}>編輯</span>}
      </div>
      <div className="scroll" style={{ flex: 1, padding: '0 16px 60px', display: 'flex', flexDirection: 'column', gap: 14 }} data-noshrink>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '4px 0 2px' }}>
          <Avatar text={c.avatar} size={96} />
          <div style={{ fontSize: 28, fontWeight: 700, marginTop: 4 }}>{c.name}</div>
          <div style={{ fontSize: 15, color: 'var(--ios-secondary)', textAlign: 'center' }}>{c.subtitle}</div>
          {c.status && <div style={{ fontSize: 13, fontWeight: 600, color: blocked ? 'var(--ios-red)' : 'var(--ios-secondary)' }}>{c.status}</div>}
        </div>

        {c.id !== figure.me.id && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            <Action label="訊息" glyph={<MsgGlyph />} onClick={thread && !blocked ? () => go({ name: 'thread', threadId: thread.id }) : undefined} />
            <Action label="通話" glyph={<PhoneGlyph />} />
            <Action label="視訊" glyph={<VideoGlyph />} />
            <Action label="驛遞" glyph={<MailGlyph />} />
          </div>
        )}

        <Group>
          {c.fields.map((f, i) => (
            <div key={f.label} style={{ padding: '10px 16px', borderBottom: i < c.fields.length - 1 ? '0.5px solid var(--ios-separator-light)' : 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 13 }}>{f.label}</span>
              <span style={{ fontSize: 17, lineHeight: 1.35, color: f.tone === 'link' ? 'var(--ios-blue)' : f.tone === 'danger' ? 'var(--ios-red)' : f.tone === 'muted' ? 'var(--ios-secondary)' : '#000' }}>{f.value}</span>
            </div>
          ))}
        </Group>

        {c.memo && (
          <Group>
            <div style={{ padding: '10px 16px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 13 }}>備註</span>
              <span style={{ fontSize: 17, lineHeight: 1.5, whiteSpace: 'pre-line' }}>{c.memo}</span>
            </div>
          </Group>
        )}

        {c.id !== figure.me.id && (
          <Group>
            <div style={{ padding: '11px 16px', fontSize: 17, color: blocked ? 'var(--ios-blue)' : 'var(--ios-red)' }}>{blocked ? '解除封鎖此聯絡人' : '封鎖此聯絡人'}</div>
          </Group>
        )}
      </div>

      {glossOpen && <GlossPage title={c.name} entries={[{ ...c, original: c.memo ?? c.subtitle }]} onClose={() => setGlossOpen(false)} />}
    </div>
  );
}

function Group({ children }: { children: ReactNode }) {
  return <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden' }}>{children}</div>;
}

function Action({ label, glyph, onClick }: { label: string; glyph: ReactNode; onClick?: () => void }) {
  const style = { height: 58, borderRadius: 12, background: '#fff', border: 0, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', gap: 4, fontSize: 12, color: onClick ? 'var(--ios-blue)' : 'var(--ios-tertiary)' };
  const inner = <>{glyph}{label}</>;
  if (!onClick) return <span style={style}>{inner}</span>;
  return <button onClick={onClick} style={style}>{inner}</button>;
}

const svg = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true } as const;
const MsgGlyph = () => <svg {...svg}><path d="M12 3C6.5 3 2 6.6 2 11c0 2.5 1.4 4.7 3.7 6.1L4.8 21l4.5-2.4c.9.2 1.8.3 2.7.3 5.5 0 10-3.6 10-8S17.5 3 12 3z" /></svg>;
const PhoneGlyph = () => <svg {...svg}><path d="M6.6 3h2.6l1.9 4.7-2.3 1.5a11 11 0 0 0 6 6l1.5-2.3L21 14.8v2.6A2.6 2.6 0 0 1 18.4 20 15.4 15.4 0 0 1 4 5.6 2.6 2.6 0 0 1 6.6 3z" /></svg>;
const VideoGlyph = () => <svg {...svg}><rect x="2" y="6" width="14" height="12" rx="3" /><path d="M17 10l5-3v10l-5-3z" /></svg>;
const MailGlyph = () => <svg {...svg}><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm0 2.2V18h18V7.2l-9 6z" /></svg>;

export function Avatar({ text, size }: { text: string; size: number }) {
  return (
    <span style={{ flex: 'none', width: size, height: size, borderRadius: size / 2, background: avatarBg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.43, fontWeight: 500 }}>
      {text}
    </span>
  );
}
