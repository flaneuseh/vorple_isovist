// @ts-nocheck
export const EPSILON = .0001;

export class Point {
    /*public */x/*: number*/;
    /*public */y/*: number*/;

    constructor(
      /*public */x/*: number*/,
      /*public */y/*: number*/,
    ) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `${this.x}, ${this.y}`
    }

    static distanceBetweenPoints(p, q) {
        return Math.sqrt((p.x - q.x) ** 2 + (p.y - q.y) ** 2)
    }

    static add(p, q) {
        return new Point(p.x + q.x, p.y + q.y)
    }
}

export function lineIntersection(
    point1/*: Point*/,
    point2/*: Point*/,
    point3/*: Point*/,
    point4/*: Point*/,
)/*: Point*/ {
    const pct = (
        (point4.x - point3.x) * (point1.y - point3.y) -
        (point4.y - point3.y) * (point1.x - point3.x)
    ) / (
            (point4.y - point3.y) * (point2.x - point1.x) -
            (point4.x - point3.x) * (point2.y - point1.y)
        );

    if (isNaN(pct)) {
        return null;
    }
    return new Point(
        point1.x + pct * (point2.x - point1.x),
        point1.y + pct * (point2.y - point1.y),
    );
}


export class EndPoint extends Point {
    /*public */beginsSegment/*?: any*/;
    /*public */segment/*?: any*/;
    /*public */angle/*?: any*/;

    constructor(
      /*public */x/*: number*/,
      /*public */y/*: number*/,
    ) {
        super(x, y);
    }
}


export function pointsFromArray(points/*: number[][]*/)/*: Point[]*/ {
    return points.map(point => new Point(point[0], point[1]))
}

export class Vector {
    /*public */x/*: number*/ = 0;
    /*public */y/*: number*/ = 0;
    constructor(
        p/*: number|Point*/,
        q/*: number|Point*/,
    ) {
        if (typeof p == "number" && typeof q == "number") {
            this.x = p;
            this.y = q;
        }
        else if (typeof p == "object" && typeof q == "object") {
            this.x = q.x - p.x;
            this.y = q.y - p.y;
        }
        else {
            throw new Error("Invalid constructor parameters for Vector");
        }
    }

}

export function cross2D(v1/*: Vector*/, v2/*: Vector*/)/*: number*/ {
    return (v1.x * v2.y) - (v1.y * v2.x);
}

export class Segment {
    /*public */p1/*: EndPoint*/;
    /*public */p2/*: EndPoint*/;
    /*public */d/*: number*/ = 0;
    /*private */_visiblePortions/*: Segment[]*/ = [];
    /*public */shape/*: Shape | null*/ = null;

    constructor(
        p1/*: Point*/,
        p2/*: Point*/,
        shape/*: Shape | null*/ = null,
    ) {
        this.p1 = new EndPoint(p1.x, p1.y);
        this.p2 = new EndPoint(p2.x, p2.y);
        this.p1.segment = this;
        this.p2.segment = this;
        this.shape = shape;
    }

    get height() {
        if (this.shape == null) return 0;
        return this.shape.height;
    }

    get length()/*: number*/ {
        const len = Math.sqrt(Math.pow(this.p1.x - this.p2.x, 2)) + (Math.pow(this.p1.y - this.p2.y, 2))
        return len
    }

    addVisiblePortion(visiblePortion/*: Segment*/) {
        let thisVisiblePortion = structuredClone(visiblePortion)
        thisVisiblePortion.shape = this.shape;
        this._visiblePortions.push(thisVisiblePortion);
    }

    unsetVisiblePortions() {
        this._visiblePortions = [];
    }

    get visiblePortions()/*: Segment[]*/ {
        return structuredClone(this._visiblePortions);
    }

    get visible()/*: boolean*/ {
        return this._visiblePortions.length > 0;
    }

    get vector()/*: Vector*/ {
        return new Vector(this.p1, this.p2);
    }

    positionWithRespectTo(pov/*: Point*/) {
        this.calculateEndPointAngles(pov)
        this.setSegmentBeginning()
        this.unsetVisiblePortions()
    }

