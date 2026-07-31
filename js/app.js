/* ============================================================
   WWII CAUSAL ATLAS — APP LOGIC
   Depends on data.js (ACTS, THEATERS, events, links, connectors, icons)
============================================================ */
const eventById = Object.fromEntries(events.map(e => [e.id, e]));
const linksData = links.map(l => ({...l}));

/* ================= SOURCES: shared renderer for both modes ================= */
const kindLabel = kind => t('src.kind.' + kind);

function srcLink(id){
  const s = SOURCES[id];
  if (!s) return '';
  return `<a class="src-link" href="${s.url}" target="_blank" rel="noopener noreferrer">${s.title}</a>`
       + `<span class="src-pub">${s.pub}</span>`
       + `<span class="src-kind" data-kind="${s.kind}">${kindLabel(s.kind)}</span>`;
}

// Returns the "Sources" block for an event: any claim-level notes first, then
// the list of works supporting that event's caption and detail text.
function sourcesHTML(eventId){
  const ids = (typeof eventSources !== 'undefined' && eventSources[eventId]) || [];
  const notes = (typeof claimNotes !== 'undefined' && claimNotes[eventId]) || [];
  if (!ids.length && !notes.length) return '';
  let html = `<div class="src-block">`;
  notes.forEach(n => {
    html += `<div class="src-note">`
         +  `<div class="src-note-label">${t('src.noteOn', {claim: n.claim})}</div>`
         +  `<p>${n.note}</p>`
         +  `<ul class="src-list">${n.sources.map(s => `<li>${srcLink(s)}</li>`).join('')}</ul>`
         +  `</div>`;
  });
  if (ids.length){
    html += `<div class="src-head">${t('src.sources')}</div>`
         +  `<ul class="src-list">${ids.map(s => `<li>${srcLink(s)}</li>`).join('')}</ul>`
         +  `<a class="src-all" href="references.html" target="_blank" rel="noopener">${t('src.all')}</a>`;
  }
  return html + `</div>`;
}

/* ================= RENDER: WATCH MODE (all reels, continuous scroll) ================= */
function toRoman(n){
  return ['','I','II','III','IV','V','VI'][n] || String(n);
}

const reel = document.getElementById('reel');
const navActLabel = document.getElementById('navActLabel');

// reveal-on-scroll for events and connector pills
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, {threshold:0.22});
// nav label follows the current reel while scrolling
const labelObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      const actN = Number(entry.target.dataset.act);
      const act = ACTS.find(a => a.n === actN);
      if (act) navActLabel.textContent = t('nav.reel', {roman: toRoman(actN), title: act.title});
    }
  });
}, {threshold:0.5});

