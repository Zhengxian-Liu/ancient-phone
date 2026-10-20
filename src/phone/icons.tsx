/**
 * Original app icons drawn in the iOS idiom (rounded square, gradient, white glyph).
 * Do NOT replace these with Apple's own icon artwork — the look is iOS, the art is ours.
 */
import type { CSSProperties, ReactNode } from 'react';

type IconProps = { size?: number; style?: CSSProperties };

export const Glyph = {
  chevronLeft: (color = 'var(--ios-blue)') => (
    <svg width="12" height="20" viewBox="0 0 12 20" fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 2L2 10l8 8" /></svg>
  ),
  chevronRight: () => (
    <svg width="8" height="13" viewBox="0 0 8 13" fill="none" stroke="#C4C4C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M1.5 1.5l5 5-5 5" /></svg>
  ),
  search: (color = 'var(--ios-secondary)', size = 16) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5L21 21" /></svg>
  ),
  compose: (color = 'var(--ios-blue)') => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6" /><path d="M17.5 3.5l3 3L12 15H9v-3z" /></svg>
  ),
  plus: (color = 'var(--ios-blue)', size = 16) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round" aria-hidden="true"><path d="M12 4v16M4 12h16" /></svg>
  ),
  rain: (color = '#fff', size = 16) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M7 15a4 4 0 0 1 .5-8A6 6 0 0 1 19 9a3 3 0 0 1 0 6z" /><path d="M9 18l-1 2" /><path d="M13 18l-1 2" /><path d="M17 18l-1 2" /></svg>
  ),
  check: (fill: string, size = 22) => (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ flex: 'none' }}><circle cx="12" cy="12" r="11" fill={fill} /><path d="M7 12.5l3.2 3L17 9" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  coin: (color = '#fff', size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><rect x="9.5" y="9.5" width="5" height="5" /></svg>
  ),
};

function Tile({ bg, children, size = 60, radius, style }: { bg: string; children: ReactNode; size?: number; radius?: number; style?: CSSProperties }) {
  return (
    <span className="app-icon" style={{ width: size, height: size, borderRadius: radius ?? size * 0.2333, background: bg, ...style }}>
      {children}
    </span>
  );
}

const scale = (size: number) => size / 60;

export const AppIcon = {
  messages: ({ size = 60 }: IconProps) => (
    <Tile bg="linear-gradient(#67E07A, #1BBF3A)" size={size}>
      <svg width={40 * scale(size)} height={40 * scale(size)} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 4C7 4 3 7.1 3 11c0 2.2 1.3 4.2 3.3 5.5L5.5 20l4-2.2c.8.2 1.6.2 2.5.2 5 0 9-3.1 9-7s-4-7-9-7z" fill="#fff" />
        <text x="12" y="13.6" fontSize="7" textAnchor="middle" fill="#1BBF3A" fontWeight="700">書</text>
      </svg>
    </Tile>
  ),
  phone: ({ size = 60 }: IconProps) => (
    <Tile bg="linear-gradient(#67E07A, #1BBF3A)" size={size}>
      <svg width={30 * scale(size)} height={30 * scale(size)} viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 3h2.6l1.9 4.7-2.3 1.5a11 11 0 0 0 6 6l1.5-2.3L21 14.8v2.6A2.6 2.6 0 0 1 18.4 20 15.4 15.4 0 0 1 4 5.6 2.6 2.6 0 0 1 6.6 3z" fill="#fff" /></svg>
    </Tile>
  ),
  photos: ({ size = 60 }: IconProps) => (
    <Tile bg="#fff" size={size}>
      <svg width={36 * scale(size)} height={36 * scale(size)} viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="2.5" fill="#C8322B" />
        <rect x="5.6" y="5.6" width="12.8" height="12.8" rx="1.5" fill="none" stroke="#fff" strokeWidth="0.8" />
        <text x="12" y="15.2" fontSize="9" textAnchor="middle" fill="#fff" fontWeight="700">影</text>
      </svg>
    </Tile>
  ),
  maps: ({ size = 60 }: IconProps) => (
    <Tile bg="linear-gradient(#EAF5E1, #CFE6BF)" size={size} style={{ overflow: 'hidden' }}>
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M0 16 C6 13 10 18 24 12" stroke="#9CC9EA" strokeWidth="3" fill="none" />
        <path d="M5 20c3-2 4-8 8-9s4-4 6-6" stroke="#007AFF" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <circle cx="19" cy="5" r="2.2" fill="#FF3B30" />
        <circle cx="5" cy="20" r="1.6" fill="#fff" stroke="#007AFF" strokeWidth="1" />
      </svg>
    </Tile>
  ),
  wallet: ({ size = 60 }: IconProps) => (
    <Tile bg="linear-gradient(#A97B45, #6E4A22)" size={size}>{Glyph.coin('#fff', 32 * scale(size))}</Tile>
  ),
  notes: ({ size = 60 }: IconProps) => (
    <Tile bg="linear-gradient(#FFD95A, #F2B705)" size={size}>
      <svg width={30 * scale(size)} height={30 * scale(size)} viewBox="0 0 24 24" fill="none" stroke="#5A3E00" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true"><path d="M15 3l6 6-9 9H6v-6z" /><path d="M4 21h16" /></svg>
    </Tile>
  ),
  camera: ({ size = 60 }: IconProps) => (
    <Tile bg="linear-gradient(#D8D8DC, #9C9CA2)" size={size}>
      <svg width={30 * scale(size)} height={30 * scale(size)} viewBox="0 0 24 24" fill="none" stroke="#1C1C1E" strokeWidth="1.7" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="3" /><circle cx="12" cy="13.5" r="3.5" /><path d="M8 7l1.5-3h5L16 7" /></svg>
    </Tile>
  ),
  clock: ({ size = 60 }: IconProps) => (
    <Tile bg="#000" size={size}>
      <svg width={46 * scale(size)} height={46 * scale(size)} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="#fff" />
        <path d="M12 6v6l4 2" stroke="#000" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <text x="12" y="5.6" fontSize="2.6" textAnchor="middle">子</text>
        <text x="12" y="20.4" fontSize="2.6" textAnchor="middle">午</text>
        <text x="19.6" y="13" fontSize="2.6" textAnchor="middle">卯</text>
        <text x="4.4" y="13" fontSize="2.6" textAnchor="middle">酉</text>
      </svg>
    </Tile>
  ),
  mail: ({ size = 60 }: IconProps) => (
    <Tile bg="linear-gradient(#5AB0FF, #1E6FE0)" size={size}>
      <svg width={30 * scale(size)} height={30 * scale(size)} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
    </Tile>
  ),
  books: ({ size = 60 }: IconProps) => (
    <Tile bg="linear-gradient(#FFA14A, #F06A10)" size={size}>
      <svg width={30 * scale(size)} height={30 * scale(size)} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true"><path d="M4 5c3-1 6-1 8 1 2-2 5-2 8-1v14c-3-1-6-1-8 1-2-2-5-2-8-1z" /><path d="M12 6v14" /></svg>
    </Tile>
  ),
  settings: ({ size = 60 }: IconProps) => (
    <Tile bg="linear-gradient(#B4B4BA, #7C7C84)" size={size}>
      <svg width={32 * scale(size)} height={32 * scale(size)} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="3.2" /><circle cx="12" cy="12" r="7" /><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" /></svg>
    </Tile>
  ),
};