    calculateEndPointAngles(pov/*: Point*/) {
        const { x, y } = pov;
        const dx = 0.5 * (this.p1.x + this.p2.x) - x;
        const dy = 0.5 * (this.p1.y + this.p2.y) - y;

        this.d = (dx * dx) + (dy * dy);
        this.p1.angle = Math.atan2(this.p1.y - y, this.p1.x - x);
        this.p2.angle = Math.atan2(this.p2.y - y, this.p2.x - x);
        this.setSegmentBeginning()
    }

    setSegmentBeginning() {
        let dAngle = this.p2.angle - this.p1.angle;

        if (dAngle <= -Math.PI) {
            dAngle += 2 * Math.PI;
        }
        if (dAngle > Math.PI) {
            dAngle -= 2 * Math.PI;
        }

        this.p1.beginsSegment = dAngle > 0;
        this.p2.beginsSegment = !this.p1.beginsSegment;
    };

    get beginPoint() {
        if (this.p1.beginsSegment) {
            return this.p1;
        }
        return this.p2;
    }

    get transparent() {
        return this.shape.transparent
    }

    toString() {
        let str = `${this.p1.toString()} ${this.p2.toString()}`;
        return str
    }
}


// Is p left of segment?
export function leftOf(segment/*: Segment*/, p/*: Point*/) {
    const vS = segment.vector;
    const vSP = new Vector(segment.p1, p);
    const cross = cross2D(vS, vSP);
    return cross < 0;
}

// Is p behind segment?
export function behind(segment, p) {
    return (((p.x - segment.p1.x) * (segment.p2.y - segment.p1.y)) - ((p.y - segment.p1.y) * (segment.p2.x - segment.p1.x))) < 0
}

export function interpolate(PA/*: Point*/, PB/*: Point*/, f/*: number*/) {
    return new Point(
        PA.x * (1 - f) + PB.x * f,
        PA.y * (1 - f) + PB.y * f,
    );
}

// Is B in front of A with respect to pov?
export function segmentInFrontOf(segmentA/*: Segment*/, segmentB/*: Segment*/, pov/*: Point*/) {
    const A1 = leftOf(segmentA, interpolate(segmentB.p1, segmentB.p2, EPSILON));
    const A2 = leftOf(segmentA, interpolate(segmentB.p2, segmentB.p1, EPSILON));
    const A3 = leftOf(segmentA, pov);
    const B1 = leftOf(segmentB, interpolate(segmentA.p1, segmentA.p2, EPSILON));
    const B2 = leftOf(segmentB, interpolate(segmentA.p2, segmentA.p1, EPSILON));
    const B3 = leftOf(segmentB, pov);

    if (B1 === B2 && B2 !== B3) {
        return true;
    }
    if (A1 === A2 && A2 === A3) {
        return true;
    }
    if (A1 === A2 && A2 !== A3) {
        return false;
    }
    if (B1 === B2 && B2 === B3) {
        return false;
    }

    return false;
}

export class Shape {
    _coordinates = [];
    _shape = [];
    _points = [];
    _segments = [];
    height = 0;

    constructor(
        coordinates,
        shape,
        height = 0
    ) {
        this._shape = shape
        this.height = height
        this.setCoordinates(coordinates);
    }

    toString() {
        let str = "";
        this._points.forEach((p) => {
            str += `${p.toString()} `;
        })
        return str
    }

    get visible()/*: boolean*/ {
        for (var i = 0; i < this.segments.length; i++) {
            if (this.segments[i].visible) return true;
        }
        return false;
    }

    get points()/*: Point[]*/ {
        return this._points;
    }

    get segments()/*: Segment[]*/ {
        return this._segments;
    }

    get coordinates() {
        return this._coordinates;
    }

