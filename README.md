# WWII Causal Atlas

An interactive documentary of the Second World War — watch it unfold reel by reel, or explore the full causal network of every event and how it connects to the next.

**Watch mode** — a scroll-driven "newsreel" journey through six reels (Origins, Blitzkrieg, The War Goes Global, The Turn, Collapse of the Axis, Endgame), each event with a short caption, an illustration, and an optional deep-dive.

**Explore mode** — the same 54 events and 61 causal links, in either of two layouts. **World map** puts every event at its real coordinates on a coastline basemap. **Network** discards geography and arranges events purely by cause and effect, left to right by year. Either way you can filter by theater, search, scrub the timeline, and click any event to see what led to it and what it led to.

The two modes are linked: jump from any Watch-mode event straight to its place in the network, or from any network node straight back to its narrated moment.

## Running it locally

No build step — it's plain HTML/CSS/JS. Just open `index.html` in a browser, or serve the folder:

```bash
cd ww2-causal-atlas
python3 -m http.server 8000
# then open http://localhost:8000
```

## File structure

```
ww2-causal-atlas/
├── index.html      # page shell, all CSS, both mode containers
├── js/
│   ├── data.js      # events, causal links, act metadata, icon library
│   ├── sources.js    # source registry, per-event citations, claim-level notes
│   ├── geo.js        # event coordinates + what each placement claims
│   ├── world.js      # GENERATED — simplified coastline basemap
│   └── app.js        # rendering + interaction logic for both modes
├── build.js        # regenerates references.html + the single-file build
├── tools/
│   └── build-world.py   # regenerates js/world.js from Natural Earth
├── references.html                 # GENERATED — full bibliography & method
├── ww2-causal-atlas-preview.html   # GENERATED — single-file build
└── README.md
```

To add or edit an event, the text lives in `js/data.js` and its citations in `js/sources.js`.
Then run the build (below) so the generated files pick the change up.

### Building

Two files are **generated** and must never be hand-edited — `references.html` and
`ww2-causal-atlas-preview.html`. Regenerate both after any change to `index.html`,
`js/data.js`, `js/sources.js`, or `js/app.js`:

```bash
node build.js
```

`ww2-causal-atlas-preview.html` is the whole project inlined into one document, for opening
directly off disk with no server. (D3 is still loaded from a CDN, so the graph needs a network
connection.)

## Sourcing

Every event carries citations. `js/sources.js` holds a registry of works — each with a title,
publisher, type (`primary`, `institution`, `scholarship`, `encyclopedia`, `journalism`) and URL —
plus a map of which sources support which event.

Citations are attached **at the event level**: the works listed under an event support the claims
in its caption and detail text. Claims that correct a common error, or that historians actively
dispute, are additionally called out in `claimNotes` with their own sources, and render as a
highlighted note in both modes. Sources appear inline under each event's "Read more" in Watch
mode and in the detail panel in Explore mode, and in full on `references.html`.

The causal links are **editorial interpretation, not sourced fact** — `references.html` says so
explicitly and lists all of them so they can be argued with.

## The map

`js/geo.js` holds each event's coordinates plus a `precision` recording what the dot actually
claims — `site` (it happened here), `decision` (signed or announced here, consequences elsewhere),
`region` (a campaign; the dot is a representative centre) or `global` (not geographic; the dot is
symbolic). Approximate placements render with a dashed ring and a hairline back to the point they
stand for, so the map never implies more precision than it has.

The basemap is Natural Earth 1:110m land, simplified and embedded in `js/world.js`. **Coastlines
are modern and no political borders are drawn** — frontiers moved constantly between 1939 and 1945,
and picking one year's would misrepresent every other.

Every URL was checked to resolve when it was added. If you add a source, check the link.

## Publishing with GitHub Pages

1. Create a new repository on GitHub named `ww2-causal-atlas` (or push this folder into one you already made).
2. From inside this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: WWII Causal Atlas"
   git branch -M main
   git remote add origin https://github.com/<your-username>/ww2-causal-atlas.git
   git push -u origin main
   ```
3. On GitHub: go to the repo's **Settings → Pages**, set "Source" to the `main` branch, root folder, and save.
4. After a minute or two, the site is live at `https://<your-username>.github.io/ww2-causal-atlas/`.

## Content status

All six reels are written — 54 events, 61 causal links, full illustrations for every event, and 77 cited sources covering every event plus 9 claim-level notes. Only English is available for now; the data structure is plain text strings per event, so adding a language later means adding a translated copy of `js/data.js` and a language switcher, not restructuring anything.
