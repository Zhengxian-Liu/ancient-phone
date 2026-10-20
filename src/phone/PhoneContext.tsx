import { createContext, useContext } from 'react';
import type { Figure } from '../types';

export type Screen =
  | { name: 'lock' }
  | { name: 'home' }
  | { name: 'messages' }
  | { name: 'thread'; threadId: string }
  | { name: 'photos' }
  | { name: 'maps' }
  | { name: 'wallet' }
  | { name: 'notes' };

export interface PhoneState {
  figure: Figure;
  showSources: boolean;
  screen: Screen;
  go: (s: Screen) => void;
  readThreads: Set<string>;
  walletTaken: boolean;
  setWalletTaken: (v: boolean) => void;
}

export const PhoneCtx = createContext<PhoneState | null>(null);

export function usePhone(): PhoneState {
  const ctx = useContext(PhoneCtx);
  if (!ctx) throw new Error('usePhone must be used inside <Phone>');
  return ctx;
}

/** Renders a provenance label when sources are switched on. */
export function Src({ text, style }: { text?: string; style?: React.CSSProperties }) {
  const { showSources } = usePhone();
  if (!showSources || !text) return null;
  return <div className="src" style={style}>{text}</div>;
}
