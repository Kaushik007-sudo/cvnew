# thekaushikdas.com — React 19.3 migration

This is a React conversion of the supplied `index.html`. The visual design, content, IDs, anchors, external URLs, and existing asset paths are preserved.

## React version
React `19.3.0` / React DOM `19.3.0` (current stable React release at the time of conversion).

## Existing assets
Keep the existing `images/` directory exactly where it is. Paths such as `images/hero.png`, `images/about.jpg`, `images/work-0.jpg` … `images/work-8.jpg`, and `images/cv_kaushik_pm.pdf` were intentionally not changed.

## Run locally
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
```

Deploy the generated `dist/` contents to the same web root where the existing site is hosted.

## Notes
- The original CSS has been moved intact into `src/styles.css`.
- DOM scripting has been converted to React state/effects for navigation, tabs, scroll state, reveal animations, YouTube loading, contact-form submission, chatbot visibility, and back-to-top behavior.
- The Google Apps Script endpoint and Botpress URL from the supplied file are retained.
- No image/PDF path was renamed.
