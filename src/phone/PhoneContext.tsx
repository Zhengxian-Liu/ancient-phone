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
  | { name: 'notes' }
  | { name: 'contacts' }
  | { name: 'contact'; contactId: string; back?: Screen };

export interface PhoneState {
  figure: Figure;
  screen: Screen;
  go: (s: Screen) => void;
  readThreads: Set<string>;
  walletTaken: boolean;
  /** 白話 mode: show every text's modern rendering instead of the original. */
  plain: boolean;
  setPlain: (v: boolean) => void;
  setWalletTaken: (v: boolean) => void;
}

export const PhoneCtx = createContext<PhoneState | null>(null);

export function usePhone(): PhoneState {
  const ctx = useContext(PhoneCtx);
  if (!ctx) throw new Error('usePhone must be used inside <Phone>');
  return ctx;
}