// Rebuilds the whole reel. Called on boot and again whenever the language
// changes, so switching re-renders in place instead of reloading the page.
function renderWatch(){
  reel.innerHTML = '';
  ACTS.forEach((act, actIdx) => {
  const actEvents = events.filter(e => e.act === act.n);

  const hero = document.createElement('header');
  hero.className = 'hero';
  hero.dataset.act = act.n;
  hero.innerHTML = `
    <div class="filmstrip-edge top" aria-hidden="true"></div>
    <div class="reel-label">${t('watch.reelOf', {roman: toRoman(act.n)})}</div>
    <h1>${act.title}</h1>
    <div class="years">${act.years}</div>
    <p class="dek">${act.dek}</p>
    <div class="scroll-cue"><span>${t('watch.scrollCue')}</span><span class="arrow"></span></div>
    <div class="filmstrip-edge bottom" aria-hidden="true"></div>
  `;
  reel.appendChild(hero);

  const intro = document.createElement('section');
  intro.className = 'act-intro';
  intro.dataset.act = act.n;
  intro.innerHTML = `<div class="eyebrow">${act.eyebrow}</div><p>${act.intro}</p>`;
  reel.appendChild(intro);

  actEvents.forEach((e, i) => {
    const reverse = i % 2 === 1;
    if (i > 0){
      const key = actEvents[i-1].id + '->' + e.id;
      const label = connectors[key];
      const connector = document.createElement('div');
      connector.className = 'link-connector';
      connector.dataset.act = act.n;
      connector.innerHTML = label ? `<div class="pill"><span class="arrow-down">&#8595;</span> ${label}</div>` : ``;
      reel.appendChild(connector);
    }
    const sec = document.createElement('section');
    sec.className = 'event' + (reverse ? ' reverse' : '');
    sec.id = 'watch-' + e.id;
    sec.dataset.act = act.n;
    sec.innerHTML = `
      <div class="event-art">${icons[e.icon] || icons.spark}</div>
      <div class="event-copy">
        <div class="reel-meta"><span class="frame">${t('watch.frame')} ${e.frame}</span><span class="dot"></span><span class="theater-tag">${THEATERS[e.theater].label}</span></div>
        <span class="date-stamp">${e.date}</span>
        <h2>${e.title}</h2>
        <p class="caption">${e.caption}</p>
        <div class="btn-row">
          <button class="read-more-btn" data-target="${e.id}-detail" aria-expanded="false">${t('watch.readMore')}</button>
          <button class="view-network-btn" data-jump="${e.id}">${t('watch.viewNetwork')}</button>
        </div>
        <div class="detail" id="${e.id}-detail">${e.detail}${sourcesHTML(e.id)}</div>
      </div>
    `;
    reel.appendChild(sec);
  });

  if (actIdx < ACTS.length - 1){
    const next = ACTS[actIdx + 1];
    const transition = document.createElement('div');
    transition.className = 'reel-transition';
    transition.dataset.act = act.n;
    transition.innerHTML = `<div class="eyebrow">${t('watch.reelComplete', {roman: toRoman(act.n)})}</div><h4>${t('watch.next', {roman: toRoman(next.n), title: next.title})}</h4>`;
    reel.appendChild(transition);
  }
});

// final recap after Reel VI
const recap = document.createElement('section');
recap.className = 'recap';
recap.innerHTML = `
  <div class="eyebrow">${t('recap.eyebrow')}</div>
  <div class="recap-title">${t('recap.title')}</div>
  <p class="recap-sub">${t('recap.sub')}</p>
  <div class="filmstrip">
    ${events.map(e => `<div class="frame-card" data-jump="watch-${e.id}"><div class="fc-date">${e.date}</div><div class="fc-title">${e.title}</div></div>`).join('')}
  </div>
  <div class="next-act">
    <button class="cta" id="toExploreCta">${t('recap.cta')}</button>
    <p>${t('recap.ctaSub')}</p>
  </div>
`;
reel.appendChild(recap);

document.querySelectorAll('.read-more-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.target);
    const open = target.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    btn.textContent = open ? t('watch.close') : t('watch.readMore');
  });
});
document.querySelectorAll('.frame-card').forEach(card => {
  card.addEventListener('click', () => document.getElementById(card.dataset.jump).scrollIntoView({behavior:'smooth', block:'center'}));
});
document.querySelectorAll('.view-network-btn').forEach(btn => {
  btn.addEventListener('click', () => { setMode('explore'); selectEvent(btn.dataset.jump); centerOnNode(btn.dataset.jump); });
});
document.getElementById('toExploreCta').addEventListener('click', () => setMode('explore'));

document.querySelectorAll('.event, .link-connector').forEach(el => io.observe(el));
  document.querySelectorAll('.hero').forEach(el => labelObserver.observe(el));
}

const progressFill = document.getElementById('progressFill');
window.addEventListener('scroll', () => {
  if (document.body.classList.contains('mode-explore')) return;
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progressFill.style.height = Math.min(100, Math.max(0, scrolled)) + '%';
});

/* ================= MODE SWITCHING ================= */
const watchBtn = document.getElementById('watchBtn');
const exploreBtn = document.getElementById('exploreBtn');
let graphInitialized = false;

