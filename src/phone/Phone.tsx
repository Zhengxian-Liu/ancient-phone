import { useMemo, useState } from 'react';
import type { Figure } from '../types';
import { PhoneCtx, type Screen } from './PhoneContext';
import { LockScreen } from '../apps/LockScreen';
import { HomeScreen } from '../apps/HomeScreen';
import { MessagesList, MessageThread } from '../apps/Messages';
import { Photos } from '../apps/Photos';
import { Maps } from '../apps/Maps';
import { Wallet } from '../apps/Wallet';
import { Notes } from '../apps/Notes';

export function Phone({ figure, showSources }: { figure: Figure; showSources: boolean }) {
  const [screen, setScreen] = useState<Screen>({ name: 'lock' });
  const [readThreads, setRead] = useState<Set<string>>(new Set());
  const [walletTaken, setWalletTaken] = useState(false);

  const go = (s: Screen) => {
    if (s.name === 'thread') setRead((prev) => new Set(prev).add(s.threadId));
    setScreen(s);
  };

  const ctx = useMemo(
    () => ({ figure, showSources, screen, go, readThreads, walletTaken, setWalletTaken }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [figure, showSources, screen, readThreads, walletTaken],
  );

  const onWallpaper = screen.name === 'lock' || screen.name === 'home';
  const chrome = onWallpaper ? '#FFFFFF' : '#000000';

  return (
    <PhoneCtx.Provider value={ctx}>
      <div className="screen">
        <div key={screen.name === 'thread' ? `thread-${screen.threadId}` : screen.name} className={onWallpaper ? 'screen-fill' : 'screen-fill push-in'}>
          {screen.name === 'lock' && <LockScreen />}
          {screen.name === 'home' && <HomeScreen />}
          {screen.name === 'messages' && <MessagesList />}
          {screen.name === 'thread' && <MessageThread threadId={screen.threadId} />}
          {screen.name === 'photos' && <Photos />}
          {screen.name === 'maps' && <Maps />}
          {screen.name === 'wallet' && <Wallet />}
          {screen.name === 'notes' && <Notes />}
        </div>
        <SystemChrome color={chrome} clock={figure.moment.clock} />
        <button
          onClick={() => screen.name !== 'home' && go({ name: 'home' })}
          aria-label={screen.name === 'lock' ? '解鎖' : '回到主畫面'}
          style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 30, background: 'transparent', border: 0, padding: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 20 }}
        >
          <span style={{ width: 134, height: 5, borderRadius: 3, marginBottom: 8, background: chrome }} />
        </button>
      </div>
    </PhoneCtx.Provider>
  );
}

/** Dynamic Island + status bar. Purely decorative. */
function SystemChrome({ color, clock }: { color: string; clock: string }) {
  return (
    <>
      <div style={{ position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)', width: 126, height: 37, borderRadius: 19, background: '#000', pointerEvents: 'none', zIndex: 20 }} />
      <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 54, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 30px 0 46px', pointerEvents: 'none', color, zIndex: 19 }}>
        <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: -0.2 }}>{clock}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="18" height="12" viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx="0.8" fill={color} /><rect x="5" y="5.5" width="3" height="6.5" rx="0.8" fill={color} /><rect x="10" y="3" width="3" height="9" rx="0.8" fill={color} opacity="0.35" /><rect x="15" y="0" width="3" height="12" rx="0.8" fill={color} opacity="0.35" /></svg>
          <svg width="16" height="12" viewBox="0 0 16 12"><path d="M8 11.5L5.6 9a3.4 3.4 0 0 1 4.8 0z" fill={color} /><path d="M3.4 6.8a6.5 6.5 0 0 1 9.2 0l-1.4 1.4a4.5 4.5 0 0 0-6.4 0z" fill={color} /><path d="M1.2 4.6a9.6 9.6 0 0 1 13.6 0l-1.4 1.4a7.6 7.6 0 0 0-10.8 0z" fill={color} /></svg>
          <svg width="27" height="13" viewBox="0 0 27 13"><rect x="0.5" y="0.5" width="23" height="12" rx="3.5" fill="none" stroke={color} strokeOpacity="0.4" /><rect x="2" y="2" width="8" height="9" rx="2" fill={color} /><path d="M25 4.5v4a2 2 0 0 0 0-4z" fill={color} fillOpacity="0.4" /></svg>
        </span>
      </div>
    </>
  );
}