    // based on https://stackoverflow.com/questions/217578/how-can-i-determine-whether-a-2d-point-is-within-a-polygon
    contains(p) {
        let contains = false;
        var minX = this.points[0].x, maxX = this.points[0].x;
        var minY = this.points[0].y, maxY = this.points[0].y;
        for (const q of this.points) {
            minX = Math.min(q.x, minX);
            maxX = Math.max(q.x, maxX);
            minY = Math.min(q.y, minY);
            maxY = Math.max(q.y, maxY);
        }

        if (p.x < minX || p.x > maxX || p.y < minY || p.y > maxY) {
            return false;
        }

        var i = 0, j = this.points.length - 1;
        for (i, j; i < this.points.length; j = i++) {
            if ((this.points[i].y > p.y) != (this.points[j].y > p.y) &&
                p.x < (this.points[j].x - this.points[i].x) * (p.y - this.points[i].y) / (this.points[j].y - this.points[i].y) + this.points[i].x) {
                contains = !contains;
            }
        }

        return contains;
    }

    minDistanceFromPoint(p) {
        if (this.contains(p)) {
            return 0;
        }
        let minDistance = 1000;
        for (const q of this.points) {
            let distance = Point.distanceBetweenPoints(p, q);
            if (distance < minDistance) {
                minDistance = distance;
            }
        }
        return minDistance;
    }

    setCoordinates(coordinates) {
        this._coordinates = coordinates;
        this._points = [];
        this._segments = [];
        if (this._coordinates == []) {
            return;
        }
        this._shape.forEach((currShapePoint, i) => {
            let j = i + 1;
            if (j >= this._shape.length) {
                return;
            }
            let nextShapePoint = this._shape[j]
            let point = Point.add(this._coordinates, currShapePoint);
            let nextPoint = Point.add(this._coordinates, nextShapePoint);
            let segment = new Segment(point, nextPoint, this);
            this._segments.push(segment);
            this._points.push(segment.p1, segment.p2);
        })
    }
}

export class Triangle extends Shape {
    constructor(
        points/*: Point[]*/,
    ) {
        if (points.length != 3) {
            throw new Error("Triangles MUST have exactly 3 points.");
        }
        super(points)
    }

    // https://www.geeksforgeeks.org/check-whether-a-given-point-lies-inside-a-triangle-or-not/
    contains(p/*: Point*/)/*: boolean*/ {
        const [a, b, c] = this.points;
        const AB = new Vector(a, b);
        const AC = new Vector(a, c);
        const signedArea = cross2D(AB, AC);

        const PA = new Vector(p, a);
        const PB = new Vector(p, b);
        const PC = new Vector(p, c);

        return (
            cross2D(PB, PC) / signedArea > 0 &&
            cross2D(PC, PA) / signedArea > 0 &&
            cross2D(PA, PB) / signedArea > 0
        );
    }
}

// From src/visibility.ts (deleted)
// Modified to return Segment instead of Point[]
export function getVisibleSegment(
    origin/*: Point*/,
    angle1/*: number*/,
    angle2/*: number*/,
    segment/*: Segment*/
)/*: Segment*/ {
    const p1 = origin;
    const p2 = new Point(origin.x + Math.cos(angle1), origin.y + Math.sin(angle1));
    const p3 = new Point(0, 0);
    const p4 = new Point(0, 0);
    if (segment) {
        p3.x = segment.p1.x;
        p3.y = segment.p1.y;
        p4.x = segment.p2.x;
        p4.y = segment.p2.y;
    } else {
        p3.x = origin.x + Math.cos(angle1) * 200;
        p3.y = origin.y + Math.sin(angle1) * 200;
        p4.x = origin.x + Math.cos(angle2) * 200;
        p4.y = origin.y + Math.sin(angle2) * 200;
    }

    const pBegin = lineIntersection(p3, p4, p1, p2);

    p2.x = origin.x + Math.cos(angle2);
    p2.y = origin.y + Math.sin(angle2);

    const pEnd = lineIntersection(p3, p4, p1, p2);

    let shape = null;
    if (segment) {
        shape = segment.shape;
    }

    if (!pBegin || !pEnd) {
        return null;
    }

    let visSegment = new Segment(pBegin, pEnd, shape);
    if (visSegment.length > EPSILON) {
        return visSegment;
    }

    return null;
}


export function getAngleSegment(
    origin/*: Point*/,
    angle1/*: number*/
)/*: Segment*/ {
    const p2 = new Point(origin.x + Math.cos(angle1) * 200, origin.y + Math.sin(angle1) * 200);

    return new Segment(origin, p2)
}

