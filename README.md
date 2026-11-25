# harperrees.com

Portfolio site for Harper Rees: director, writer and editor, Chapman University Dodge College '28.

A plain static site, with no build step.

- `index.html`: page structure, bio and call sheet
- `content.js`: **films, festival work and other videos. Edit this to update the site.** Empty fields are hidden automatically.
- `site.js`: rendering, film pages (`#film-<slug>`), video player and hover previews
- `styles.css`: design
- `images/`: stills named `<slug>.webp` plus `<slug>-1..3.webp` for hover previews
- `resume.pdf`: add it, then set `SHOW_RESUME = true` in `content.js`

Hosted on Netlify. Every push to `main` goes live automatically.

To preview locally, run `python3 -m http.server` in this folder and open http://localhost:8000.
