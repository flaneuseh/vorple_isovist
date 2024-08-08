const EPSILON = .0001;

class Point {
    /*public */x/*: number*/;
    /*public */y/*: number*/;

    constructor(
      /*public */x/*: number*/,
      /*public */y/*: number*/,
    ) {
        this.x = x;
        this.y = y;
    }
}

function lineIntersection(
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

    return new Point(
        point1.x + pct * (point2.x - point1.x),
        point1.y + pct * (point2.y - point1.y),
    );
}


class EndPoint extends Point {
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


function pointsFromArray(points/*: number[][]*/)/*: Point[]*/ {
    return points.map(point => new Point(point[0], point[1]))
}

class Vector {
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

function cross2D(v1/*: Vector*/, v2/*: Vector*/)/*: number*/ {
    return (v1.x * v2.y) - (v1.y * v2.x);
}

class Segment {
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

    get length()/*: number*/ {
        const len = Math.sqrt(Math.pow(this.p1.x - this.p2.x, 2)) + (Math.pow(this.p1.y - this.p2.y, 2))
        return len
    }

    addVisiblePortion(visiblePortion/*: Segment*/) {
        this._visiblePortions.push(structuredClone(visiblePortion));
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
}


// Is p left of segment?
leftOf = (segment/*: Segment*/, p/*: Point*/) => {
    const vS = segment.vector;
    const vSP = new Vector(segment.p1, p);
    const cross = cross2D(vS, vSP);
    return cross < 0;
};

interpolate = (PA/*: Point*/, PB/*: Point*/, f/*: number*/) => {
    return new Point(
        PA.x * (1 - f) + PB.x * f,
        PA.y * (1 - f) + PB.y * f,
    );
};

// Is A in front of B?
const segmentInFrontOf = (segmentA/*: Segment*/, segmentB/*: Segment*/, pov/*: Point*/) => {
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
};

class Shape {
    /*private */_segments/*: Segment[]*/ = [];
    /*private */_points/*: EndPoint[]*/ = [];

    constructor(
        points/*: Point[]*/,
    ) {
        points.forEach((p, i) => {
            let j = i + 1;
            if (j >= points.length) {
                j = 0;
            }
            let segment = new Segment(p, points[j], this);
            this._segments.push(segment);
            this._points.push(segment.p1, segment.p2);
        })
    }

    toString() {
        let str = "";
        this._points.forEach((p) => {
            str += `${p.x},${p.y} `;
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
}

class Triangle extends Shape {
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
// Modified to return Triangle instead of Point[]
function getVisibleTriangle(
    origin/*: Point*/,
    angle1/*: number*/,
    angle2/*: number*/,
    segment/*: Segment*/
)/*: Triangle*/ {
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

    if (segment) {
        let intersectSegment/*: Segment | null*/ = new Segment(pBegin, pEnd);
        if (intersectSegment.length > EPSILON) {
            segment.addVisiblePortion(intersectSegment);
        }
    }

    return new Triangle([origin, pBegin, pEnd]);
}

class Isovist {
    /*public */triangles/*: Triangle[]*/ = [];

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

    constructor(pov/*: Point*/, shapes/*: Shape[]*/) {
        // from src/visibility.ts
        let allSegments/*: Segment[]*/ = [];
        shapes.forEach((n) => {
            allSegments.push(...n.segments);
        });

        let allEndPoints/*: EndPoint[]*/ = [];
        for (const segment of allSegments) {
            segment.positionWithRespectTo(pov)
            allEndPoints.push(segment.p1, segment.p2);
        }

        const openSegments = [];
        const visTriangles = [];
        let beginAngle = 0;

        allEndPoints.sort(this._endpointCompare);

        for (let pass = 0; pass < 2; pass += 1) {
            for (const endpoint of allEndPoints) {
                const openSegment = openSegments[0];

                if (endpoint.beginsSegment) {
                    let index = 0;
                    let segment = openSegments[index];
                    while (segment && segmentInFrontOf(endpoint.segment, segment, pov)) {
                        index += 1;
                        segment = openSegments[index];
                    }

                    if (!segment) {
                        openSegments.push(endpoint.segment);
                    } else {
                        openSegments.splice(index, 0, endpoint.segment);
                    }
                } else {
                    const index = openSegments.indexOf(endpoint.segment);
                    if (index > -1) { openSegments.splice(index, 1); }
                }

                if (openSegment !== openSegments[0]) {
                    if (pass === 1) {
                        const visTriangle = getVisibleTriangle(pov, beginAngle, endpoint.angle, openSegment);
                        visTriangles.push(visTriangle);
                    }
                    beginAngle = endpoint.angle;
                }
            }
        }

        this.triangles = visTriangles;
    }

    contains(p/*: Point*/)/*: boolean*/ {
        for (var i = 0; i < this.triangles.length; i++) {
            if (this.triangles[i].contains(p)) return true;
        }
        return false;
    }
}