export function normalizedAngle(angle) {
    while (angle < 0) {
        angle += 2 * Math.PI;
    }
    while (angle > 2 * Math.PI) {
        angle -= 2 * Math.PI;
    }
    return angle;
}

export function inRegion(p0, leftSegment, rightSegment) {
    // Right of the left and left of the right.
    return behind(leftSegment, p0) || !behind(rightSegment, p0)
}

export class Isovist {
    /*public */segments/*: Segment[]*/ = [];
    /*public */shapes/*: Map(Shape:Segment[])*/ = new Map();

    // from src/endpoint-compare.ts
    _endpointCompare(pointA/*: EndPoint*/, pointB/*: EndPoint*/) {
        if (pointA.angle > pointB.angle) {
            return 1;
        }
        if (pointA.angle < pointB.angle) {
            return -1;
        }
        if (!pointA.beginsSegment && pointB.beginsSegment) {
            return 1;
        }
        if (pointA.beginsSegment && !pointB.beginsSegment) {
            return -1;
        }
        return 0;
    }

    /*
        shapes: list of shapes in coordinate system
        pov: x, y coordinates of pov
        angle: center of the viewing range
        range: +/- angle for viewing range
    */
    constructor(shapes/*: Shape[]*/, pov/*: Point*/, centerAngle = 0, viewRange = Math.PI / 4) {
        // from src/visibility.ts

        // sort shapes by height.
        // for each height, calculate the isovist (everything at that height and taller is included)
        // That way, the tallest object is defacto visible 
        // And at the next height the tallest can block shorter objects.
        // if we only have a few heights, this won't take much longer
        // theoretically we could do this up to N times. 
        // Now we have everything visible 
        // We can also see at what H an object is occluded should we decide to do partial visibility/track what is occluding what.
        // But for a naive attempt, let's just find the visible and worry about the smarter descs later.

        // Sort shapes by height and capture height indices.
        // height:index of first shape at or above height
        shapes.sort((a, b) => a.height - b.height);
        let heightChangeIdx = []
        let tallest = -1000
        for (const [i, shape] of shapes.entries()) {
            if (shape.height > tallest) {
                heightChangeIdx.push(i)
                tallest = shape.height
            }
        }
        for (const i of heightChangeIdx) {
            let shapesAtHeight = shapes.slice(i)

            let allSegments/*: Segment[]*/ = [];
            shapesAtHeight.forEach((n) => {
                allSegments.push(...n.segments);
            });

            let allEndPoints/*: EndPoint[]*/ = [];
            for (const segment of allSegments) {
                segment.positionWithRespectTo(pov)
                allEndPoints.push(segment.p1, segment.p2);
            }

            const openSegments = [];
            let beginAngle = 0;

            // Sort endpoints by angle.
            allEndPoints.sort(this._endpointCompare);

            for (let pass = 0; pass < 2; pass += 1) {
                for (const endpoint of allEndPoints) {
                    const openSegment = openSegments[0];

                    if (endpoint.beginsSegment) {
                        let index = 0;
                        let segment = openSegments[index];
                        // Until a segment is found that is behind the endpoint segment.
                        while (segment && segmentInFrontOf(endpoint.segment, segment, pov)) {
                            index += 1;
                            segment = openSegments[index];
                        }

                        if (!segment) {
                            // The endpoint segment is the furthest back; put it at the end.
                            openSegments.push(endpoint.segment);
                        } else {
                            // Place the endpoint segment so it is in front of everything after it in the list.
                            openSegments.splice(index, 0, endpoint.segment);
                        }
                    } else {
                        // Remove the segment from the list (we've hit the end of the segment)
                        const index = openSegments.indexOf(endpoint.segment);
                        if (index > -1) { openSegments.splice(index, 1); }
                        if (endpoint.segment.transparent) {
                            beginAngle = endpoint.segment.beginPoint.angle;
                        }
                    }

                    // If there is a new frontmost segment
                    if (openSegment !== openSegments[0]) {
                        let endAngle = endpoint.angle;
                        if (pass === 1) {
                            let forward = getAngleSegment(pov, centerAngle)
                            let back = getAngleSegment(pov, centerAngle + Math.PI);
                            let right = getAngleSegment(pov, centerAngle + Math.PI / 2)
                            let left = getAngleSegment(pov, centerAngle - Math.PI / 2);
                            let plusRange = centerAngle + viewRange
                            let plusRangeForward = getAngleSegment(pov, plusRange)
                            let plusBack = getAngleSegment(pov, centerAngle + Math.PI / 2 + viewRange);
                            let minusRange = centerAngle - viewRange;
                            let minusRangeForward = getAngleSegment(pov, minusRange)
                            let minusBack = getAngleSegment(pov, centerAngle - Math.PI / 2 - viewRange);

                            let p1 = getAngleSegment(pov, beginAngle).p2
                            let p2 = getAngleSegment(pov, endAngle).p2

                            if (!leftOf(right, p1) && !leftOf(right, p2)) {
                                // Out of range (both behind view angle)
                            } else if (
                                (!leftOf(right, p1) && (!leftOf(plusRangeForward, p2) || leftOf(minusRangeForward, p2))) ||
                                (!leftOf(right, p2) && (!leftOf(plusRangeForward, p1) || leftOf(minusRangeForward, p1)))
                            ) {
                                // Out of range (behind and to one side)
                            } else if (
                                (!leftOf(plusRangeForward, p1) && !leftOf(plusRangeForward, p2)) ||
                                (leftOf(minusRangeForward, p1) && leftOf(minusRangeForward, p2))
                            ) {
                                // Out of range (to one side)
                            }
                            else {
                                // Move endpoints to within range if necessary.
                                if (!leftOf(plusRangeForward, p1) || leftOf(minusRangeForward, p1)) {
                                    // p1 out of range; clip.
                                    if (!leftOf(forward, p1)) {
                                        // out of range on plus side; clip to plus
                                        beginAngle = plusRange
                                    }
                                    else {
                                        // out of range on minus side; clip to minus
                                        beginAngle = minusRange
                                    }
                                }
                                if (!leftOf(plusRangeForward, p2) || leftOf(minusRangeForward, p2)) {
                                    // p2 out of range; clip.
                                    if (!leftOf(forward, p2)) {
                                        // out of range on plus side; clip to plus
                                        endAngle = plusRange
                                    }
                                    else {
                                        // out of range on minus side; clip to minus
                                        endAngle = minusRange
                                    }
                                }

                                const visSegment = getVisibleSegment(pov, beginAngle, endAngle, openSegment);
                                if (visSegment) {
                                    this.segments.push(visSegment);
                                    let shape = visSegment.shape;
                                    if (shape) {
                                        let shapeSegments = this.shapes.get(shape);
                                        if (shapeSegments == undefined) {
                                            shapeSegments = [];
                                        }
                                        shapeSegments.push(visSegment);
                                        this.shapes.set(shape, shapeSegments);
                                    }
                                }
                            }
                        }
                        beginAngle = endAngle;
                    }
                }
            }
        }
    }

