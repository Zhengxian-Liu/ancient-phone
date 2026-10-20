# 古人的手機 · CLAUDE.md

A high-fidelity iPhone UI that shows a historical figure's life through their "apps" (Messages, Photos, Maps, Wallet, Notes). The point is **contrast**: everything looks like a real iOS 17/18 phone, and everything on it is ancient. The first figure is 蘇軾, frozen on 元豐三年二月初一 (1080), the day he reaches 黃州 after the 烏臺詩案.

## Commands

```bash
npm install
npm run dev        # http://localhost:5173 ; pick a figure with ?figure=<id>
npm run build      # tsc typecheck + vite build → dist/
npm run typecheck
```

There is no test suite yet. After a UI change, run `npm run build` and look at the screen in a browser at 393×852.

## Architecture

```
src/
  types.ts            Figure schema — the ONLY contract between content and UI
  figures/
    index.ts          registry; first entry is the default
    sushi.ts          蘇軾 content (all text, dates, colors, map paths)
  phone/
    Phone.tsx         screen router, Dynamic Island, status bar, home indicator
    PhoneContext.tsx  shared state (current screen, read threads, wallet)
    Gloss.tsx         白話註釋 page + the nav button that opens it
    icons.tsx         original iOS-style app icons and SF-Symbol-like glyphs
  apps/               one file per app: LockScreen, HomeScreen, Messages,
                      Photos, Maps, Wallet, Notes, Wallpaper
  App.tsx             scales the 393×852 device to the viewport
  styles.css          iOS system color tokens, bubble tails, shared classes
```

Rules:
- **Content lives only in `src/figures/*.ts`.** App components must never contain a person's name, a date, or a line of text that belongs to one figure. If a component needs new content, add a field to `Figure` in `types.ts` first.
- Navigation is a small state machine in `Phone.tsx` (`Screen` union in `PhoneContext.tsx`). Sub-views inside one app (photo viewer, open note) are local `useState` in that app.
- The screen is a fixed 393×852 canvas (iPhone 15/16). Lay out with absolute positions / flex in px, matching iOS metrics; `App.tsx` handles scaling.
- Styling is inline styles + a few classes in `styles.css`. Use the CSS variables (`--ios-blue`, `--ios-secondary`, …) instead of new hex values for system colors.

## Design rules (iOS fidelity)

- Match real iOS: status bar 54px, Dynamic Island 126×37 at top 11, home indicator 134×5, large titles 34/700, body 17, secondary text `#6C6C70`, separators 0.5px, grouped background `#F2F2F7`, touch targets ≥ 44px, blur via `.glass`.
- iMessage: blue `#007AFF` outgoing, `#E9E9EB` incoming, tail only on the last bubble of a run, 2px gap inside a run, 8px between runs, "已讀" under the final outgoing message, conversation opens scrolled to the bottom.
- **App icons are original art** in the iOS idiom (rounded square, gradient, white glyph). Never copy Apple's icon artwork, wordmarks or the Apple logo. Ancient twists are welcome: 書 on the Messages bubble, a red seal 影 for Photos, a 子午卯酉 clock.
- No emoji. Glyphs are inline SVG.
- "Photos" from before photography are a single large character (`glyph`) on a colored tile; the info sheet says 裝置：無.

## Content rules (historical honesty)

**The phone shows only original text.** Every message bubble, photo caption, note body and wallet passage is quoted verbatim from a primary source. If a scene has no surviving words, leave it out (or use a narration line from a source as a centered `system` message) — never write modern dialogue for it.

Everything explanatory goes in the item's `Gloss` and appears only on the 白話註釋 page (a nav-bar button on each thread, photo, note and the wallet):
- `src` — `原文 · 〈篇名〉`; abridge with （節錄）. Double-check the wording against the source.
- `plain` — the 白話 rendering.
- `notes` — context, word glosses, variant readings, and caveats: who the text was really addressed to, how sure the dating is, and any moment you shifted in time for effect (see the 卜算子 note).

Never invent facts (people, places, dates, events). Write in 繁體中文. Timestamps, place lines and phone UI labels (wallet labels, map stops, to-do items) are the phone's own voice and need no source.

## Adding a figure

1. Copy `src/figures/sushi.ts` to `src/figures/<id>.ts`, fill every field of `Figure`.
2. Pick one frozen moment (date + clock). Everything is written as of that instant: lock-screen notifications are what just arrived, the wallet is this month, the map ends where they are now.
3. Map paths are SVG in the 393×852 space; keep the route above y≈480 (the bottom sheet covers the rest).
4. Register it in `src/figures/index.ts`, then open `/?figure=<id>`.

Good candidates (lots of private writing survives): 梵谷 (letters to Theo), 林獻堂 (diaries), 曾國藩 (家書), 李清照, 蔣渭水.
