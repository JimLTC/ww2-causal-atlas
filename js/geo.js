/* ============================================================
   WWII CAUSAL ATLAS — EVENT GEOGRAPHY

   Coordinates for placing each event on the map in Explore mode.

   Not every event is a point on the ground, and the map should not pretend
   otherwise. Each entry carries a `precision` saying what its dot actually
   means:

     site      The event happened at this place. A battle, a landing, an
               attack. The dot is the thing.
     decision  Signed, declared or announced here — the consequences played
               out elsewhere. The dot is where people were in a room.
     region    A campaign or front spanning an area. The dot is a
               representative centre, not a location.
     global    Not geographically located at all. The dot is symbolic, placed
               at the event most associated with it, and drawn as such.

   Nodes with `region` or `global` precision render with a dashed ring in
   Explore mode, and the detail panel states what the placement means.

   Coordinates are decimal degrees, WGS84, north/east positive.
   Coastlines in js/world.js are modern; no 1939–45 political borders are
   drawn, because they changed constantly and drawing one year's would
   misrepresent every other.
============================================================ */

const EVENT_GEO = {
  // ---- REEL I — ORIGINS ----
  versailles:          {lat:48.80,  lon:2.12,    place:'Palace of Versailles, France',        precision:'decision'},
  depression:          {lat:40.71,  lon:-74.01,  place:'Wall Street, New York — a worldwide collapse', precision:'global'},
  manchuria:           {lat:41.81,  lon:123.43,  place:'Mukden (Shenyang), Manchuria',        precision:'site'},
  'hitler-power':      {lat:52.52,  lon:13.40,   place:'Berlin, Germany',                     precision:'site'},
  rearmament:          {lat:50.94,  lon:6.96,    place:'The Rhineland — Cologne shown',       precision:'region'},
  'sino-japanese':     {lat:39.85,  lon:116.21,  place:'Marco Polo Bridge, near Beijing',     precision:'site'},
  anschluss:           {lat:48.21,  lon:16.37,   place:'Vienna, Austria',                     precision:'site'},
  munich:              {lat:48.14,  lon:11.58,   place:'Munich, Germany',                     precision:'decision'},
  'czech-occupy':      {lat:50.09,  lon:14.42,   place:'Prague, Czechoslovakia',              precision:'site'},
  'molotov-ribbentrop':{lat:55.75,  lon:37.62,   place:'Moscow, USSR',                        precision:'decision'},

  // ---- REEL II — BLITZKRIEG ----
  'poland-invasion':   {lat:52.10,  lon:19.40,   place:'Poland — first shots at Westerplatte, Gdańsk', precision:'region'},
  'declaration-war':   {lat:51.51,  lon:-0.13,   place:'London (and Paris hours later)',      precision:'decision'},
  'ussr-poland':       {lat:52.10,  lon:25.00,   place:'Eastern Poland',                      precision:'region'},
  'winter-war':        {lat:61.50,  lon:28.50,   place:'Karelian Isthmus, Finland',           precision:'region'},
  'denmark-norway':    {lat:60.50,  lon:9.50,    place:'Denmark and Norway',                  precision:'region'},
  'low-countries':     {lat:50.80,  lon:5.00,    place:'The Low Countries and the Ardennes',  precision:'region'},
  'france-fall':       {lat:49.43,  lon:2.84,    place:'Compiègne, France — where the armistice was signed', precision:'decision'},
  'battle-britain':    {lat:51.30,  lon:0.30,    place:'Southern England and the Channel',    precision:'region'},
  'italy-africa':      {lat:31.61,  lon:25.86,   place:'Libya–Egypt frontier — Sidi Barrani shown', precision:'region'},
  tripartite:          {lat:52.52,  lon:13.40,   place:'Berlin, Germany',                     precision:'decision'},
  'italy-greece':      {lat:40.00,  lon:20.60,   place:'The Albania–Greece frontier, Epirus',  precision:'region'},
  'yugoslavia-greece': {lat:43.00,  lon:20.50,   place:'Yugoslavia and Greece',               precision:'region'},
  barbarossa:          {lat:53.00,  lon:26.00,   place:'The Eastern Front, Baltic to Black Sea', precision:'region'},
  'moscow-battle':     {lat:55.75,  lon:37.62,   place:'Moscow, USSR',                        precision:'site'},

  // ---- REEL III — THE WAR GOES GLOBAL ----
  'oil-embargo':       {lat:38.90,  lon:-77.04,  place:'Washington, DC — embargo of Japanese oil imports', precision:'decision'},
  'pearl-harbor':      {lat:21.36,  lon:-157.95, place:'Pearl Harbor, Oahu, Hawaii',          precision:'site'},
  'us-enters':         {lat:38.89,  lon:-77.01,  place:'The US Capitol, Washington, DC',      precision:'decision'},
  'axis-declare-us':   {lat:52.52,  lon:13.40,   place:'Berlin (and Rome the same day)',      precision:'decision'},
  'japan-expansion':   {lat:5.00,   lon:110.00,  place:'Southeast Asia and the Dutch East Indies', precision:'region'},

  // ---- REEL IV — THE TURN ----
  midway:              {lat:28.21,  lon:-177.37, place:'Midway Atoll, central Pacific',       precision:'site'},
  'el-alamein':        {lat:30.83,  lon:28.95,   place:'El Alamein, Egypt',                   precision:'site'},
  torch:               {lat:35.20,  lon:-2.50,   place:'French North Africa — Casablanca to Algiers', precision:'region'},
  stalingrad:          {lat:48.71,  lon:44.51,   place:'Stalingrad (Volgograd), USSR',        precision:'site'},
  guadalcanal:         {lat:-9.58,  lon:160.15,  place:'Guadalcanal, Solomon Islands',        precision:'site'},
  'axis-africa-surrender':{lat:36.80,lon:10.18,  place:'Tunisia — surrender near Tunis',      precision:'site'},
  sicily:              {lat:37.50,  lon:14.20,   place:'Sicily',                              precision:'region'},
  kursk:               {lat:51.73,  lon:36.19,   place:'The Kursk salient, USSR',             precision:'site'},
  'italy-surrender':   {lat:36.99,  lon:15.22,   place:'Cassibile, Sicily — where the armistice was signed', precision:'decision'},
  'island-hopping':    {lat:5.00,   lon:160.00,  place:'The central and southwest Pacific',   precision:'region'},

  // ---- REEL V — COLLAPSE OF THE AXIS ----
  dday:                {lat:49.36,  lon:-0.75,   place:'The Normandy beaches, France',        precision:'site'},
  bagration:           {lat:53.50,  lon:28.00,   place:'Belarus',                             precision:'region'},
  'paris-liberated':   {lat:48.86,  lon:2.35,    place:'Paris, France',                       precision:'site'},
  'leyte-gulf':        {lat:10.80,  lon:125.40,  place:'Leyte Gulf, Philippines',             precision:'site'},
  bulge:               {lat:50.15,  lon:5.75,    place:'The Ardennes, Belgium and Luxembourg', precision:'region'},

  // ---- REEL VI — ENDGAME ----
  yalta:               {lat:44.50,  lon:34.17,   place:'Yalta, Crimea',                       precision:'decision'},
  'iwo-jima':          {lat:24.78,  lon:141.32,  place:'Iwo Jima, Volcano Islands',           precision:'site'},
  okinawa:             {lat:26.50,  lon:127.94,  place:'Okinawa, Ryukyu Islands',             precision:'site'},
  'berlin-fall':       {lat:52.52,  lon:13.40,   place:'Berlin, Germany',                     precision:'site'},
  've-day':            {lat:49.26,  lon:4.03,    place:'Reims, France — surrender ratified in Berlin next day', precision:'decision'},
  hiroshima:           {lat:34.39,  lon:132.46,  place:'Hiroshima, Japan',                    precision:'site'},
  'ussr-japan':        {lat:45.00,  lon:126.00,  place:'Japanese-occupied Manchuria',         precision:'region'},
  nagasaki:            {lat:32.75,  lon:129.87,  place:'Nagasaki, Japan',                     precision:'site'},
  'japan-surrender':   {lat:35.68,  lon:139.75,  place:'Tokyo — broadcast nationwide',        precision:'decision'},
  'vj-day':            {lat:35.45,  lon:139.75,  place:'USS Missouri, Tokyo Bay',             precision:'site'},
};

const GEO_PRECISION = {
  site:     {label:'exact site',   approx:false, blurb:'This is where the event happened.'},
  decision: {label:'signed here',  approx:false, blurb:'Signed, declared or announced here — its consequences played out elsewhere.'},
  region:   {label:'wider region', approx:true,  blurb:'A campaign spanning an area. The dot is a representative centre, not a location.'},
  global:   {label:'not local',    approx:true,  blurb:'Not a geographic event. The dot is symbolic.'},
};