function setMode(mode){
  if (mode === 'explore'){
    document.body.classList.remove('mode-watch');
    document.body.classList.add('mode-explore');
    exploreBtn.classList.add('active'); watchBtn.classList.remove('active');
    navActLabel.textContent = t('nav.exploreLabel');
    if (!graphInitialized){ initGraph(); graphInitialized = true; }
    resizeGraph(); renderTimeline();
  } else {
    document.body.classList.remove('mode-explore');
    document.body.classList.add('mode-watch');
    watchBtn.classList.add('active'); exploreBtn.classList.remove('active');
  }
}
watchBtn.addEventListener('click', () => setMode('watch'));
exploreBtn.addEventListener('click', () => setMode('explore'));

/* ================= EXPLORE MODE: FILTERS ================= */
const state = { activeTheaters: new Set(Object.keys(THEATERS)), yearRange: [1919, 1945], selected: null, search: '' };

function renderTheaterList(){
  const list = document.getElementById('theater-list');
  list.innerHTML = '';
  Object.entries(THEATERS).forEach(([key, t]) => {
    const count = events.filter(e => e.theater === key).length;
    const item = document.createElement('div');
    item.className = 'theater-item' + (state.activeTheaters.has(key) ? '' : ' off');
    item.innerHTML = `<span class="dot" style="background:${t.hex}"></span>${t.label}<span class="count">${count}</span>`;
    item.onclick = () => {
      if (state.activeTheaters.has(key)) state.activeTheaters.delete(key); else state.activeTheaters.add(key);
      renderTheaterList(); updateVisibility();
    };
    list.appendChild(item);
  });
}
renderTheaterList();

function renderLegend(){
  document.getElementById('ex-legend').innerHTML =
    ACTS.map(a => t('ex.legendReel', {roman: toRoman(a.n), title: a.title, years: a.years})).join('<br>');
}
renderLegend();

document.getElementById('reset-btn').onclick = () => {
  state.activeTheaters = new Set(Object.keys(THEATERS));
  state.yearRange = [1919, 1945]; state.search = '';
  document.getElementById('search').value = '';
  renderTheaterList(); renderTimeline(); updateVisibility();
};
document.getElementById('search').oninput = (e) => { state.search = e.target.value.trim().toLowerCase(); updateVisibility(); };

const layoutHint = () => ({map: t('hint.map'), network: t('hint.network')});
document.querySelectorAll('.layout-toggle button').forEach(btn => {
  btn.addEventListener('click', () => {
    layout = btn.dataset.layout;
    document.getElementById('layoutHint').textContent = layoutHint()[layout];
    applyLayout();
    if (state.selected) selectEvent(state.selected);
  });
});
document.getElementById('layoutHint').textContent = layoutHint().map;

/* ================= EXPLORE MODE: GRAPH ================= */
let svg, gRoot, simulation, nodesData, linkSel, nodeSel, labelSel;
let gLand, gGrat, gStems, stemSel, projection, geoPath;
let layout = 'map';            // 'map' = geographic, 'network' = force-directed

/* The events span nearly the whole globe. Centring on 145E puts the
   antimeridian cut in the mid-Atlantic — the emptiest stretch for this
   dataset — giving Europe on the left, the Pacific centre-right and the
   Americas on the right, with nothing sliced in half. */
const MAP_ROTATE = [-145, 0];

function buildProjection(){
  const w = svg.node().clientWidth || 900, h = svg.node().clientHeight || 500;
  // Frame to the land itself rather than the whole sphere — Antarctica is
  // already dropped from the basemap, so this fills the pane with the part
  // of the world the war actually happened in.
  const extent = {type:'GeometryCollection',
    geometries: LAND.map(ring => ({type:'Polygon', coordinates:[ring]}))};
  projection = d3.geoEquirectangular().rotate(MAP_ROTATE)
    .fitExtent([[16, 16], [w - 16, h - 16]], extent);
  geoPath = d3.geoPath(projection);
}
// Projected screen position of an event's true coordinates.
function geoXY(id){
  const g = EVENT_GEO[id];
  if (!g || !projection) return null;
  const p = projection([g.lon, g.lat]);
  return p && isFinite(p[0]) && isFinite(p[1]) ? p : null;
}
function drawBasemap(){
  if (!gLand) return;
  buildProjection();
  gLand.selectAll('path').data(LAND).join('path')
    .attr('d', d => geoPath({type:'Polygon', coordinates:[d]}));
  gGrat.selectAll('path').data([d3.geoGraticule().step([30, 30])()])
    .join('path').attr('d', geoPath);
}

