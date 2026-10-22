# Validation — October 21, 2026

## Automated checks

- All three Angular production builds pass strict TypeScript/template checks; initial bundles approximately 163–180 kB (47–50 kB estimated transfer).
- Nine domain-behavior tests pass under Node 24.19.0.
- Locked npm dependency audit: zero reported vulnerabilities.
- Tests cover every original grade value including repaired C; equal-weight average and empty transcript; course/grade validation; strict demo student IDs including rejection of `1007abc`; title/author/ISBN search; wishlist input checks; malformed API metadata; composer search/clearing and details/unknown IDs.

## Desktop browser checks

Performed through the in-app browser against the built production files at `http://127.0.0.1:4351`.

- Reading Room: title filtering returns one Hobbit record; detail dialog shows scalar ISBN, pages and author; adding a book updates wishlist; reload retains it; remove works. Live Open Library refresh completes successfully. Empty wishlist and catalog browsing remain accessible. No captured JavaScript errors.
- Grade Lab: invalid demo ID rejected; 1007 enters workspace. C-only transcript calculates 2.00; adding an A calculates 3.00. Domain tests additionally cover empty and invalid records. Desktop screenshot records two explicitly fictional test courses.
- Opus: uppercase BACH filters to one original record; detail page renders Johann Sebastian Bach and Classical correctly. No-match search displays a useful empty state, and Show All restores all five records. No captured JavaScript errors.
- Full-page desktop screenshots inspected for all three apps; original CSS artwork, forms, rows, navigation and footer fit the normal approximately 1280px viewport.

## Mobile browser checks

The root agent checked all three applications at 390px width in the in-app browser:

- Reading Room: no horizontal overflow; book detail modal fits the phone viewport.
- Grade Lab: demo sign-in, adding Design Systems with grade A, calculating 4.00, and the responsive workspace verified. A retained scroll position after sign-in was repaired; sign-in and sign-out now scroll immediately to the top.
- Opus: directory and composer detail views fit without horizontal overflow.

Mobile screenshots are saved alongside desktop screenshots in the recovery review artifacts.

## Limits and cost

The static applications are published from the public angular-showcase repository using GitHub Pages. No Azure resource, database, paid font, paid image, paid API, or subscription is required. Open Library is a third-party free API and may be unavailable or rate-limited; the labeled saved catalog remains usable. Wishlist data is local to one browser. GPA IDs are a demo access gate only. No backend or real authentication is represented.

The GitHub Pages workflow targets the standalone angular-showcase repository and runs on main pushes or manual dispatch. It must not be dropped into the original web-425 redirect repository unchanged.

## Root-agent mobile verification

All three applications checked in the in-app browser at a 390px viewport (375px content width after the scrollbar), with no horizontal overflow. Reading Room's catalog and book-details modal fit; Grade Lab's demo sign-in, add-course, and GPA controls worked at mobile width (A = 4.00); Opus's directory and actual composer detail fit. Full-page mobile screenshots are in `../screenshots/*-mobile.png`. A retained-scroll issue after Grade Lab sign-in was fixed and the production build rerun. Viewport restored after checks.

## Reading Room library redesign — October22,2026

Replaced the prior split editorial hero/forest palette with an ink-blue library index, parchment reading desk, stacked spines and illustrated book shelves. All app logic and the other two applications remain unchanged. Nine behavior tests and all three strict production builds passed. Browser verified title filtering, edition details, adding from the modal, wishlist persistence after reload, removal, and all nine catalog cards. The longest title's dialog fits at320px; catalog and wishlist have no horizontal page overflow at390px (content375) or320px (content305). Cover-opening transitions are CSS-only and disabled for reduced-motion preferences. Desktop/mobile proof screenshots are saved in the durable recovery artifacts.
