# Three recovered Angular projects

A maintained showcase edition of Andres Macias’s WEB 425 coursework. These are independent frontend applications in one Angular workspace. The untouched original source remains in [GrimSyntaxCloud/web-425](https://github.com/GrimSyntaxCloud/web-425); this workspace does not replace that repository or its current GitHub Pages redirect.

| Demo             | Original source                | What it does                                                                                                   | Design                                                                                                                       |
| ---------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| The Reading Room | `week-8/in-n-out-books`        | Nine original ISBNs from Open Library, title/author/ISBN filtering, book detail dialog, manual wishlist entry. | Ink blue, parchment and vermilion; a library index rail, stacked spines, illustrated shelf jackets and reading-desk details. |
| Grade Lab        | `week-7/gpa-calculator-app3`   | Original demo student IDs, course and grade entry, transcript, equal-weight GPA, reset and sign-out.           | Swiss instrument dashboard; cobalt, citrus, sharp grids and oversized numerals.                                              |
| Opus             | `week-4/reactive-composer-app` | The original five composer records, reactive name search, individual details, About and Contact.               | Concert program; plum, ivory, copper, typographic directory and original CSS record sculpture.                               |

## Local development

Use Node.js 24 LTS and npm. All dependencies are free and version-locked.

```sh
npm ci
npm test
npm run build
npx ng serve reading-room --host 127.0.0.1 --port 4341
npx ng serve grade-lab --host 127.0.0.1 --port 4342
npx ng serve opus --host 127.0.0.1 --port 4343
```

Production outputs: `dist/reading-room`, `dist/grade-lab`, and `dist/opus`. A static server can serve `dist` directly. Relative asset paths and hash navigation work under GitHub Pages repository subpaths.

## Scope and behavior

- Reading Room keeps the original nine ISBNs. The initial catalog is a saved Open Library snapshot (retrieved October 21, 2026), accurately labeled. “Refresh catalog” makes one optional API request with a ten-second timeout and visible fallback. No API key is needed. Author/title input and API text use Angular escaping, never raw HTML. Wishlist storage is browser-local, gracefully handles disabled/corrupt storage, and has validation and duplicate handling. The new persistence and removal controls are small usability additions to the original in-memory wishlist.
- Grade Lab retains original student IDs 1007–1012. This is a demo gate, not authentication or a backend. Entries last only for the current page session and clear on sign-out. The original equal-course weighting and B+ = 3.33 mapping are retained; credit hours are not implied. C now contributes 2.00, invalid grades/course names are rejected, partial numeric IDs no longer bypass validation, and an empty transcript never yields NaN. Delete-one and grade-scale controls aid usability. A changed transcript invalidates the old result until calculated again.
- Opus retains IDs 100–104 and the original names/genre. The original search only showed an alert; it now filters the collection case-insensitively through Angular reactive forms. Details show actual names/genres instead of the old literal template text. Unknown IDs have a proper not-found state. No music player, ticket system, or new backend is claimed.
- About/Contact views remain, but copied long biographies and real third-party street addresses are replaced with short original summaries, source links, and clear demo/developer contact context. No unlicensed author portraits or album art are redistributed.

## Free deployment with GitHub Pages

The GitHub Actions workflow tests and builds all three applications, then publishes only `dist` on pushes to `main` or manual runs. GitHub Pages uses GitHub Actions as its source.

Live demos:

- [The Reading Room](https://grimsyntaxcloud.github.io/angular-showcase/reading-room/)
- [Grade Lab](https://grimsyntaxcloud.github.io/angular-showcase/grade-lab/)
- [Opus](https://grimsyntaxcloud.github.io/angular-showcase/opus/)

The new public repository is [GrimSyntaxCloud/angular-showcase](https://github.com/GrimSyntaxCloud/angular-showcase).

Do not copy this workflow into `web-425` without reconciling its existing redirect workflow. No Azure resources, databases, paid APIs, paid fonts, external UI libraries, or subscriptions are required. GitHub's hosting policies and free usage limits still apply.

## Reading Room design

The Reading Room uses a catalog-first library identity rather than a split editorial hero. A dark ink-blue index rail, parchment catalog cards, stacked book spines and a broad bookshelf give it its own silhouette. Each original CSS jacket has layered page edges and a restrained opening motion on hover or keyboard focus. Reduced-motion preferences remove that movement. At mobile widths the index becomes a compact navigation strip and the shelf uses two columns. Book search, Open Library refresh, edition details, wishlist storage and all original routes are unchanged. No paid fonts, stock covers, images or additional libraries are used.

## Validation

Nine automated behavior tests cover GPA grade mapping and validation, strict student IDs, book search, wishlist inputs, malformed Open Library records, composer search and unknown details. Strict Angular template checking and production builds validate all three applications. See `VALIDATION.md` for browser checks and limitations.

## Attribution

Original applications: Andres Macias, WEB 425 coursework, November–December 2022. This edition retains their learning-project context. Modernization and visual implementation developed with AI assistance. Book metadata: [Open Library](https://openlibrary.org/). Michael Scott spotlight links to [the author’s official website](https://www.dillonscott.com/). Vivaldi spotlight links to [Encyclopaedia Britannica](https://www.britannica.com/biography/Antonio-Vivaldi). Illustrations are original CSS; system fonts require no downloads.
