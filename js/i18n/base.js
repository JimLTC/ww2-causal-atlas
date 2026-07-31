/* ============================================================
   WWII CAUSAL ATLAS — LOCALISATION RUNTIME

   How this works
   --------------
   js/data.js, js/geo.js and js/sources.js stay the single source of truth for
   everything structural and factual: event ids, dates as data, years, act
   numbers, theater keys, icons, link endpoints, coordinates, source URLs.

   A locale file supplies only the *translated strings*, keyed by the same ids,
   and applyLocale() merges them over the English originals in place. Anything a
   locale omits keeps its English text. That means a half-finished translation
   is safe to ship — it degrades to English string by string rather than
   breaking, and no fact or coordinate can drift between languages because no
   locale file contains any.

   Adding a language
   -----------------
   1. Copy js/i18n/es.js, translate the strings, register under a new key.
   2. Add the <script> tag in index.html and the code to LANGS below.
   3. Add it to LOCALES in build.js so its references page is generated.
   4. Run `node build.js`.

   Translation status
   ------------------
   Every locale carries `reviewed`. While false, the page shows a notice saying
   the translation is machine-produced and unverified. Only set it true once a
   fluent speaker has actually checked the historical text — the wording of the
   contested and corrected claims especially.
============================================================ */

const LOCALES = {};

// Registered languages, in switcher order. `cjk` pulls in a Noto webfont,
// because neither Bebas Neue nor Source Serif covers those scripts.
const LANGS = [
  {code:'en',      label:'English',  short:'EN', cjk:false},
  {code:'es',      label:'Español',  short:'ES', cjk:false},
  {code:'fr',      label:'Français', short:'FR', cjk:false},
  {code:'de',      label:'Deutsch',  short:'DE', cjk:false},
  {code:'zh-Hant', label:'繁體中文',  short:'中', cjk:true},
];

/* ---- English UI strings. Locales override individual keys via `ui`. ---- */
const UI_EN = {
  'nav.brand':          'WWII CAUSAL ATLAS',
  'nav.sources':        'Sources',
  'nav.watch':          'Watch',
  'nav.explore':        'Explore',
  'nav.reel':           'REEL {roman} — {title}',
  'nav.exploreLabel':   'EXPLORE — FULL NETWORK',
  'nav.language':       'Language',

  'watch.frame':        'FRAME',
  'watch.reelOf':       'Reel {roman} of VI',
  'watch.scrollCue':    'Scroll to continue',
  'watch.readMore':     '+ Read more',
  'watch.close':        '− Close',
  'watch.viewNetwork':  'View on network map →',
  'watch.reelComplete': 'Reel {roman} complete',
  'watch.next':         'Next: Reel {roman} — {title}',

  'recap.eyebrow':      'End of the Series',
  'recap.title':        'THE WHOLE WAR, ONE MAP',
  'recap.sub':          '54 events, six years, every theater — laid out as a single network of cause and effect. Explore it freely: filter by theater, search for anything, or trace how any one event led to the next.',
  'recap.cta':          'Explore the full network →',
  'recap.ctaSub':       'Every event above, plus every causal link between them, mapped in one interactive graph.',

  'ex.layout':          'Layout',
  'ex.worldMap':        'World map',
  'ex.network':         'Network',
  'ex.search':          'Search',
  'ex.searchPlaceholder':'e.g. Barbarossa, Pearl Harbor…',
  'ex.theater':         'Theater',
  'ex.reset':           '↺ Reset filters',
  'ex.hint':            'Drag to move · Scroll to zoom · Click a node for detail',
  'ex.emptyStamp':      'NO FILE SELECTED',
  'ex.emptyText':       'Click any event on the map to see its description and its causal links — what led here, and what it led to.',
  'ex.followedFrom':    '← Followed from',
  'ex.ledTo':           '→ Led to',
  'ex.watchThis':       '▶ Watch this moment (Reel {roman})',
  'ex.legendReel':      'Reel {roman} — {title} ({years})',
  'ex.fullTimeline':    'Full timeline (1919–1945)',
  'ex.viewing':         'Viewing: {from}–{to}',

  'hint.map':           'Events sit at their real coordinates. Dashed rings mark events that span a region or aren’t geographic at all — a hairline runs back to the point the dot stands for. Causal arrows fade back here; click any event to light up its own.',
  'hint.network':       'Events arranged by cause and effect, left to right by year. Geography is discarded — position means nothing but time and connection.',

  'src.sources':        'Sources',
  'src.all':            'All references & method →',
  'src.noteOn':         'On “{claim}”',
  'src.kind.primary':      'primary source',
  'src.kind.institution':  'institution',
  'src.kind.scholarship':  'scholarship',
  'src.kind.encyclopedia': 'reference',
  'src.kind.journalism':   'journalism',

  'banner.unreviewed':  'This {language} translation was produced by machine and has <strong>not yet been checked by a fluent speaker</strong>. The historical text may contain errors the English version does not. Sources and dates are unaffected.',
  'banner.readEnglish': 'Read in English',
  'banner.dismiss':     'Dismiss',
};

