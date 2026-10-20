/**
 * A Figure is everything one historical person's phone shows.
 * Components never hard-code a person: they read only from this shape.
 *
 * `src` on any item is its provenance label, shown under the content when
 * "顯示出處" is on. Convention:
 *   "原文 · 〈篇名〉"   — the text is quoted from a primary source
 *   "轉譯 · 據〈篇名〉" — the text is a modern paraphrase grounded in a source
 *   "轉譯"            — paraphrase of well-attested events, no single source
 */
export type Source = string;

export interface Figure {
  id: string;
  name: string; // 蘇軾
  /** The frozen moment. Everything is written "as of" this instant. */
  moment: {
    dateLine: string; // 元豐三年 二月初一  (lock screen, above the clock)
    clock: string; // 15:42  (status bar + lock screen)
    weatherLine: string; // 黃州 9° 小雨 · 申時
  };
  lockNotifications: LockNotification[];
  home: {
    weather: { place: string; temp: string; condition: string; quote: string };
    calendar: { month: string; day: string; events: { title: string; sub?: string; color: string }[] };
  };
  threads: Thread[];
  photos: Photo[];
  map: MapData;
  wallet: WalletData;
  notes: Note[];
  /** Shown under the 圖庫 title, e.g. 元豐二年七月至三年二月 */
  photosRange: string;
  /** Footnote under the photo grid explaining the conceit. */
  photosFootnote: string;
}

export interface LockNotification {
  app: 'messages' | 'wallet' | 'calendar';
  title: string;
  time: string;
  body: string;
  /** Thread id to open when tapped (messages only). */
  threadId?: string;
}

export type Message =
  | { kind: 'system'; text: string } // centered timestamp/divider; "粗體 · 細字"
  | { kind: 'in' | 'out'; text: string; src?: Source };

export interface Thread {
  id: string;
  name: string;
  avatar: string; // one character
  when: string; // shown in the list
  unread?: boolean;
  messages: Message[];
}

export interface Photo {
  glyph: string; // one character standing in for the image
  title: string;
  place: string;
  date: string;
  bg: string;
  fg: string;
  desc: string;
  src?: Source;
}

export interface MapData {
  title: string; // 前往黃州
  subtitle: string;
  /** Map is a 393×852 SVG; coordinates are in that space (top ~470px visible above the sheet). */
  rivers: { name: string; path: string; labelX: number; labelY: number; width: number }[];
  /** Earlier leg drawn as grey dots (e.g. the arrest journey). */
  priorRoute: string;
  /** The active route, drawn in system blue. */
  route: string;
  places: { name: string; x: number; y: number; major?: boolean; destination?: boolean; origin?: boolean }[];
  stops: { name: string; date: string; note: string }[];
  /** Index into stops selected by default. */
  defaultStop: number;
}

export interface WalletData {
  /** Background cards, back to front. */
  backCards: { title: string; right: string; gradient: [string, string] }[];
  main: {
    title: string;
    monthlyTotal: number;
    dailyAllowance: number;
    parts: number;
    footer: [string, string];
    gradient: [string, string];
  };
  takeLabel: string;
  takenLabel: string;
  transactions: { badge: string; color: string; title: string; sub: string; amount: string }[];
  footnote?: Source;
}

export interface Note {
  title: string;
  preview: string;
  header: string; // centered date line inside the note
  checklist?: { text: string; done?: boolean }[];
  body?: string; // preformatted text, \n preserved
  src?: Source;
}
