import { usePhone } from '../phone/PhoneContext';
import { AppIcon, Glyph } from '../phone/icons';
import { Wallpaper } from './Wallpaper';
import type { LockNotification } from '../types';

export function LockScreen() {
  const { figure, go } = usePhone();
  const { moment, lockNotifications } = figure;

  const open = (n: LockNotification) => {
    if (n.app === 'messages' && n.threadId) go({ name: 'thread', threadId: n.threadId });
    else if (n.app === 'wallet') go({ name: 'wallet' });
    else go({ name: 'home' });
  };

  return (
    <div className="screen-fill">
      <Wallpaper id="lockSky" withMoon />
      <div style={{ position: 'absolute', top: 70, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fff' }}>
        <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: 0.5, opacity: 0.92 }}>{moment.dateLine}</div>
        <div style={{ fontFamily: "-apple-system, 'SF Pro Display', 'PingFang TC', sans-serif", fontSize: 100, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2, opacity: 0.94 }}>{moment.clock}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 15, fontWeight: 600, opacity: 0.9 }}>
          {Glyph.rain()}
          <span>{moment.weatherLine}</span>
        </div>
      </div>

      <div style={{ position: 'absolute', left: 10, right: 10, top: 452, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {lockNotifications.map((n, i) => {
          const stacked = i === lockNotifications.length - 1 && lockNotifications.length > 2;
          return (
            <button
              key={i}
              onClick={() => open(n)}
              className="glass plain-btn"
              style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: stacked ? 'rgba(245,245,245,0.6)' : 'rgba(245,245,245,0.78)', borderRadius: 22, padding: '12px 14px', margin: stacked ? '0 8px' : 0, color: '#000' }}
            >
              <NotifIcon app={n.app} figureDay={figure.home.calendar} />
              <span style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 600, fontSize: 15 }}>{n.title}</span>
                  <span style={{ fontSize: 13, color: '#3C3C43' }}>{n.time}</span>
                </span>
                <span style={{ fontSize: 15, lineHeight: 1.35 }}>{n.body}</span>
              </span>
            </button>
          );
        })}
      </div>

      <CircleButton side="left" label="手電筒">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true"><path d="M8 2h8v4l-2 4v12h-4V10L8 6z" /></svg>
      </CircleButton>
      <CircleButton side="right" label="相機">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="3" /><circle cx="12" cy="13.5" r="3.5" /><path d="M8 7l1.5-3h5L16 7" /></svg>
      </CircleButton>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 22, textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>輕觸下方橫條以解鎖</div>
    </div>
  );
}

function NotifIcon({ app, figureDay }: { app: LockNotification['app']; figureDay: { month: string; day: string } }) {
  if (app === 'messages') return <AppIcon.messages size={38} />;
  if (app === 'wallet') return <AppIcon.wallet size={38} />;
  return (
    <span style={{ flex: 'none', width: 38, height: 38, borderRadius: 9, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>
      <span style={{ fontSize: 8, color: 'var(--ios-red)', fontWeight: 700 }}>{figureDay.month.slice(-2)}</span>
      <span style={{ fontSize: 15, fontWeight: 600 }}>{figureDay.day}</span>
    </span>
  );
}

function CircleButton({ side, label, children }: { side: 'left' | 'right'; label: string; children: React.ReactNode }) {
  return (
    <span role="img" aria-label={label} className="glass" style={{ position: 'absolute', [side]: 46, bottom: 56, width: 50, height: 50, borderRadius: 25, background: 'rgba(40,40,40,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {children}
    </span>
  );
}
