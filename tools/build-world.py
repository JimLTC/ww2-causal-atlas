#!/usr/bin/env python3
"""Regenerates js/world.js — the simplified coastline basemap.

    python3 tools/build-world.py

Source: Natural Earth 1:110m land (public domain), via natural-earth-vector.
Needs network access. Only re-run if you want a different resolution:
tune EPS (simplification, degrees) and MIN_AREA (speck removal, sq degrees).
"""
import json, urllib.request, os

URL = ("https://raw.githubusercontent.com/nvkelso/natural-earth-vector/"
       "master/geojson/ne_110m_land.geojson")
EPS, MIN_AREA = 0.45, 2.2
DROP_BELOW_LAT = -55   # Antarctica
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def ring_area(r):
    a = 0
    for i in range(len(r) - 1):
        x1, y1 = r[i][:2]; x2, y2 = r[i + 1][:2]
        a += x1 * y2 - x2 * y1
    return abs(a) / 2

def perp(p, a, b):
    (x, y), (x1, y1), (x2, y2) = p, a, b
    dx, dy = x2 - x1, y2 - y1
    if dx == 0 and dy == 0:
        return ((x - x1) ** 2 + (y - y1) ** 2) ** .5
    t = max(0, min(1, ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy)))
    return ((x - (x1 + t * dx)) ** 2 + (y - (y1 + t * dy)) ** 2) ** .5

def dp(pts, eps):
    if len(pts) < 3:
        return pts
    dmax, idx = 0, 0
    for i in range(1, len(pts) - 1):
        d = perp(pts[i], pts[0], pts[-1])
        if d > dmax:
            dmax, idx = d, i
    if dmax > eps:
        return dp(pts[:idx + 1], eps)[:-1] + dp(pts[idx:], eps)
    return [pts[0], pts[-1]]

print("fetching", URL)
data = json.loads(urllib.request.urlopen(URL, timeout=60).read())
out = []
for f in data["features"]:
    g = f["geometry"]
    polys = [g["coordinates"]] if g["type"] == "Polygon" else g["coordinates"]
    for poly in polys:
        outer = [[round(c[0], 2), round(c[1], 2)] for c in poly[0]]
        if ring_area(outer) < MIN_AREA:
            continue
        # Drop Antarctica: no events there, and it eats a third of the canvas.
        if max(c[1] for c in outer) < -55:
            continue
        s = dp(outer, EPS)
        if len(s) >= 4:
            if s[0] != s[-1]:
                s.append(s[0])
            out.append(s)
out.sort(key=ring_area, reverse=True)

header = '''/* ============================================================
   WWII CAUSAL ATLAS — WORLD COASTLINE  (GENERATED — DO NOT EDIT)

   Simplified land outline used as the basemap in Explore mode.
   Source: Natural Earth 1:110m "land" (public domain),
   https://www.naturalearthdata.com/downloads/110m-physical-vectors/
   via https://github.com/nvkelso/natural-earth-vector

   Douglas-Peucker simplified at %s deg, rings under ~%s sq deg dropped,
   coordinates rounded to 2 decimals. Regenerate with tools/build-world.py.

   Coastlines are MODERN. No 1939-45 political borders are drawn - they
   changed constantly, and picking one year would misrepresent every other.
============================================================ */

const LAND = ''' % (EPS, MIN_AREA)

path = os.path.join(ROOT, "js", "world.js")
with open(path, "w") as fh:
    fh.write(header + json.dumps(out, separators=(",", ":")) + ";\n")
print("wrote %s — %d polygons, %d points, %.1f KB"
      % (path, len(out), sum(len(p) for p in out), os.path.getsize(path) / 1024))
