# WWII Causal Atlas

### → **[Open the atlas](https://jimltc.github.io/ww2-causal-atlas/)**

An interactive documentary of the Second World War. Watch it unfold reel by reel like a
newsreel, or open the whole war as a map you can pull apart — 54 events, 1919 to 1945,
and the 61 links tying each one to what came next.

Nothing to install. It runs in a browser, in six languages.

---

## What you can do with it

**Watch it.** Six reels, scroll-driven, each event with a caption, an illustration and a
deep-dive you can open. Between events, a short pill names the thread — *eastern flank
secured*, *resource pressure*, *agreement exceeded within months* — so the war reads as a
sequence of consequences rather than a list of dates.

**Put it on a world map.** Explore mode places all 54 events at their real coordinates.
The clustering does the arguing for you: Europe jams into a knot, North Africa strings
along the Mediterranean, and the Pacific events sit hours of flying time apart.

**Or throw geography away.** Switch to Network and the same events rearrange by cause and
year — left to right, 1919 to 1945, every arrow a claim about what led to what. Click any
event to light up only its own causes and consequences.

**Chase anything you doubt.** Every event carries its sources inline. Click through to the
treaty text, the museum record, the official history.

**Narrow it down.** Filter by theater, search for anything, or scrub the timeline to watch
the map fill up year by year.

The two modes are linked both ways — jump from a narrated moment to its node in the graph,
or from any node back to the reel it belongs to.

---

## Read it in your language

Pick from the dropdown in the top bar, or go straight there:

| | | |
|---|---|---|
| [English](https://jimltc.github.io/ww2-causal-atlas/) | [Español](https://jimltc.github.io/ww2-causal-atlas/?lang=es) | [Français](https://jimltc.github.io/ww2-causal-atlas/?lang=fr) |
| [Deutsch](https://jimltc.github.io/ww2-causal-atlas/?lang=de) | [Tiếng Việt](https://jimltc.github.io/ww2-causal-atlas/?lang=vi) | [繁體中文](https://jimltc.github.io/ww2-causal-atlas/?lang=zh-Hant) |

Everything translates — all 54 events, the reel framings, the causal-link labels, the
correction notes and the map's place names. Switching is instant and doesn't reload the page.
Only the language you're actually reading gets downloaded, so the site is no heavier with six
languages than it was with one.

**The five translations are machine-drafted and have not been checked by a native speaker.**
Every non-English version says so on screen, with one click back to the English. The
historical text may contain errors the English doesn't.

What *can't* differ between languages: dates, coordinates, source URLs and the causal links
themselves live in one shared place and are never duplicated into a translation file. So no
version of this atlas can disagree with another about when something happened or where.

---

## The six reels

| | Reel | Years | Events |
|---|---|---|---|
| I | Origins | 1919–1939 | 10 |
| II | Blitzkrieg | 1939–1941 | 14 |
| III | The War Goes Global | 1941–1942 | 5 |
| IV | The Turn | 1942–1943 | 10 |
| V | Collapse of the Axis | 1944–1945 | 5 |
| VI | Endgame | 1945 | 10 |

Across six theaters: Origins & Diplomacy (11), Western & Central Europe (11), Pacific (15),
North Africa & Mediterranean (8), Eastern Front (7), China (2).

---

## Why you can trust it

**Every event is cited.** 77 sources — treaty texts from the Avalon Project, official
histories, museum and national archive records, academic work — attached to the events
they support and clickable from inside the atlas. The full bibliography, with a plain
statement of method, is at
**[References & Method](https://jimltc.github.io/ww2-causal-atlas/references.html)**.

**Common errors are corrected, not repeated.** Nine claims carry their own note explaining
what most accounts get wrong, with sources. For instance: the Polish Air Force was *not*
destroyed on the ground in September 1939 — it had dispersed to camouflaged reserve
airfields and flew for another fortnight. And the first land defeat inflicted on Japanese
forces was at Milne Bay, not Guadalcanal.

**Where historians disagree, it says so.** The claim that the Balkan campaign delayed
Operation Barbarossa is presented as contested, because it is.

**The causal arrows are interpretation, not fact.** This is the important caveat. The 61
links are editorial judgements about how one event bore on another. The events they connect
are sourced; the assertion that one *led to* another is the atlas's own, and reasonable
historians would draw the arrows differently. All 61 are listed in the open on the
references page so they can be argued with.

---

## What the map does and doesn't claim

Not every event is a point on the ground, and the map doesn't pretend otherwise. Each dot
says what it means:

- **Exact site** (22) — a battle, a landing, an attack. The dot is the thing.
- **Signed here** (13) — Versailles, Munich, the Tripartite Pact. A room where something was
  decided; the consequences happened elsewhere.
- **Wider region** (18) — Barbarossa, the Battle of Britain, island hopping. A representative
  centre, not a location.
- **Not local** (1) — the Great Depression, pinned to Wall Street as a symbol. It was worldwide.

The 19 approximate ones are drawn with a dashed ring, and a hairline runs back to the point
the dot stands for. Coastlines are modern and **no political borders are drawn at all** —
frontiers moved constantly between 1939 and 1945, and picking any one year's would
misrepresent every other.

---

## Known limits

- **The translations are unreviewed.** English is the only version a human has checked line
  by line. The other five are machine-drafted and labelled as such in the interface.
- **The references page is English-only.** Citations inside the atlas are translated, but
  clicking through to the full bibliography lands you in English whatever language you're in.
- **Needs a live connection.** D3 and the fonts load from a CDN. If those are blocked, the
  Explore graph won't render.
- **54 events is a selection, not a survey.** The Holocaust, the war in China after 1937, the
  Atlantic convoys and the home fronts are all thinner here than their weight deserves.
- **It's one reading.** See the caveat on causal arrows above.

---

## Under the hood

Plain HTML, CSS and JavaScript with [D3](https://d3js.org/) for the graph and map. No
framework, no build step needed to view it — clone the repo and open `index.html`, straight
off disk if you like. The basemap is [Natural Earth](https://www.naturalearthdata.com/)
1:110m land, simplified and embedded.

Each language is a separate pack fetched only when you choose it. A visitor downloads about
68 KB regardless of how many languages the atlas offers, which is what makes adding more of
them cheap.

`ww2-causal-atlas-preview.html` is the entire project — every language included — inlined
into a single 411 KB file, for handing someone one file instead of a folder.

Reuse terms aren't settled yet, so there's no licence on this repo — if you'd like to build
on the events, links or citations, please open an issue and ask.
