#!/usr/bin/env node
/* Generates the two files that are built rather than hand-written:
     references.html                 full bibliography + method
     ww2-causal-atlas-preview.html   whole project inlined into one file

       node build.js

   RUN THIS BEFORE COMMITTING. Both outputs are derived from index.html and
   js/{data,sources,geo,world,app}.js. Pushing without rebuilding publishes a
   site whose citations and single-file build disagree with the source data,
   and nothing will warn you — GitHub Pages just serves whatever is committed.

   To regenerate the coastline basemap instead, see tools/build-world.py.     */
const fs = require('fs');
const path = require('path');
const root = __dirname;

// data.js and sources.js are plain scripts; load them into this scope.
const ctx = {};
new Function(fs.readFileSync(path.join(root, 'js/data.js'), 'utf8') +
             fs.readFileSync(path.join(root, 'js/sources.js'), 'utf8') +
             fs.readFileSync(path.join(root, 'js/geo.js'), 'utf8') +
             'Object.assign(this,{ACTS,THEATERS,events,links,SOURCES,eventSources,claimNotes,' +
             'EVENT_GEO,GEO_PRECISION});'
).call(ctx);
const {ACTS, THEATERS, events, links, SOURCES, eventSources, claimNotes} = ctx;

const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const KIND = {primary:'primary source', institution:'institution', scholarship:'scholarship',
              encyclopedia:'reference', journalism:'journalism'};
const KIND_NOTE = {
  primary:'Document text, official history, or archival record.',
  institution:'Museum, national archive, or government body.',
  scholarship:'Academic study or working paper.',
  encyclopedia:'Tertiary reference — itself footnoted, useful as an entry point rather than as the last word.',
  journalism:'Reported article.'
};

const srcLi = id => {
  const s = SOURCES[id];
  return `<li><a class="src-link" href="${s.url}" target="_blank" rel="noopener noreferrer">${esc(s.title)}</a>`
       + `<span class="src-pub">${esc(s.pub)}</span>`
       + `<span class="src-kind" data-kind="${s.kind}">${KIND[s.kind]}</span></li>`;
};

/* ---- per-reel event entries ---- */
let body = '';
ACTS.forEach(act => {
  body += `<section class="ref-act"><h2><span class="rn">Reel ${['','I','II','III','IV','V','VI'][act.n]}</span> ${esc(act.title)} <span class="yrs">${esc(act.years)}</span></h2>`;
  events.filter(e => e.act === act.n).forEach(e => {
    const ids = eventSources[e.id] || [];
    const notes = claimNotes[e.id] || [];
    body += `<article class="ref-event" id="ref-${e.id}">
      <div class="ref-meta"><span class="frame">FRAME ${e.frame}</span><span class="dot"></span>
        <span class="date">${esc(e.date)}</span><span class="dot"></span>
        <span class="theater" style="color:${THEATERS[e.theater].hex}">${esc(THEATERS[e.theater].label)}</span></div>
      <h3>${esc(e.title)}</h3>
      <p class="claim-text">${esc(e.caption)}</p>
      <p class="claim-text dim">${esc(e.detail)}</p>`;
    notes.forEach(n => {
      body += `<div class="src-note"><div class="src-note-label">Note on &ldquo;${esc(n.claim)}&rdquo;</div>
        <p>${esc(n.note)}</p><ul class="src-list">${n.sources.map(srcLi).join('')}</ul></div>`;
    });
    body += `<div class="src-head">Sources for this event</div>
      <ul class="src-list">${ids.map(srcLi).join('')}</ul></article>`;
  });
  body += `</section>`;
});

/* ---- causal links table ---- */
const linkRows = links.map(l => {
  const s = events.find(e => e.id === l.source), t = events.find(e => e.id === l.target);
  return `<tr><td>${esc(s.title)}</td><td class="arrow">&rarr;</td><td>${esc(t.title)}</td>
          <td class="lbl">${esc(l.label)}</td></tr>`;
}).join('');

