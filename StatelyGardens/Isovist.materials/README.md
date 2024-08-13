Changes from https://github.com/Petah/2d-visibility 09ad7ca

Removed files:
* src/draw-scene.ts
* src/main.ts
* src/load-map.ts (moved all functions to other files)
* src/endpoint-compare.ts (moved to src/isovist.ts)
* src/visibility.ts
    * calculateVisibility moved to src/isovist.ts (renamed to calculateIsovist): return Isovist instead of Point[][]; set visibility of segments
    * getTrianglePoints moved to src/shape.ts (renamed to getTriangle): return Triangle instead of Point[]


Added files:
* src/globals.ts
* src/isovist.ts
* src/shape.ts
* src/vector.ts

Modified files: 
* src/load-map.ts
    * removed loadMap
* src/segment.ts
    * use points instead of coordinates in the Segment constructor
    * track the visible portions of each Segment
    * give each Segment a parent Shape
    * added setSegmentBeginning and calculateEndPointAngles from src/load-map.ts (deleted)

https://vorple-if.com/docs/localhost.html
Startup: run python -m http.server --bind 127.0.0.1 8000
    