function initGraph(){
  svg = d3.select('#graph-svg');
  gRoot = svg.append('g');
  svg.call(d3.zoom().scaleExtent([0.3, 8]).on('zoom', (event) => {
    gRoot.attr('transform', event.transform);
    // once zoomed in there's room for every label, so bring them all back
    svg.node().classList.toggle('labels-on', event.transform.k >= 2.2);
  }));

  const defs = svg.append('defs');
  defs.append('marker').attr('id','arrow').attr('viewBox','0 -4 8 8').attr('refX',17).attr('refY',0)
    .attr('markerWidth',6).attr('markerHeight',6).attr('orient','auto')
    .append('path').attr('d','M0,-4L8,0L0,4').attr('fill','#8C6B33');

  Object.entries(icons).forEach(([key, svgStr]) => {
    const inner = svgStr.replace(/^<svg viewBox="([^"]+)">/, '').replace(/<\/svg>$/, '');
    const symbol = defs.append('symbol').attr('id', 'icon-' + key).attr('viewBox', '0 0 100 100');
    symbol.node().innerHTML = inner;
  });

  // basemap layers sit underneath the network
  gLand  = gRoot.append('g').attr('class','land-layer');
  gGrat  = gRoot.append('g').attr('class','graticule-layer');
  gStems = gRoot.append('g').attr('class','stem-layer');
  drawBasemap();

  nodesData = events.map(e => ({...e}));
  // seed each node at its map position so the first tick doesn't fly in
  nodesData.forEach(d => { const p = geoXY(d.id); if (p){ d.x = p[0]; d.y = p[1]; } });

  simulation = d3.forceSimulation(nodesData)
    .force('link', d3.forceLink(linksData).id(d => d.id).distance(80).strength(0.35))
    .force('charge', d3.forceManyBody().strength(-170))
    .force('x', d3.forceX().x(d => xForYear(d.year)).strength(0.55))
    .force('y', d3.forceY().y(0).strength(0.06))
    .force('collide', d3.forceCollide().radius(22));

  // hairlines from a node to its true coordinate, when crowding pushes it off
  stemSel = gStems.selectAll('line').data(nodesData).join('line').attr('class','geo-stem');

  linkSel = gRoot.append('g').selectAll('path').data(linksData).join('path')
    .attr('class','link').attr('stroke','#8C6B33').attr('stroke-width',1).attr('marker-end','url(#arrow)');

  nodeSel = gRoot.append('g').selectAll('g').data(nodesData).join('g').attr('class','node')
    .call(d3.drag()
      .on('start', (event,d) => { if (!event.active) simulation.alphaTarget(0.2).restart(); d.fx=d.x; d.fy=d.y; })
      .on('drag', (event,d) => { d.fx=event.x; d.fy=event.y; })
      .on('end', (event,d) => { if (!event.active) simulation.alphaTarget(0); d.fx=null; d.fy=null; }));

  nodeSel.append('circle')
    .attr('class', d => 'node-ring' + (isApprox(d.id) ? ' node-approx' : ''))
    .attr('r', 10)
    .attr('fill', d => THEATERS[d.theater].hex).attr('fill-opacity', 0.22)
    .attr('stroke', d => THEATERS[d.theater].hex).attr('stroke-width', 1.3);

  nodeSel.append('use')
    .attr('href', d => '#icon-' + (d.icon || 'spark'))
    .attr('width', 13).attr('height', 13).attr('x', -6.5).attr('y', -6.5)
    .attr('color', d => THEATERS[d.theater].hex)
    .style('stroke', d => THEATERS[d.theater].hex);

  nodeSel.on('click', (event,d) => { selectEvent(d.id); event.stopPropagation(); });
  nodeSel.on('mouseenter', (event,d) => showLabels([d.id, state.selected]))
         .on('mouseleave', () => showLabels([state.selected]));
  nodeSel.append('title').text(d => d.title);

  labelSel = gRoot.append('g').selectAll('text').data(nodesData).join('text')
    .attr('class','node-label').attr('dx',12).attr('dy',3)
    .text(d => d.title.length > 26 ? d.title.slice(0,25)+'…' : d.title);

  svg.on('click', () => selectEvent(null));

  simulation.on('tick', renderPositions);

  applyLayout();
  updateVisibility();
}