    containsPoint(p/*: Point*/)/*: boolean*/ {
        for (var i = 0; i < this.triangles.length; i++) {
            if (this.triangles[i].contains(p)) return true;
        }
        return false;
    }

    containsShape(s/*: Shape*/)/*: boolean*/ {
        for (p of s.points) {
            if (!this.containsPoint(p)) {
                return false;
            }
        }

        return true;
    }
}

export let isovist = function (vorple, showMap = false) {
    return {
        vorple: vorple,
        lastStep: "FORWARD",
        nouns: new Map(),
        perspectives: new Map(),
        showMap: showMap,
        loadWorld: function () {
            this.nouns = new Map(this.world.nouns.map(
                nounJSON => [nounJSON.name, new Shape(new Point(...nounJSON.coordinates), pointsFromArray(nounJSON.shape), nounJSON.height)]
            ))
            let perspectives = this.world.perspectives;
            perspectives.forEach(p => {
                p.pov = new Point(p.pov[0], p.pov[1]);
                p.regions = new Map(p.regions.map(region => [region.name, region]));
            })
            this.perspectives = new Map(perspectives.map(perspective => [perspective.name, perspective]))
            this.setShowMap(this.showMap)
            this.perspectives.forEach(p => this.updateVisibility(p.name))

            let outputWindow = document.getElementById("window0");
            let marker = document.createElement("span");
            marker.setAttribute("id", "top");
            marker.textContent = " ";
            outputWindow.prepend(marker);
        },
        setShowMap: function (show = false) {
            this.showMap = show;
        },
        updateVisibility: function (perspectiveName) {
            let perspective = this.perspectives.get(perspectiveName);
            if (perspective == undefined) return false;
            perspective.regions.forEach(r => {
                r.isovist = new Isovist([...this.nouns.values()], perspective.pov, perspective.facing + r.angle, r.range)
            });

            // Allow each noun to only be in the region that it is the most visible in.
            this.nouns.forEach(n => {
                let regionLengths = new Map();
                let longest = 0;
                perspective.regions.forEach(r => {
                    let shapeVisibility = r.isovist.shapes.get(n);
                    let combinedLength = 0;
                    if (shapeVisibility != undefined) {
                        combinedLength = shapeVisibility.reduce((partialLength, s) => partialLength + s.length, 0);
                    }
                    regionLengths.set(r, combinedLength);
                    if (combinedLength > longest) {
                        longest = combinedLength;
                    }
                });
                for (let [region, length] of regionLengths.entries()) {
                    if (length != longest) {
                        region.isovist.shapes.delete(n);
                    }
                }
            });

            if (this.showMap) {
                this.updateMap();
            }
        },
        updateMap: function () {
            const svgns = "http://www.w3.org/2000/svg";
            let map = document.getElementsByClassName("map")[0]
            map.innerHTML = "";
            let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            map.appendChild(svg);

            for (let [name, shape] of this.nouns.entries()) {
                let polygon = document.createElementNS(svgns, "polygon")
                if (shape.coordinates == []) {
                    continue;
                }
                polygon.setAttribute("points", shape.toString())
                let polyTitle = document.createElementNS(svgns, "title")
                polyTitle.textContent = name
                polygon.appendChild(polyTitle)
                if (shape.visible) {
                    polygon.setAttribute("class", "visible")
                }
                else {
                    polygon.setAttribute("class", "invisible")
                }
                svg.appendChild(polygon)
            }
            this.perspectives.forEach(p => {
                {
                    p.regions.forEach(r => {
                        let centerAngle = p.facing + r.angle;
                        let minAngle = centerAngle - r.range;
                        let maxAngle = centerAngle + r.range;
                        let visSegment = getVisibleSegment(p.pov, minAngle, maxAngle);
                        let polygon = document.createElementNS(svgns, "polygon");
                        polygon.setAttribute("points", `${visSegment.toString()} ${p.pov.toString()}`);
                        polygon.setAttribute("class", `visTriangle ${r.name}`);
                        svg.appendChild(polygon);

                        r.isovist.segments.forEach(s => {
                            let polygon = document.createElementNS(svgns, "polygon");
                            polygon.setAttribute("points", `${s.toString()} ${p.pov.toString()}`);
                            polygon.setAttribute("class", `isovist ${r.name}`);
                            svg.appendChild(polygon);
                        })
                    })

                    let povCircle = document.createElementNS(svgns, "circle");
                    povCircle.setAttribute("cx", p.pov.x);
                    povCircle.setAttribute("cy", p.pov.y);
                    povCircle.setAttribute("r", "3");
                    povCircle.setAttribute("class", "pov");
                    let povTitle = document.createElementNS(svgns, "title");
                    povTitle.textContent = "pov";
                    povCircle.appendChild(povTitle);
                    svg.appendChild(povCircle);
                }
            });
        },
        getVisibility: function (perspectiveName/*: string*/, regionName/*: string*/, nounName/*: string*/)/*: boolean*/ {
            let shape = this.nouns.get(nounName);
            let perspective = this.perspectives.get(perspectiveName)
            if (perspective == undefined) return false;
            let region = perspective.regions.get(regionName)
            if (region == undefined) return false;
            if (region.isovist.shapes.get(shape) != undefined) {
                return true;
            }
            return false;

        },
        getDistance: function (perspectiveName/*: string*/, nounName/*: string*/)/*: boolean*/ {
            let shape = this.nouns.get(nounName);
            let perspective = this.perspectives.get(perspectiveName)
            if (perspective == undefined) return false;
            let pov = perspective.pov

            return shape.minDistanceFromPoint(pov);
        },
        step: function (perspectiveName, degreesFromFacing = 0, steps/*: number*/ = 1) {
            let perspective = this.perspectives.get(perspectiveName);
            if (perspective == undefined) return false;
            let degrees = perspective.facing + degreesFromFacing;
            perspective.pov.x += Math.cos(degrees) * perspective.stepSize * steps;
            perspective.pov.y += Math.sin(degrees) * perspective.stepSize * steps;

            this.updateVisibility(perspectiveName);
        },
        stepForward: function (perspectiveName, steps/*: number*/ = 1) {
            if (this.step(perspectiveName, 0, steps)) {
                this.lastStep = "FORWARD";
            }
        },
        stepBack: function (perspectiveName, steps/*: number*/ = 1) {
            if (this.step(perspectiveName, Math.PI, steps)) {
                this.lastStep = "BACK";
            }
        },
        stepRight: function (perspectiveName, steps/*: number*/ = 1) {
            if (this.step(perspectiveName, Math.PI / 2, steps)) {
                this.lastStep = "RIGHT";
            }
        },
        stepLeft: function (perspectiveName, steps/*: number*/ = 1) {
            if (this.step(perspectiveName, -Math.PI / 2, steps)) {
                this.lastStep = "LEFT";
            }
        },
        reverse: function (perspectiveName, steps = 1) {
            if (this.lastStep == "FORWARD") {
                this.stepBack(perspectiveName, steps);
            } else if (this.lastStep == "BACK") {
                this.stepForward(perspectiveName, steps);
            } else if (this.lastStep == "LEFT") {
                this.stepRight(perspectiveName, steps);
            } else if (this.lastStep == "RIGHT") {
                this.stepLeft(perspectiveName, steps);
            }
        },
        turnRight: function (perspectiveName, degrees = Math.PI / 2) {
            let perspective = this.perspectives.get(perspectiveName)
            if (perspective == undefined) return false;
            perspective.facing += degrees
            this.updateVisibility(perspectiveName);
        },
        turnLeft: function (perspectiveName, degrees = Math.PI / 2) {
            let perspective = this.perspectives.get(perspectiveName)
            if (perspective == undefined) return false;
            perspective.facing -= degrees
            this.updateVisibility(perspectiveName);
        },
        setText: function (className, text) {
            let elem = document.getElementsByClassName(className)[0];
            elem.textContent = text;
        },
        contains: function (containerName, nounOrPerspectiveName) {
            let container = this.nouns.get(containerName)
            if (container == undefined) return false;
            let perspective = this.perspectives.get(nounOrPerspectiveName);
            if (perspective != undefined) {
                if (container.containsPoint(perspective.pov)) {
                    return true;
                }
                return false;
            }
            let noun = this.nouns.get(nounOrPerspectiveName)
            if (noun != undefined) {
                if (container.containsShape(noun)) {
                    return true;
                }
                return false;
            }

            return false;
        },
        command: function (command) {
            this.vorple.prompt.queueCommand(command);
        },
        clear: function () {
            let outputWindow = document.getElementById("window0");
            let child = outputWindow.lastElementChild;
            while (child.id != "top") {
                outputWindow.removeChild(child);
                child = outputWindow.lastElementChild;
            }
        },
        take: function (perspectiveName, nounName) {
            let perspective = this.perspectives.get(perspectiveName);
            if (perspective == undefined) return false;
            let noun = this.nouns.get(nounName);
            if (noun == undefined) return false;
            noun.setCoordinates([]);
            this.updateVisibility(perspectiveName);
            return true;
        }
    }
};