/* ---- works cited, grouped by kind ---- */
const byKind = {};
Object.entries(SOURCES).forEach(([id, s]) => (byKind[s.kind] = byKind[s.kind] || []).push([id, s]));
const usedBy = id => events.filter(e => (eventSources[e.id]||[]).includes(id)
  || (claimNotes[e.id]||[]).some(n => n.sources.includes(id))).map(e => e.title);
let cited = '';
['primary','institution','scholarship','journalism','encyclopedia'].forEach(k => {
  if (!byKind[k]) return;
  cited += `<h3 class="kind-head">${KIND[k]}<span class="kind-note">${KIND_NOTE[k]}</span></h3><ul class="src-list wide">`;
  byKind[k].sort((a,b) => a[1].title.localeCompare(b[1].title)).forEach(([id, s]) => {
    const u = usedBy(id);
    cited += `<li><a class="src-link" href="${s.url}" target="_blank" rel="noopener noreferrer">${esc(s.title)}</a>
      <span class="src-pub">${esc(s.pub)}</span>
      <span class="cited-for">Cited for: ${esc(u.length > 4 ? u.slice(0,4).join('; ') + ` — and ${u.length-4} more` : u.join('; '))}</span></li>`;
  });
  cited += `</ul>`;
});

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>References &amp; Method — WWII Causal Atlas</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  :root{ --bg:#0B0A08; --bg-2:#131110; --ink:#EDE6D6; --ink-dim:#9C9484; --ink-faint:#5C564A;
    --amber:#D9A24C; --amber-dim:#8C6B33; --red:#A8332B; --line:#2A251E; }
  *{box-sizing:border-box;margin:0;padding:0;}
  body{ background:var(--bg); color:var(--ink); font-family:'Source Serif 4',serif; line-height:1.6; }
  a{color:var(--amber);}
  nav{ position:sticky; top:0; z-index:10; height:58px; display:flex; justify-content:space-between;
    align-items:center; padding:0 24px; background:rgba(11,10,8,0.94); backdrop-filter:blur(6px);
    border-bottom:1px solid var(--line); font-family:'IBM Plex Mono',monospace; font-size:11px;
    letter-spacing:1.5px; text-transform:uppercase; }
  nav .brand{color:var(--ink-dim);} nav .brand strong{color:var(--amber);font-weight:600;}
  nav a{ color:var(--ink-dim); text-decoration:none; } nav a:hover{ color:var(--amber); }
  .wrap{ max-width:820px; margin:0 auto; padding:56px 24px 100px; }
  h1{ font-family:'Bebas Neue',sans-serif; font-size:60px; letter-spacing:2px; line-height:1; margin-bottom:8px; }
  .sub{ color:var(--ink-dim); font-size:16px; margin-bottom:36px; }
  .method{ border:1px solid var(--line); background:var(--bg-2); padding:22px 24px; margin-bottom:52px; }
  .method h2{ font-family:'IBM Plex Mono',monospace; font-size:11px; letter-spacing:1.6px;
    text-transform:uppercase; color:var(--amber); margin-bottom:12px; }
  .method p{ font-size:14.5px; color:var(--ink-dim); margin-bottom:11px; }
  .method p:last-child{ margin-bottom:0; }
  .method strong{ color:var(--ink); font-weight:600; }
  .ref-act{ margin-bottom:48px; }
  .ref-act > h2{ font-family:'Bebas Neue',sans-serif; font-size:30px; letter-spacing:1.5px;
    border-bottom:1px solid var(--line); padding-bottom:10px; margin-bottom:26px; }
  .ref-act > h2 .rn{ color:var(--amber); } .ref-act > h2 .yrs{ color:var(--ink-faint); font-size:18px; }
  .ref-event{ margin-bottom:34px; padding-bottom:30px; border-bottom:1px dashed var(--line); }
  .ref-meta{ font-family:'IBM Plex Mono',monospace; font-size:9.5px; letter-spacing:1.3px;
    text-transform:uppercase; color:var(--ink-faint); margin-bottom:7px; display:flex;
    align-items:center; gap:8px; flex-wrap:wrap; }
  .ref-meta .frame{ color:var(--amber-dim); }
  .ref-meta .dot{ width:3px; height:3px; border-radius:50%; background:var(--ink-faint); }
  .ref-event h3{ font-size:21px; font-weight:600; margin-bottom:9px; }
  .claim-text{ font-size:14.5px; color:var(--ink); margin-bottom:10px; }
  .claim-text.dim{ color:var(--ink-dim); font-size:13.5px; }
  .src-head{ font-family:'IBM Plex Mono',monospace; font-size:9.5px; letter-spacing:1.6px;
    text-transform:uppercase; color:var(--ink-faint); margin:16px 0 9px; }
  .src-list{ list-style:none; }
  .src-list li{ margin-bottom:10px; line-height:1.5; }
  .src-list.wide li{ margin-bottom:15px; }
  .src-link{ font-family:'Inter',sans-serif; font-size:13px; color:var(--amber);
    text-decoration:none; border-bottom:1px solid var(--amber-dim); }
  .src-link:hover{ color:#EDC078; }
  .src-pub{ display:block; font-family:'Inter',sans-serif; font-size:11.5px; color:var(--ink-faint); margin-top:2px; }
  .src-kind{ display:inline-block; margin-top:4px; font-family:'IBM Plex Mono',monospace; font-size:8.5px;
    letter-spacing:1px; text-transform:uppercase; padding:1px 6px; border:1px solid var(--line);
    border-radius:2px; color:var(--ink-faint); }
  .src-kind[data-kind="primary"]{ color:var(--amber-dim); border-color:var(--amber-dim); }
  .src-kind[data-kind="institution"]{ color:#6E93A8; border-color:#3C5766; }
  .src-kind[data-kind="scholarship"]{ color:#8A7CA8; border-color:#4B4260; }
  .src-note{ background:rgba(168,51,43,0.08); border-left:2px solid var(--red);
    padding:14px 16px; margin:16px 0; }
  .src-note-label{ font-family:'IBM Plex Mono',monospace; font-size:9.5px; letter-spacing:1.2px;
    text-transform:uppercase; color:#C4635A; margin-bottom:7px; }
  .src-note p{ font-size:13.5px; color:var(--ink-dim); margin-bottom:10px; }
  .cited-for{ display:block; font-family:'Inter',sans-serif; font-size:11px;
    color:var(--ink-faint); margin-top:3px; font-style:italic; }
  .kind-head{ font-family:'IBM Plex Mono',monospace; font-size:11px; letter-spacing:1.5px;
    text-transform:uppercase; color:var(--amber); margin:32px 0 6px; }
  .kind-note{ display:block; font-family:'Source Serif 4',serif; font-size:13px;
    letter-spacing:0; text-transform:none; color:var(--ink-faint); margin:5px 0 14px; font-style:italic; }
  table{ border-collapse:collapse; width:100%; font-size:13px; margin-top:14px; }
  .table-scroll{ overflow-x:auto; }
  td{ padding:7px 10px; border-bottom:1px solid var(--line); vertical-align:top; }
  td.arrow{ color:var(--amber); text-align:center; width:26px; }
  td.lbl{ color:var(--ink-faint); font-family:'IBM Plex Mono',monospace; font-size:11px; }
  h2.section{ font-family:'Bebas Neue',sans-serif; font-size:34px; letter-spacing:1.5px;
    margin:60px 0 6px; padding-top:26px; border-top:2px solid var(--line); }
  .section-sub{ color:var(--ink-dim); font-size:14.5px; margin-bottom:20px; }
</style>
</head>
<body>
<nav>
  <span class="brand">WWII Causal Atlas &middot; <strong>References</strong></span>
  <a href="index.html">&larr; Back to the atlas</a>
</nav>
<div class="wrap">
  <h1>References &amp; Method</h1>
  <p class="sub">Every factual claim in this project, and where it comes from.</p>

  <div class="method">
    <h2>How to read this</h2>
    <p><strong>Citations are attached at the level of the event.</strong> The sources listed under each
       of the ${events.length} events support the claims made in that event's caption and its longer
       detail text. This is a deliberate choice: sentence-level footnoting of a narrative this size
       would bury the narrative, and most of these events are covered end-to-end by each work listed.</p>
    <p><strong>Contested and commonly-mistaken claims are cited individually.</strong> Where this
       project states something that corrects a widespread error, or where historians genuinely
       disagree, the specific claim is called out in a red note with its own sources. There are
       ${Object.keys(claimNotes).length} such notes.</p>
    <p><strong>Sources are labelled by type</strong> so you can weigh them. Primary sources and
       institutional histories carry more weight than tertiary reference works. Where an
       encyclopedia entry is listed, treat it as a well-footnoted starting point for further
       reading rather than as the final authority — follow its own citations.</p>
    <p><strong>The causal links are interpretation, not fact.</strong> The ${links.length} arrows in the
       network graph are editorial claims about how one event bore on another. They are listed in
       full below so they can be argued with. The events they connect are sourced; the assertion
       that one led to another is the atlas's own, and reasonable historians order these differently.</p>
    <p>Every URL on this page was checked to resolve at the time of writing. If one has since rotted,
       the title and publisher are given so the work can be found elsewhere.</p>
  </div>

  ${body}

  <h2 class="section">The map</h2>
  <p class="section-sub">Explore mode can place the events geographically. What the dots do and don't claim.</p>
  <div class="method">
    <h2>Coastlines</h2>
    <p>The basemap is <a href="https://www.naturalearthdata.com/downloads/110m-physical-vectors/" target="_blank" rel="noopener noreferrer">Natural Earth 1:110m land</a>
       (public domain), simplified for size. <strong>The coastlines are modern, and no political
       borders are drawn at all.</strong> Frontiers between 1939 and 1945 changed almost continuously —
       drawing any single year's would misrepresent every other, so the map shows physical
       geography only.</p>
    <h2 style="margin-top:18px">What a dot means</h2>
    <p>Not every event is a point on the ground. Each is tagged with what its placement actually
       claims, and the ones that are approximate are drawn with a dashed ring, with a hairline
       running back to the coordinate the dot stands for:</p>
    ${Object.entries(ctx.GEO_PRECISION).map(([k, v]) =>
      `<p><strong>${esc(v.label)}</strong> — ${esc(v.blurb)} <span style="color:var(--ink-faint)">(${
        Object.values(ctx.EVENT_GEO).filter(g => g.precision === k).length} events)</span></p>`).join('')}
    <p>So <em>The Great Depression</em> sits on Wall Street and <em>The Tripartite Pact</em> sits in
       Berlin, but neither event was confined to that spot — the first was worldwide, the second
       bound three governments on two continents. The map says where the pin is, not where the
       history was.</p>
  </div>

  <h2 class="section">The causal links</h2>
  <p class="section-sub">All ${links.length} arrows in the network graph, with the relationship each asserts.
     These are the atlas's own editorial judgements — see the note above.</p>
  <div class="table-scroll"><table><tbody>${linkRows}</tbody></table></div>

  <h2 class="section">Works cited</h2>
  <p class="section-sub">${Object.keys(SOURCES).length} sources, grouped by type.</p>
  ${cited}
</div>
</body>
</html>
`;

fs.writeFileSync(path.join(root, 'references.html'), html);
console.log(`references.html written — ${events.length} events, ${Object.keys(SOURCES).length} sources, ` +
            `${Object.keys(claimNotes).length} claim notes, ${links.length} causal links.`);

/* ---- single-file build: inline data.js + sources.js + app.js into index.html ---- */
const shell = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const FILES = ['js/data.js', 'js/sources.js', 'js/geo.js', 'js/world.js', 'js/app.js'];
const SCRIPTS = new RegExp(FILES.map(f => '<script src="' + f.replace('/', '\\/').replace('.', '\\.') + '"><\\/script>').join('\\s*'));
if (!SCRIPTS.test(shell)) {
  console.error('build: could not find the three <script src> tags in index.html — aborting preview build.');
  process.exit(1);
}
const inlined = shell.replace(SCRIPTS, () =>
  '<script>\n' + FILES.map(f => fs.readFileSync(path.join(root, f), 'utf8')).join('\n') + '\n</script>');
fs.writeFileSync(path.join(root, 'ww2-causal-atlas-preview.html'), inlined);
console.log('ww2-causal-atlas-preview.html written — ' + (inlined.length / 1024).toFixed(0) + ' KB, self-contained.');
