import { useState } from 'react';
import { usePhone } from '../phone/PhoneContext';

const ground = '#F1EFE8';
const water = '#A8CBE8';
const label = { fill: '#1C1C1E', stroke: ground, strokeWidth: 3, paintOrder: 'stroke' as const };

export function Maps() {
  const { figure, go } = usePhone();
  const map = figure.map;
  const [stop, setStop] = useState(map.defaultStop);
  const stopCount = map.stops.length;

  return (
    <div className="screen-fill" style={{ background: ground }}>
      <svg width="393" height="852" viewBox="0 0 393 852" style={{ position: 'absolute', inset: 0 }} role="img" aria-label={`地圖：${map.stops.map((s) => s.name).join('、')}`}>
        <rect width="393" height="852" fill={ground} />
        {/* faint road grid */}
        <path d="M0 80 L393 60" stroke="#E5E1D6" strokeWidth="10" />
        <path d="M0 300 L393 260" stroke="#E5E1D6" strokeWidth="10" />
        <path d="M150 0 L170 852" stroke="#E5E1D6" strokeWidth="10" />
        {map.rivers.map((r) => (
          <g key={r.name}>
            <path d={r.path} stroke={water} strokeWidth={r.width} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={r.width < 6 ? 0.7 : 1} />
            <text x={r.labelX} y={r.labelY} fontSize="12" fill="#5B8DB8" fontStyle="italic">{r.name}</text>
          </g>
        ))}
        <path d={map.priorRoute} stroke="#8E8E93" strokeWidth="4" fill="none" strokeDasharray="2 7" strokeLinecap="round" strokeLinejoin="round" />
        <path d={map.route} stroke="#fff" strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d={map.route} stroke="var(--ios-blue)" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {map.places.map((p) => {
          if (p.destination) {
            return (
              <g key={p.name}>
                <path d={`M${p.x} ${p.y} m-13 -30 a13 13 0 1 1 26 0 c0 9 -13 22 -13 30 c0 -8 -13 -21 -13 -30z`} fill="var(--ios-red)" stroke="#fff" strokeWidth="2" />
                <circle cx={p.x} cy={p.y - 30} r="4.5" fill="#fff" />
                <text x={p.x + 19} y={p.y - 11} fontSize="14" fontWeight="700" {...label}>{p.name}</text>
              </g>
            );
          }
          if (p.origin) {
            return (
              <g key={p.name}>
                <circle cx={p.x} cy={p.y} r="7" fill="#8E8E93" stroke="#fff" strokeWidth="2.5" />
                <text x={p.x - 32} y={p.y + 26} fontSize="13" fontWeight="600" {...label}>{p.name}</text>
              </g>
            );
          }
          if (p.major) {
            return (
              <g key={p.name}>
                <circle cx={p.x} cy={p.y} r="5.5" fill="#fff" stroke="var(--ios-blue)" strokeWidth="2.5" />
                <text x={p.x + 12} y={p.y + 4} fontSize="13" fontWeight="600" {...label}>{p.name}</text>
              </g>
            );
          }
          return <text key={p.name} x={p.x + 12} y={p.y + 4} fontSize="11" {...label} fill="#3C3C43">{p.name}</text>;
        })}
      </svg>

      {/* Map controls */}
      <div style={{ position: 'absolute', top: 60, right: 12, width: 44, borderRadius: 10, background: 'rgba(255,255,255,0.95)', boxShadow: '0 1px 6px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column' }}>
        <span style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '0.5px solid var(--ios-separator-light)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ios-blue)" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true"><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z" /><path d="M9 4v14M15 6v14" /></svg>
        </span>
        <span style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 3L3 10.5l7.5 3 3 7.5z" fill="var(--ios-blue)" /></svg>
        </span>
      </div>

      {/* Bottom sheet */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 336, background: '#fff', borderRadius: '14px 14px 0 0', boxShadow: '0 -2px 16px rgba(0,0,0,0.12)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 6 }}><span style={{ width: 36, height: 5, borderRadius: 3, background: '#C7C7CC' }} /></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '10px 16px 8px' }}>
          <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 22, fontWeight: 700 }}>{map.title}</span>
            <span style={{ fontSize: 15, color: 'var(--ios-secondary)' }}>{map.subtitle}</span>
          </span>
          <button aria-label="關閉" onClick={() => go({ name: 'home' })} style={{ width: 30, height: 30, borderRadius: 15, border: 0, background: 'var(--ios-fill)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="var(--ios-secondary)" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M2 2l8 8M10 2l-8 8" /></svg>
          </button>
        </div>
        <div style={{ display: 'flex', gap: 8, padding: '0 16px 10px' }}>
          <span style={{ flex: 1, height: 44, borderRadius: 10, background: 'var(--ios-blue)', color: '#fff', fontSize: 17, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>出發</span>
          <span style={{ width: 80, height: 44, borderRadius: 10, background: 'var(--ios-fill)', color: 'var(--ios-blue)', fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>步行</span>
        </div>
        <div className="scroll" style={{ flex: 1, padding: '0 16px 44px' }}>
          {map.stops.map((s, i) => {
            const dot = i === 0 ? '#8E8E93' : i === stopCount - 1 ? 'var(--ios-red)' : 'var(--ios-blue)';
            return (
              <button key={s.name} className="plain-btn" onClick={() => setStop(i)} aria-expanded={stop === i} style={{ width: '100%', display: 'flex', gap: 12 }}>
                <span style={{ flex: 'none', width: 30, display: 'flex', justifyContent: 'center', paddingTop: 12 }}>
                  <span style={{ width: 26, height: 26, borderRadius: 13, background: dot, color: '#fff', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
                </span>
                <span style={{ flex: 1, minWidth: 0, padding: '12px 0', borderBottom: '0.5px solid var(--ios-separator-light)', display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <span style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                    <span style={{ fontSize: 17, fontWeight: 600 }}>{s.name}</span>
                    <span style={{ fontSize: 13, color: 'var(--ios-secondary)', flex: 'none' }}>{s.date}</span>
                  </span>
                  {stop === i && <span style={{ fontSize: 15, lineHeight: 1.5, color: '#3C3C43' }}>{s.note}</span>}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