// Where the event sits on the map, and — just as important — what that dot
// is actually claiming. Only shown in map layout, where the claim is made.
function placeHTML(id){
  if (layout !== 'map') return '';
  const g = EVENT_GEO[id];
  if (!g) return '';
  const p = GEO_PRECISION[g.precision] || {};
  return `<div class="ex-place"><span class="pin">&#9679;</span> ${g.place}`
       + (p.blurb ? `<em>${p.blurb}</em>` : '') + `</div>`;
}

// Paints current node/link positions. Driven by the simulation tick, but also
// called directly so the map is correct the instant you switch to it, without
// waiting for the simulation to settle.
function renderPositions(){
  if (!nodeSel) return;
  linkSel.attr('d', d => {
    const dx=d.target.x-d.source.x, dy=d.target.y-d.source.y, dr=Math.sqrt(dx*dx+dy*dy)*1.6;
    return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
  });
  nodeSel.attr('transform', d => `translate(${d.x},${d.y})`);
  labelSel.attr('x', d => d.x).attr('y', d => d.y);
  // hairline back to the true coordinate, when crowding has pushed a node off it
  stemSel.each(function(d){
    const p = layout === 'map' ? geoXY(d.id) : null;
    const show = p && Math.hypot(p[0]-d.x, p[1]-d.y) > 6;
    d3.select(this).attr('display', show ? null : 'none')
      .attr('x1', show ? p[0] : 0).attr('y1', show ? p[1] : 0)
      .attr('x2', show ? d.x : 0).attr('y2', show ? d.y : 0);
  });
}

// Pins a specific set of labels visible on the map (hover + current selection).
function showLabels(ids){
  if (!labelSel) return;
  const keep = new Set(ids.filter(Boolean));
  labelSel.classed('label-show', d => keep.has(d.id));
}

function isApprox(id){
  const g = EVENT_GEO[id];
  return !!(g && GEO_PRECISION[g.precision] && GEO_PRECISION[g.precision].approx);
}

/* Switches the simulation between the geographic and force-directed layouts.
   Same nodes, same links, same selection — only the forces change, so the
   nodes visibly travel between the two arrangements. */
function applyLayout(){
  if (!simulation) return;
  const h = svg.node().clientHeight || 500;
  const isMap = layout === 'map';

  document.getElementById('graph-svg').classList.toggle('is-map', isMap);
  document.querySelectorAll('.layout-toggle button').forEach(b =>
    b.classList.toggle('active', b.dataset.layout === layout));

  if (isMap){
    drawBasemap();
    // Snap straight onto the projected coordinates. The simulation then only
    // relaxes overlaps, so the map is geographically right immediately rather
    // than after the forces settle.
    nodesData.forEach(d => {
      const p = geoXY(d.id);
      if (p){ d.x = p[0]; d.y = p[1]; d.vx = 0; d.vy = 0; }
    });
    simulation
      .force('link', null)
      .force('charge', d3.forceManyBody().strength(-18))
      .force('x', d3.forceX().x(d => { const p = geoXY(d.id); return p ? p[0] : 0; }).strength(0.9))
      .force('y', d3.forceY().y(d => { const p = geoXY(d.id); return p ? p[1] : 0; }).strength(0.9))
      .force('collide', d3.forceCollide().radius(13).strength(0.85));
  } else {
    simulation
      .force('link', d3.forceLink(linksData).id(d => d.id).distance(80).strength(0.35))
      .force('charge', d3.forceManyBody().strength(-170))
      .force('x', d3.forceX().x(d => xForYear(d.year)).strength(0.55))
      .force('y', d3.forceY().y(h/2).strength(0.06))
      .force('collide', d3.forceCollide().radius(22));
  }
  renderPositions();
  simulation.alpha(isMap ? 0.35 : 0.9).restart();
}

