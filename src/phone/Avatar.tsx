import { useId } from 'react';
import type { Portrait } from '../types';

const SKIN = '#F1D3B3';
const INK = '#2B2622';

/**
 * Circular contact avatar: a cartoon portrait when one is given, a group of
 * up to two portraits for group threads, else one character on grey.
 */
export function Avatar({ size, text, portrait, members }: { size: number; text: string; portrait?: Portrait; members?: Portrait[] }) {
  if (members && members.length > 1) {
    const s = Math.round(size * 0.66);
    return (
      <span style={{ flex: 'none', position: 'relative', width: size, height: size }}>
        <span style={{ position: 'absolute', left: 0, top: 0 }}><Face p={members[0]} size={s} /></span>
        <span style={{ position: 'absolute', right: 0, bottom: 0, borderRadius: '50%', boxShadow: '0 0 0 2px #fff' }}><Face p={members[1]} size={s} /></span>
      </span>
    );
  }
  if (portrait) return <Face p={portrait} size={size} />;
  return (
    <span style={{ flex: 'none', width: size, height: size, borderRadius: size / 2, background: 'linear-gradient(#A6ABB6, #858B97)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.43, fontWeight: 500 }}>
      {text}
    </span>
  );
}

function Face({ p, size }: { p: Portrait; size: number }) {
  const id = useId().replace(/:/g, '');
  const hair = p.hair === 'grey' ? '#9C9893' : '#26221F';
  const beard = p.young ? 'none' : (p.beard ?? 'short');
  const face = p.face ?? 'calm';
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" style={{ flex: 'none', display: 'block', filter: p.faded ? 'grayscale(1)' : undefined, opacity: p.faded ? 0.8 : 1 }}>
      <defs>
        <linearGradient id={`bg${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.bg[0]} />
          <stop offset="1" stopColor={p.bg[1]} />
        </linearGradient>
        <clipPath id={`c${id}`}><circle cx="50" cy="50" r="50" /></clipPath>
      </defs>
      <g clipPath={`url(#c${id})`}>
        <rect width="100" height="100" fill={`url(#bg${id})`} />
        <HatBack hat={p.hat} />
        {/* Robe with a crossed collar (交領) */}
        <path d="M8 100 C10 80 30 70 50 70 C70 70 90 80 92 100 Z" fill={p.robe} />
        <path d="M40 71 L54 92" stroke="#F4EFE6" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M60 71 L49 85" stroke="rgba(0,0,0,0.22)" strokeWidth="3" strokeLinecap="round" />
        <rect x="45" y="58" width="10" height="13" fill={SKIN} />
        <ellipse cx="35.5" cy="50" rx="3" ry="4" fill={SKIN} />
        <ellipse cx="64.5" cy="50" rx="3" ry="4" fill={SKIN} />
        <ellipse cx="50" cy="48" rx="14.5" ry="16.5" fill={SKIN} />
        <HatFront hat={p.hat} />
        <Features face={face} hair={hair} />
        <Beard kind={beard} color={hair} face={face} />
        {p.prop && <Prop kind={p.prop} />}
      </g>
    </svg>
  );
}

function HatBack({ hat }: { hat: Portrait['hat'] }) {
  if (hat === 'zhanjiao') return <rect x="0" y="35.5" width="100" height="2.6" rx="1.3" fill="#151312" />;
  if (hat === 'bun') return <path d="M33 52 C30 66 34 70 38 66 L62 66 C66 70 70 66 67 52 Z" fill="#1E1A17" />;
  return null;
}

function HatFront({ hat }: { hat: Portrait['hat'] }) {
  switch (hat) {
    case 'futou':
    case 'zhanjiao':
      return (
        <g fill="#151312">
          {/* 幞頭: a stiff black cap, the back half standing higher than the front */}
          <rect x="37" y="17" width="26" height="20" rx="4" />
          <path d="M34 44 C33.5 33 37 28.5 50 28.5 C63 28.5 66.5 33 66 44 C60 40 40 40 34 44 Z" />
          <path d="M37 28.6 H63" stroke="#3A3532" strokeWidth="1" />
        </g>
      );
    case 'fangshan':
      return (
        <g>
          <path d="M35 43 L37.5 9 L62.5 9 L65 43 C58 39.5 42 39.5 35 43 Z" fill="#4E3F2E" />
          <path d="M35.6 36 C43 33 57 33 64.4 36 L65 43 C58 39.5 42 39.5 35 43 Z" fill="#2E251B" />
        </g>
      );
    case 'jin':
      return (
        <g>
          {/* 頭巾: a soft cloth wrap tied at the back */}
          <path d="M34 45 C32 24 68 24 66 45 C60 40 40 40 34 45 Z" fill="#46536A" />
          <path d="M37 37 C44 33 56 33 63 37" stroke="#5E6C85" strokeWidth="1.4" fill="none" />
          <path d="M64 32 L72 38 L68 41 Z" fill="#3A465B" />
        </g>
      );
    case 'bun':
      return (
        <g>
          <path d="M34 50 C31 28 69 28 66 50 C63 39 37 39 34 50 Z" fill="#1E1A17" />
          <ellipse cx="50" cy="24" rx="10" ry="7.5" fill="#1E1A17" />
          <path d="M37 25 L64 19" stroke="#D4A62A" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="64.5" cy="19" r="2.4" fill="#C8322B" />
        </g>
      );
    case 'topknot':
      return (
        <g>
          <path d="M34.5 46 C33 29 67 29 65.5 46 C61 39 39 39 34.5 46 Z" fill="#26221F" />
          <circle cx="50" cy="27" r="5.5" fill="#26221F" />
          <path d="M42 27 L58 27" stroke="#C9B48A" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      );
  }
}

function Features({ face, hair }: { face: NonNullable<Portrait['face']>; hair: string }) {
  const brow = {
    calm: ['M40.5 43 Q44 41.2 47 42.6', 'M53 42.6 Q56 41.2 59.5 43'],
    smile: ['M40.5 42.5 Q44 40.5 47 42', 'M53 42 Q56 40.5 59.5 42.5'],
    laugh: ['M40.5 42 Q44 39.8 47 41.5', 'M53 41.5 Q56 39.8 59.5 42'],
    sad: ['M40.5 43.5 L47 41.2', 'M53 41.2 L59.5 43.5'],
    stern: ['M40.5 41.2 L47.2 43.6', 'M52.8 43.6 L59.5 41.2'],
  }[face];
  const closed = face === 'smile' || face === 'laugh';
  return (
    <g>
      {brow.map((d) => <path key={d} d={d} stroke={hair} strokeWidth="1.8" fill="none" strokeLinecap="round" />)}
      {closed ? (
        <g stroke={INK} strokeWidth="1.7" fill="none" strokeLinecap="round">
          <path d="M41.5 48.5 Q44 45.6 46.5 48.5" />
          <path d="M53.5 48.5 Q56 45.6 58.5 48.5" />
        </g>
      ) : (
        <g fill={INK}>
          <ellipse cx="44" cy="48" rx="1.7" ry="2.1" />
          <ellipse cx="56" cy="48" rx="1.7" ry="2.1" />
        </g>
      )}
      {closed && (
        <g fill="#E8998A" opacity="0.45">
          <ellipse cx="40.5" cy="53.5" rx="3" ry="1.8" />
          <ellipse cx="59.5" cy="53.5" rx="3" ry="1.8" />
        </g>
      )}
    </g>
  );
}

function Beard({ kind, color, face }: { kind: 'long' | 'short' | 'none'; color: string; face: NonNullable<Portrait['face']> }) {
  const mouth = {
    calm: <path d="M47 58 Q50 59.6 53 58" stroke={INK} strokeWidth="1.5" fill="none" strokeLinecap="round" />,
    smile: <path d="M45.5 57 Q50 61.5 54.5 57" stroke={INK} strokeWidth="1.6" fill="none" strokeLinecap="round" />,
    laugh: <path d="M44.5 56 Q50 65 55.5 56 Z" fill="#7A2E2E" />,
    sad: <path d="M46.5 60 Q50 57 53.5 60" stroke={INK} strokeWidth="1.5" fill="none" strokeLinecap="round" />,
    stern: <path d="M46 59 L54 59" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />,
  }[face];
  return (
    <g>
      {kind === 'long' && <path d="M37 53 C37 67 44 80 50 83 C56 80 63 67 63 53 C59 61 55 63.5 50 63.5 C45 63.5 41 61 37 53 Z" fill={color} />}
      {kind === 'short' && <path d="M44 62.5 Q50 72 56 62.5 Q50 65.5 44 62.5 Z" fill={color} />}
      {kind !== 'none' && <path d="M43.5 56.5 Q47 53.8 50 55.6 Q53 53.8 56.5 56.5" stroke={color} strokeWidth="2.4" fill="none" strokeLinecap="round" />}
      {mouth}
    </g>
  );
}

function Prop({ kind }: { kind: NonNullable<Portrait['prop']> }) {
  switch (kind) {
    case 'bamboo':
      return (
        <g>
          <rect x="77" y="26" width="5" height="76" rx="1.5" fill="#5E8B4A" />
          {[44, 62, 80].map((y) => <rect key={y} x="76" y={y} width="7" height="1.6" fill="#3F6331" />)}
          <path d="M82 30 C90 26 95 28 98 31 C92 33 87 33 82 30 Z" fill="#6E9E58" />
          <path d="M82 38 C89 37 94 40 96 44 C90 44 85 42 82 38 Z" fill="#5E8B4A" />
          <path d="M77 34 C71 30 67 31 64 33 C69 36 73 36 77 34 Z" fill="#6E9E58" />
        </g>
      );
    case 'hu':
      return (
        <g>
          <rect x="45.5" y="64" width="9" height="40" rx="3.5" fill="#EDE4CC" stroke="#BFB394" strokeWidth="0.8" />
          <ellipse cx="50" cy="86" rx="8" ry="4" fill={SKIN} />
        </g>
      );
    case 'kettle':
      return (
        <g>
          <path d="M70 70 q-2 -4 0 -7 M76 70 q-2 -4 0 -7" stroke="#fff" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.85" />
          <path d="M66 84 C66 75 86 75 86 84 C86 92 66 92 66 84 Z" fill="#6B6F75" />
          <rect x="71" y="72" width="10" height="3" rx="1.5" fill="#4A4D52" />
          <path d="M86 81 L93 76" stroke="#6B6F75" strokeWidth="3" strokeLinecap="round" />
          <path d="M68 78 C62 78 62 88 68 88" stroke="#4A4D52" strokeWidth="2" fill="none" />
        </g>
      );
    case 'coins':
      return (
        <g>
          <path d="M80 58 L80 100" stroke="#8C6A3F" strokeWidth="1.2" />
          {[64, 72, 80, 88, 96].map((y) => (
            <g key={y}>
              <circle cx="80" cy={y} r="4.6" fill="#B0844E" stroke="#7A5A2E" strokeWidth="0.8" />
              <rect x="78.6" y={y - 1.4} width="2.8" height="2.8" fill="#6E4A22" />
            </g>
          ))}
        </g>
      );
    case 'scroll':
      return (
        <g>
          <rect x="33" y="81" width="34" height="10" rx="2" fill="#F2ECE0" stroke="#C9B48A" strokeWidth="0.8" />
          <rect x="30" y="79.5" width="4" height="13" rx="1.5" fill="#7A5A2E" />
          <rect x="66" y="79.5" width="4" height="13" rx="1.5" fill="#7A5A2E" />
          <path d="M39 85 H61 M39 88 H55" stroke="#8E8A84" strokeWidth="0.9" />
        </g>
      );
    case 'foodbox':
      return (
        <g>
          <path d="M70 76 C70 66 88 66 88 76" stroke="#5B2A20" strokeWidth="2" fill="none" />
          <rect x="67" y="76" width="24" height="9" rx="1.5" fill="#8B3A2E" />
          <rect x="67" y="86" width="24" height="9" rx="1.5" fill="#7A3227" />
          <path d="M72 76 C70 70 76 69 77 74" fill="#6E9E58" />
        </g>
      );
    case 'cup':
      return (
        <g>
          <path d="M68 80 L84 80 L81 89 L71 89 Z" fill="#E9E2D2" stroke="#BFB394" strokeWidth="0.8" />
          <rect x="74" y="89" width="4" height="4" fill="#BFB394" />
          <ellipse cx="76" cy="94" rx="6" ry="1.6" fill="#BFB394" />
        </g>
      );
    case 'brush':
      return (
        <g>
          <path d="M60 104 L82 64" stroke="#8C6A3F" strokeWidth="3" strokeLinecap="round" />
          <path d="M82 64 L86 56 L84.5 63 Z" fill="#1E1A17" stroke="#1E1A17" strokeWidth="2.5" strokeLinejoin="round" />
        </g>
      );
  }
}
