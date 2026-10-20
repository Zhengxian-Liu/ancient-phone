import type { ReactNode } from 'react';
import { usePhone, type Screen } from '../phone/PhoneContext';
import { AppIcon, Glyph } from '../phone/icons';
import { Wallpaper } from './Wallpaper';

export function HomeScreen() {
  const { figure, go, readThreads } = usePhone();
  const { weather, calendar } = figure.home;
  const unread = figure.threads.filter((t) => t.unread && !readThreads.has(t.id)).length;

  return (
    <div className="screen-fill">
      <Wallpaper id="homeSky" dim={0.12} />

      {/* Widgets */}
      <div style={{ position: 'absolute', top: 72, left: 27, right: 27, display: 'flex', gap: 23 }}>
        <Labeled label="天氣">
          <div style={{ width: 158, height: 158, borderRadius: 22, background: 'linear-gradient(#5E7184, #39495A)', color: '#fff', padding: 14, display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 15, fontWeight: 600 }}>{weather.place}</span>
            <span style={{ fontSize: 44, fontWeight: 300, lineHeight: 1.05 }}>{weather.temp}</span>
            <span style={{ flex: 1 }} />
            {Glyph.rain('#fff', 20)}
            <span style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>{weather.condition}</span>
            <span style={{ fontSize: 12, opacity: 0.9 }}>{weather.quote}</span>
          </div>
        </Labeled>
        <Labeled label="日曆">
          <div style={{ width: 158, height: 158, borderRadius: 22, background: '#fff', padding: 14, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ios-red)', letterSpacing: 0.5 }}>{calendar.month}</span>
            <span style={{ fontSize: 34, lineHeight: 1.1 }}>{calendar.day}</span>
            <span style={{ flex: 1 }} />
            {calendar.events.map((e, i) => (
              <span key={i} style={{ display: 'flex', gap: 6, alignItems: 'stretch', marginTop: i ? 4 : 0 }}>
                <span style={{ width: 3, borderRadius: 2, background: e.color }} />
                <span style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{e.title}</span>
                  {e.sub && <span style={{ fontSize: 12, color: 'var(--ios-secondary)' }}>{e.sub}</span>}
                </span>
              </span>
            ))}
          </div>
        </Labeled>
      </div>

      {/* App grid. Apps without a screen are decorative. */}
      <div style={{ position: 'absolute', top: 278, left: 27, right: 27, display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', rowGap: 24, justifyItems: 'center' }}>
        <App label="相機" icon={<AppIcon.camera />} />
        <App label="時辰" icon={<AppIcon.clock />} />
        <App label="錢包" icon={<AppIcon.wallet />} to={{ name: 'wallet' }} go={go} />
        <App label="備忘錄" icon={<AppIcon.notes />} to={{ name: 'notes' }} go={go} />
        <App label="驛遞" icon={<AppIcon.mail />} badge={12} />
        <App label="書冊" icon={<AppIcon.books />} />
        <App label="設定" icon={<AppIcon.settings />} />
      </div>

      <div className="glass" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: 132, height: 30, padding: '0 14px', borderRadius: 15, background: 'rgba(120,120,128,0.36)', display: 'flex', alignItems: 'center', gap: 5, color: '#fff', fontSize: 13, fontWeight: 500 }}>
        {Glyph.search('#fff', 13)}搜尋
      </div>

      {/* Dock */}
      <div className="glass" style={{ position: 'absolute', left: 12, right: 12, bottom: 26, height: 92, borderRadius: 32, background: 'rgba(205,205,210,0.32)', display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 6px' }}>
        <DockApp label="電話" icon={<AppIcon.phone />} />
        <DockApp label={unread ? `訊息，${unread} 則未讀` : '訊息'} icon={<AppIcon.messages />} badge={unread || undefined} onClick={() => go({ name: 'messages' })} />
        <DockApp label="相簿" icon={<AppIcon.photos />} onClick={() => go({ name: 'photos' })} />
        <DockApp label="地圖" icon={<AppIcon.maps />} onClick={() => go({ name: 'maps' })} />
      </div>
    </div>
  );
}

function Labeled({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      {children}
      <span className="app-label">{label}</span>
    </div>
  );
}

function App({ label, icon, badge, to, go }: { label: string; icon: ReactNode; badge?: number; to?: Screen; go?: (s: Screen) => void }) {
  const inner = (
    <>
      <span style={{ position: 'relative' }}>
        {icon}
        {badge ? <span className="badge" style={{ right: -8 }}>{badge}</span> : null}
      </span>
      <span className="app-label">{label}</span>
    </>
  );
  const style = { display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 6, width: 72 };
  if (to && go) return <button className="plain-btn" style={style} onClick={() => go(to)}>{inner}</button>;
  return <div style={style}>{inner}</div>;
}

function DockApp({ label, icon, badge, onClick }: { label: string; icon: ReactNode; badge?: number; onClick?: () => void }) {
  const inner = (
    <span style={{ position: 'relative', display: 'block' }}>
      {icon}
      {badge ? <span className="badge">{badge}</span> : null}
    </span>
  );
  if (!onClick) return <span role="img" aria-label={label}>{inner}</span>;
  return <button className="plain-btn" aria-label={label} onClick={onClick}>{inner}</button>;
}