function xForYear(year){
  const w = svg.node().clientWidth || 900;
  const frac = (year - 1919) / (1945 - 1919);
  return 50 + frac * (w - 100);
}
function resizeGraph(){
  if (!svg) return;
  applyLayout();
}
function centerOnNode(id){
  const d = nodesData && nodesData.find(n => n.id === id);
  if (!d || !svg) return;
  const w = svg.node().clientWidth, h = svg.node().clientHeight;
  const tf = d3.zoomIdentity.translate(w/2 - (d.x||w/2), h/2 - (d.y||h/2));
  svg.transition().duration(500).call(d3.zoom().transform, tf);
}

function eventVisible(e){
  if (!state.activeTheaters.has(e.theater)) return false;
  if (e.year < state.yearRange[0] || e.year > state.yearRange[1]) return false;
  if (state.search && !e.title.toLowerCase().includes(state.search) && !e.caption.toLowerCase().includes(state.search)) return false;
  return true;
}
function updateVisibility(){
  if (!nodeSel) return;
  const visibleIds = new Set(nodesData.filter(eventVisible).map(d => d.id));
  nodeSel.classed('dim', d => !visibleIds.has(d.id));
  labelSel.classed('node-label-dim', d => !visibleIds.has(d.id));
  linkSel.classed('link-dim', d => !(visibleIds.has(d.source.id) && visibleIds.has(d.target.id)));
}

/* Re-labels everything in Explore mode after a language change. The graph
   itself (positions, links, selection) is untouched — only text is replaced. */
function refreshExploreText(){
  renderLegend();
  renderTheaterList();
  document.getElementById('layoutHint').textContent = layoutHint()[layout];
  if (labelSel) labelSel.text(d => {
    const e = eventById[d.id];
    return e.title.length > 26 ? e.title.slice(0,25) + '…' : e.title;
  });
  if (nodeSel) nodeSel.select('title').text(d => eventById[d.id].title);
  if (svg) renderTimeline();
  selectEvent(state.selected);
}

