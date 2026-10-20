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