/* ---- language resolution: ?lang= → saved choice → browser → English ---- */
function resolveLang(){
  const known = LANGS.map(l => l.code);
  const q = new URLSearchParams(location.search).get('lang');
  if (q && known.includes(q)) return q;
  let saved = null;
  try { saved = localStorage.getItem('wwii-atlas-lang'); } catch(_){}
  if (saved && known.includes(saved)) return saved;
  for (const pref of (navigator.languages || [navigator.language || 'en'])){
    if (!pref) continue;
    if (known.includes(pref)) return pref;
    // zh-TW / zh-HK / zh-Hant-* all mean Traditional here
    if (/^zh\b/i.test(pref) && /Hant|TW|HK|MO/i.test(pref)) return 'zh-Hant';
    const base = pref.split('-')[0];
    if (known.includes(base)) return base;
  }
  return 'en';
}

let LANG = resolveLang();
const langMeta = code => LANGS.find(l => l.code === code) || LANGS[0];

/* ---- string lookup with {placeholder} interpolation and English fallback ---- */
function t(key, vars){
  const loc = LOCALES[LANG];
  let s = (loc && loc.ui && loc.ui[key] !== undefined) ? loc.ui[key] : UI_EN[key];
  if (s === undefined) return key;               // loud rather than blank
  if (vars) for (const k in vars) s = s.split('{' + k + '}').join(vars[k]);
  return s;
}

/* ---- merge the active locale over the English data, in place ----
   Only keys the locale actually provides are overwritten, so partial
   translations fall back to English rather than rendering empty.        */
function applyLocale(){
  document.documentElement.lang = LANG;
  const L = LOCALES[LANG];
  if (L){
    if (L.acts)     ACTS.forEach(a => L.acts[a.n] && Object.assign(a, L.acts[a.n]));
    if (L.theaters) Object.entries(L.theaters).forEach(([k, v]) => { if (THEATERS[k]) THEATERS[k].label = v; });
    if (L.events)   events.forEach(e => L.events[e.id] && Object.assign(e, L.events[e.id]));
    if (L.links)    links.forEach(l => { const v = L.links[l.source + '->' + l.target]; if (v) l.label = v; });
    if (L.connectors) Object.entries(L.connectors).forEach(([k, v]) => { if (k in connectors) connectors[k] = v; });
    if (L.geo && typeof EVENT_GEO !== 'undefined')
      Object.entries(L.geo).forEach(([k, v]) => { if (EVENT_GEO[k]) EVENT_GEO[k].place = v; });
    if (L.precision && typeof GEO_PRECISION !== 'undefined')
      Object.entries(L.precision).forEach(([k, v]) => { if (GEO_PRECISION[k]) Object.assign(GEO_PRECISION[k], v); });
    if (L.notes && typeof claimNotes !== 'undefined')
      Object.entries(L.notes).forEach(([id, arr]) => {
        if (!claimNotes[id]) return;
        arr.forEach((n, i) => claimNotes[id][i] && Object.assign(claimNotes[id][i], n));
      });
  }
  loadFontsFor(LANG);
  applyStaticStrings();
  renderLangSwitcher();
  renderTranslationBanner();
}

/* CJK needs a webfont: Bebas Neue has no Han glyphs at all, and Source Serif
   would fall back to whatever the OS picks. Fetched only for those languages
   so Latin-script visitors never pay for it. */
function loadFontsFor(code){
  if (!langMeta(code).cjk) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900&family=Noto+Serif+TC:wght@400;600;700&display=swap';
  document.head.appendChild(link);
}

/* Fill any element carrying data-i18n / data-i18n-ph with the active language. */
function applyStaticStrings(){
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
  document.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
}

function setLang(code){
  if (code === LANG) return;
  try { localStorage.setItem('wwii-atlas-lang', code); } catch(_){}
  // Watch mode and the D3 graph are both built once at load, so a reload is
  // the reliable way to re-render everything in the new language.
  const u = new URL(location.href);
  u.searchParams.set('lang', code);
  location.href = u.toString();
}

function renderLangSwitcher(){
  const host = document.getElementById('langSwitcher');
  if (!host) return;
  host.innerHTML = `<select id="langSelect" aria-label="${t('nav.language')}">`
    + LANGS.map(l => `<option value="${l.code}"${l.code === LANG ? ' selected' : ''}>${l.label}</option>`).join('')
    + `</select>`;
  document.getElementById('langSelect').onchange = e => setLang(e.target.value);
}

function renderTranslationBanner(){
  const loc = LOCALES[LANG];
  if (LANG === 'en' || (loc && loc.reviewed)) return;
  try { if (sessionStorage.getItem('wwii-atlas-tnotice') === LANG) return; } catch(_){}
  const meta = langMeta(LANG);
  const bar = document.createElement('div');
  bar.className = 'tnotice';
  bar.innerHTML = `<div class="tnotice-in">
      <span class="tnotice-mark">⚠</span>
      <p>${t('banner.unreviewed', {language: meta.label})}</p>
      <a class="tnotice-en" href="?lang=en">${t('banner.readEnglish')}</a>
      <button class="tnotice-x" aria-label="${t('banner.dismiss')}">✕</button>
    </div>`;
  bar.querySelector('.tnotice-x').onclick = () => {
    try { sessionStorage.setItem('wwii-atlas-tnotice', LANG); } catch(_){}
    bar.remove();
    document.body.classList.remove('has-tnotice');
  };
  document.body.appendChild(bar);
  document.body.classList.add('has-tnotice');
}