/* ================= EXPLORE MODE: DETAIL PANEL ================= */
function selectEvent(id){
  state.selected = id;
  if (nodeSel) nodeSel.classed('selected', d => d.id === id);
  if (linkSel) linkSel.classed('link-active', l =>
    id && ((l.source.id || l.source) === id || (l.target.id || l.target) === id));
  showLabels([id]);
  const panel = document.getElementById('detail-panel');
  if (!id){
    panel.innerHTML = `<div class="ex-empty"><span class="stamp">${t('ex.emptyStamp')}</span><p>${t('ex.emptyText')}</p></div>`;
    return;
  }
  const e = eventById[id];
  const th = THEATERS[e.theater];
  const causesOf = linksData.filter(l => (l.target.id||l.target) === id).map(l => ({ev: eventById[l.source.id||l.source], label:l.label}));
  const leadsTo = linksData.filter(l => (l.source.id||l.source) === id).map(l => ({ev: eventById[l.target.id||l.target], label:l.label}));

  let html = `
    <div class="ex-date">${e.date}</div>
    <div class="ex-theater-badge" style="background:${th.hex}22;color:${th.hex};border:1px solid ${th.hex}55">${th.label}</div>
    <h3 class="ex-title">${e.title}</h3>
    ${placeHTML(id)}
    <p class="ex-desc">${e.caption}</p>
    <button class="ex-watch-btn" id="ex-watch-jump">${t('ex.watchThis', {roman: toRoman(e.act)})}</button>
  `;
  if (causesOf.length){
    html += `<div class="ex-rel-block"><h3>${t('ex.followedFrom')}</h3>`;
    causesOf.forEach(r => { html += `<div class="ex-rel-item" data-id="${r.ev.id}"><span class="ex-rel-arrow">←</span><span><span class="ex-rel-title">${r.ev.title}</span><span class="ex-rel-label">${r.label}</span></span></div>`; });
    html += `</div>`;
  }
  if (leadsTo.length){
    html += `<div class="ex-rel-block"><h3>${t('ex.ledTo')}</h3>`;
    leadsTo.forEach(r => { html += `<div class="ex-rel-item" data-id="${r.ev.id}"><span class="ex-rel-arrow">→</span><span><span class="ex-rel-title">${r.ev.title}</span><span class="ex-rel-label">${r.label}</span></span></div>`; });
    html += `</div>`;
  }
  html += sourcesHTML(id);
  panel.innerHTML = html;
  panel.querySelectorAll('.ex-rel-item').forEach(el => { el.onclick = () => { selectEvent(el.dataset.id); centerOnNode(el.dataset.id); }; });
  document.getElementById('ex-watch-jump').onclick = () => { setMode('watch'); setTimeout(() => document.getElementById('watch-'+id).scrollIntoView({behavior:'smooth', block:'center'}), 60); };
}

/* ================= EXPLORE MODE: TIMELINE ================= */
const yMin = 1919, yMax = 1945;
function renderTimeline(){
  const tSvg = d3.select('#timeline-svg');
  tSvg.selectAll('*').remove();
  const tWidth = tSvg.node().clientWidth || 900, tHeight = 40;
  const x = d3.scaleLinear().domain([yMin, yMax]).range([12, tWidth-12]);

  tSvg.append('line').attr('x1',12).attr('x2',tWidth-12).attr('y1',tHeight/2).attr('y2',tHeight/2).attr('stroke','#2A251E').attr('stroke-width',2);
  tSvg.selectAll('.tick').data(events).join('circle').attr('class','tick')
    .attr('cx', d => x(d.year)).attr('cy', tHeight/2).attr('r', 2.5)
    .attr('fill', d => THEATERS[d.theater].hex).attr('opacity', 0.8);

  const brush = d3.brushX().extent([[8,4],[tWidth-8, tHeight-4]]).on('brush end', (event) => {
    if (!event.selection) return;
    const [x0,x1] = event.selection.map(x.invert);
    state.yearRange = [Math.round(x0), Math.round(x1)];
    document.getElementById('range-label').textContent =
      (state.yearRange[0]===yMin && state.yearRange[1]===yMax) ? t('ex.fullTimeline') : t('ex.viewing', {from: state.yearRange[0], to: state.yearRange[1]});
    updateVisibility();
  });
  const brushG = tSvg.append('g').call(brush);
  brushG.call(brush.move, [x(state.yearRange[0]), x(state.yearRange[1])]);
  brushG.selectAll('.selection').attr('fill','#D9A24C').attr('fill-opacity',0.12).attr('stroke','#8C6B33');
  brushG.selectAll('.handle').attr('fill','#D9A24C');
}

window.addEventListener('resize', () => {
  if (document.body.classList.contains('mode-explore')){ resizeGraph(); renderTimeline(); }
});

/* ================= BOOT =================
   Fetch only the active language pack, then build the page. Registers
   rerenderAll() so the switcher can change language in place, with no reload. */
window.rerenderAll = function(){
  renderWatch();
  if (graphInitialized) refreshExploreText();
  applyStaticStrings();
};

loadLocale(LANG).then(() => {
  applyLocale();
  renderWatch();
});
