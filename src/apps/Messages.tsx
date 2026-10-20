import { useLayoutEffect, useRef } from 'react';
import { usePhone, Src } from '../phone/PhoneContext';
import { Glyph } from '../phone/icons';
import type { Message } from '../types';

const avatarBg = 'linear-gradient(#A6ABB6, #858B97)';

export function MessagesList() {
  const { figure, go, readThreads, showSources } = usePhone();
  return (
    <div className="screen-fill" style={{ background: '#fff', display: 'flex', flexDirection: 'column' }}>
      <div className="status-spacer" />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 8px 0 4px', height: 44 }}>
        <button className="nav-btn" onClick={() => go({ name: 'home' })}>編輯</button>
        <span role="img" aria-label="新訊息" style={{ padding: '0 12px' }}>{Glyph.compose()}</span>
      </div>
      <h1 className="large-title">訊息</h1>
      <div className="search-field">{Glyph.search()}搜尋</div>
      <div className="scroll" style={{ flex: 1, paddingBottom: 34 }}>
        {figure.threads.map((t) => {
          const last = [...t.messages].reverse().find((m) => m.kind !== 'system');
          const unread = t.unread && !readThreads.has(t.id);
          return (
            <button key={t.id} className="plain-btn" onClick={() => go({ name: 'thread', threadId: t.id })} style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <span style={{ flex: 'none', width: 20, display: 'flex', justifyContent: 'center' }}>
                {unread && <span aria-label="未讀" style={{ width: 10, height: 10, borderRadius: 5, background: 'var(--ios-blue)' }} />}
              </span>
              <Avatar text={t.avatar} size={52} />
              <span style={{ flex: 1, minWidth: 0, marginLeft: 12, padding: '11px 16px 11px 0', borderBottom: '0.5px solid var(--ios-separator)', display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontWeight: 600, fontSize: 17 }}>{t.name}</span>
                  <span style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 6, fontSize: 15, color: 'var(--ios-secondary)' }}>{t.when}{Glyph.chevronRight()}</span>
                </span>
                <span style={{ fontSize: 15, lineHeight: 1.35, color: 'var(--ios-secondary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {last ? last.text.replace(/\n/g, ' ') : ''}
                </span>
              </span>
            </button>
          );
        })}
        {showSources && (
          <div style={{ padding: '16px 20px', fontSize: 12, lineHeight: 1.6, color: 'var(--ios-secondary)' }}>
            對話中標「原文」者引自原始詩文；標「轉譯」者依史料改寫成白話訊息。
          </div>
        )}
      </div>
    </div>
  );
}

export function MessageThread({ threadId }: { threadId: string }) {
  const { figure, go } = usePhone();
  const thread = figure.threads.find((t) => t.id === threadId) ?? figure.threads[0];
  const msgs = thread.messages;
  const lastIsOut = msgs[msgs.length - 1]?.kind === 'out';
  // Like iMessage, open a conversation scrolled to the newest message.
  const scroller = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [threadId]);

  return (
    <div className="screen-fill" style={{ background: '#fff' }}>
      <div ref={scroller} className="scroll" style={{ position: 'absolute', inset: 0, padding: '134px 16px 104px', display: 'flex', flexDirection: 'column' }}>
        {msgs.map((m, i) => (
          <Bubble key={i} m={m} prev={msgs[i - 1]} next={msgs[i + 1]} showRead={lastIsOut && i === msgs.length - 1} />
        ))}
      </div>

      {/* Nav bar */}
      <div className="glass" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 122, background: 'rgba(249,249,249,0.92)', borderBottom: '0.5px solid var(--ios-separator-light)' }}>
        <button className="nav-btn" aria-label="返回訊息" onClick={() => go({ name: 'messages' })} style={{ position: 'absolute', left: 4, top: 58, minWidth: 44 }}>
          {Glyph.chevronLeft()}
        </button>
        <div style={{ position: 'absolute', left: 64, right: 64, top: 52, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <Avatar text={thread.avatar} size={50} />
          <span style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 11 }}>{thread.name}</span>
        </div>
        <span role="img" aria-label="視訊通話" style={{ position: 'absolute', right: 16, top: 68 }}>
          <svg width="28" height="20" viewBox="0 0 28 20" fill="none" stroke="var(--ios-blue)" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true"><rect x="1" y="3" width="18" height="14" rx="3.5" /><path d="M19 8l7-4v12l-7-4z" /></svg>
        </span>
      </div>

      {/* Input bar */}
      <div className="glass" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 92, background: 'rgba(255,255,255,0.94)', padding: '8px 12px 0', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <span style={{ flex: 'none', width: 34, height: 34, borderRadius: 17, background: 'var(--ios-bubble-in)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Glyph.plus('var(--ios-secondary)')}</span>
        <span style={{ flex: 1, height: 34, borderRadius: 17, border: '1px solid var(--ios-separator)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 6px 0 14px', color: 'var(--ios-tertiary)', fontSize: 17 }}>
          iMessage
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ios-tertiary)" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5.5 11a6.5 6.5 0 0 0 13 0" /><path d="M12 17.5V21" /></svg>
        </span>
      </div>
    </div>
  );
}

function Bubble({ m, prev, next, showRead }: { m: Message; prev?: Message; next?: Message; showRead: boolean }) {
  if (m.kind === 'system') {
    const [bold, ...rest] = m.text.split(' · ');
    return (
      <div style={{ alignSelf: 'center', margin: '14px 0 8px', fontSize: 12, color: 'var(--ios-secondary)', textAlign: 'center' }}>
        <b style={{ fontWeight: 600 }}>{bold}</b> {rest.join(' · ')}
      </div>
    );
  }
  const out = m.kind === 'out';
  // A bubble gets a tail when it ends a run of same-side messages (a source label also ends a run).
  const tail = !next || next.kind !== m.kind || !!m.src;
  const tight = prev && prev.kind === m.kind && !('src' in prev && prev.src);
  return (
    <div style={{ alignSelf: out ? 'flex-end' : 'flex-start', maxWidth: '76%', display: 'flex', flexDirection: 'column', alignItems: out ? 'flex-end' : 'flex-start', margin: out ? '0 4px 0 0' : '0 0 0 4px', marginTop: tight ? 2 : 8 }}>
      <div className={`bubble ${out ? 'out' : 'in'}${tail ? ' tail' : ''}`}>{m.text}</div>
      <Src text={m.src} style={{ padding: out ? '3px 12px 2px 0' : '3px 0 2px 12px', textAlign: out ? 'right' : 'left' }} />
      {showRead && <div style={{ fontSize: 11, color: 'var(--ios-secondary)', padding: '2px 4px 0 0', fontWeight: 500 }}>已讀</div>}
    </div>
  );
}

function Avatar({ text, size }: { text: string; size: number }) {
  return (
    <span style={{ flex: 'none', width: size, height: size, borderRadius: size / 2, background: avatarBg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.43, fontWeight: 500 }}>
      {text}
    </span>
  );
}
