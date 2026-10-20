import { usePhone, Src } from '../phone/PhoneContext';
import { Glyph } from '../phone/icons';

const fmt = (n: number) => n.toLocaleString('en-US');

export function Wallet() {
  const { figure, walletTaken, setWalletTaken } = usePhone();
  const w = figure.wallet;
  const balance = w.main.monthlyTotal - (walletTaken ? w.main.dailyAllowance : 0);
  const left = w.main.parts - (walletTaken ? 1 : 0);
  const grad = (g: [string, string]) => `linear-gradient(135deg, ${g[0]}, ${g[1]})`;

  return (
    <div className="screen-fill" style={{ background: 'var(--ios-bg-grouped)', display: 'flex', flexDirection: 'column' }}>
      <div className="status-spacer" />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 16px 10px' }}>
        <span style={{ fontSize: 34, fontWeight: 700 }}>錢包</span>
        <span style={{ width: 34, height: 34, borderRadius: 17, background: '#E3E3E8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Glyph.plus()}</span>
      </div>

      <div className="scroll" style={{ flex: 1, padding: '0 16px 50px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Card stack */}
        <div style={{ position: 'relative', height: w.backCards.length * 56 + 216, flex: 'none' }}>
          {w.backCards.map((c, i) => (
            <div key={c.title} style={{ position: 'absolute', left: 0, right: 0, top: i * 56, height: 216, borderRadius: 14, background: grad(c.gradient), color: '#fff', padding: '14px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 600 }}><span>{c.title}</span><span style={{ opacity: 0.9 }}>{c.right}</span></div>
            </div>
          ))}
          <div style={{ position: 'absolute', left: 0, right: 0, top: w.backCards.length * 56, height: 216, borderRadius: 14, background: grad(w.main.gradient), color: '#fff', padding: 16, display: 'flex', flexDirection: 'column', boxShadow: '0 6px 18px rgba(0,0,0,0.18)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontSize: 17, fontWeight: 700 }}>{w.main.title}</span>{Glyph.coin('#fff', 28)}</div>
            <span style={{ flex: 1 }} />
            <span style={{ fontSize: 13, opacity: 0.9 }}>本月結餘</span>
            <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: 0.5 }}>{fmt(balance)} 錢</span>
            <span style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, opacity: 0.9, marginTop: 4 }}><span>{w.main.footer[0]}</span><span>{w.main.footer[1]}</span></span>
          </div>
        </div>

        {/* The beam with its hanging bags */}
        <div style={{ background: '#fff', borderRadius: 12, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 17, fontWeight: 600 }}>屋梁上的 {w.main.parts} 份</span>
            <span style={{ fontSize: 15, color: 'var(--ios-secondary)' }}>剩 {left} 份</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, minmax(0, 1fr))', gap: '8px 4px', borderTop: `3px solid ${w.main.gradient[1]}`, paddingTop: 2 }}>
            {Array.from({ length: w.main.parts }, (_, i) => {
              const taken = walletTaken && i === 0;
              return (
                <span key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ width: 1, height: 7, background: '#A08A6A' }} />
                  <span style={{ width: 18, height: 20, borderRadius: '4px 4px 9px 9px', ...(taken ? { border: '1.5px dashed #B8AC96' } : { background: w.main.gradient[0] }) }} />
                </span>
              );
            })}
          </div>
          {walletTaken ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15 }}>{Glyph.check('var(--ios-green)')}{w.takenLabel}</div>
          ) : (
            <button onClick={() => setWalletTaken(true)} style={{ height: 50, borderRadius: 12, border: 0, background: 'var(--ios-blue)', color: '#fff', fontSize: 17, fontWeight: 600 }}>{w.takeLabel}</button>
          )}
        </div>

        {/* Transactions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 20, fontWeight: 700, padding: '4px 4px 0' }}>最近交易</span>
          <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden' }}>
            {[
              ...(walletTaken ? [{ badge: '叉', color: w.main.gradient[0], title: '屋梁 · 今日一份', sub: '剛剛', amount: `−${w.main.dailyAllowance}` }] : []),
              ...w.transactions,
            ].map((t, i, all) => (
              <div key={t.title} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', borderBottom: i < all.length - 1 ? '0.5px solid var(--ios-separator-light)' : 0 }}>
                <span style={{ width: 40, height: 40, borderRadius: 8, background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16, fontWeight: 700 }}>{t.badge}</span>
                <span style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: 17, fontWeight: 600 }}>{t.title}</span>
                  <span style={{ fontSize: 13, color: 'var(--ios-secondary)' }}>{t.sub}</span>
                </span>
                <span style={{ fontSize: 17 }}>{t.amount}</span>
              </div>
            ))}
          </div>
        </div>
        <Src text={w.footnote} style={{ fontSize: 12, lineHeight: 1.6, padding: '0 4px' }} />
      </div>
    </div>
  );
}
