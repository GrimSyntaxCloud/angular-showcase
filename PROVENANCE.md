# Recovery provenance

Source repository: https://github.com/GrimSyntaxCloud/web-425

Inspected default-branch commit: `b084c4908fc4763ccb3bf5f8047a8bc0c2f8f73f`.

Original source paths:

- `week-8/in-n-out-books/src/app`: book service/list/details, wishlist/create, About, Contact, routing.
- `week-7/gpa-calculator-app3/src/app`: home/transcript/calculation, sign-in service/form/guard, layouts, routing.
- `week-4/reactive-composer-app/src/app`: composer service/list/details, reactive search, About, Contact, routing.

All application component/service templates and TypeScript source at these paths were inspected before the rebuild. The coursework source was cloned into an isolated temporary checkout, never modified. These apps retain Angular but use a new minimal standalone-component workspace, replacing Angular 10, deprecated Flex Layout, Material/Bootstrap dependencies, and obsolete test tooling. Source references and core domain data/behavior are preserved in the README and application logic.

Original versus repaired behavior:

- Books: fixed repeated ISBN API prefixes, normalized scalar ISBNs and optional metadata, added request failure handling. Preserved catalog/details/manual wishlist. Optional search, wishlist removal/local persistence, duplicate handling and keyboard-accessible native modal added.
- GPA: preserved the original letter mapping including B+ 3.33 and equal weighting; added missing C 2.00, strict IDs and form validation, zero-safe average and result invalidation. Preserved add/calculate/reset/sign-out. No credit-hour weighting or actual student account was invented.
- Composer: kept all original names/IDs/genre and detail navigation. Implemented actual search in place of alert-only coursework placeholder; repaired literal detail field text and unknown IDs. No editable composer database or music streaming added.

Design assets: original CSS-only illustrations and locally available system fonts. No paid resources or extracted third-party photographs.
