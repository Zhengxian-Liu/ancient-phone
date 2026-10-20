import type { Portrait } from '../types';

/**
 * Circular contact avatar: the contact's portrait, a pair of portraits for a
 * group thread, or one character on grey when there is no portrait.
 */
export function Avatar({ size, text, portrait, members }: { size: number; text: string; portrait?: Portrait; members?: Portrait[] }) {
  if (members && members.length > 1) {
    const s = Math.round(size * 0.66);
    return (
      <span style={{ flex: 'none', position: 'relative', width: size, height: size }}>
        <span style={{ position: 'absolute', left: 0, top: 0 }}><Picture p={members[0]} size={s} /></span>
        <span style={{ position: 'absolute', right: 0, bottom: 0, borderRadius: '50%', boxShadow: '0 0 0 2px #fff' }}><Picture p={members[1]} size={s} /></span>
      </span>
    );
  }
  if (portrait) return <Picture p={portrait} size={size} />;
  return (
    <span style={{ flex: 'none', width: size, height: size, borderRadius: size / 2, background: 'linear-gradient(#A6ABB6, #858B97)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.43, fontWeight: 500 }}>
      {text}
    </span>
  );
}

function Picture({ p, size }: { p: Portrait; size: number }) {
  return (
    <img
      src={p.image}
      alt=""
      width={size}
      height={size}
      draggable={false}
      style={{ flex: 'none', display: 'block', width: size, height: size, borderRadius: '50%', objectFit: 'cover', background: '#E9DFC9', filter: p.faded ? 'grayscale(1)' : undefined, opacity: p.faded ? 0.85 : 1 }}
    />
  );
}
