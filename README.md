# Anna Mustapha — Product + UX Portfolio

This repository contains Anna Mustapha's product/UX portfolio and the ParcelTrace case study/prototype.

## What is here

- `index.html` + `site.css` — portfolio landing page
- `case-study.html` + `styles.css` — ParcelTrace case study
- `prototype/` — responsive, installable ParcelTrace interaction prototype
- `site/index.html` — legacy redirect to the portfolio root

## ParcelTrace

ParcelTrace is a **self-directed product concept** inspired by an operational pattern observed in municipal code enforcement: useful prior property research can be difficult to reuse when a property returns through a new workflow.

The prototype uses **synthetic data only**. It does not claim production use, measured time savings, legal/title sufficiency, or validated market performance. Proposed AI behavior is intentionally bounded: AI can retrieve, compare, transcribe, and summarize; qualified people investigate ambiguity and make consequential decisions.

## Run locally

No build system or package install is required. Serve the repository with any static web server, for example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

A local server is recommended instead of opening files directly because the prototype registers a service worker.

## Design system

The current visual direction is **Violet Lantern**: near-black surfaces, restrained violet/lavender brand accents, and warm lantern-gold reserved for attention and evidence-trail moments. Motion respects `prefers-reduced-motion`.

## Product-design principles

1. Evidence before automation.
2. Preserve verified work; research the delta.
3. Make uncertainty and disagreement visible.
4. Keep consequential decisions with people.
5. Use personality as a small reward, not as a substitute for clarity.

## Contact

missinglinq@outlook.com
