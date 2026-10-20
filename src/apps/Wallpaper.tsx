/** Ink-wash river landscape at dusk — the lock/home wallpaper. Pure SVG, no assets. */
export function Wallpaper({ id, dim = 0, withMoon = false }: { id: string; dim?: number; withMoon?: boolean }) {
  return (
    <svg width="393" height="852" viewBox="0 0 393 852" style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#16202D" />
          <stop offset="0.45" stopColor="#465868" />
          <stop offset="0.75" stopColor="#9AA19C" />
          <stop offset="1" stopColor="#C7BDA6" />
        </linearGradient>
      </defs>
      <rect width="393" height="852" fill={`url(#${id})`} />
      {withMoon && (
        <>
          <circle cx="300" cy="300" r="22" fill="#E9E2CF" opacity="0.85" />
          <path d="M112 330 l8 5 l8 -5" fill="none" stroke="#1F262D" strokeWidth="1.6" strokeLinecap="round" />
        </>
      )}
      <path d="M0 470 C60 430 100 445 140 420 C190 390 230 430 270 410 C320 385 350 420 393 400 L393 852 L0 852Z" fill="#7D8B93" opacity="0.85" />
      <path d="M0 540 C50 500 90 520 130 495 C170 470 210 520 260 500 C300 485 340 515 393 495 L393 852 L0 852Z" fill="#56646C" />
      <path d="M0 610 C120 600 260 625 393 605 L393 660 C260 680 120 650 0 670 Z" fill="#A9ADA5" />
      {withMoon && (
        <>
          <path d="M236 630 l26 0 l-4 5 l-18 0 z" fill="#2B3238" />
          <path d="M249 630 l0 -14" stroke="#2B3238" strokeWidth="1.2" />
        </>
      )}
      <path d="M0 690 C70 660 120 700 180 680 C240 660 300 700 393 670 L393 852 L0 852Z" fill="#2B3238" />
      {dim > 0 && <rect width="393" height="852" fill="#000" opacity={dim} />}
    </svg>
  );
}
