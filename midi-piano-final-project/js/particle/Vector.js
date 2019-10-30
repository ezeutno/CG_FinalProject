class Vector {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
    }

    mag() {
        return Math.hypot(this.x, this.y);
    }

    static sub(v1, v2) {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }

    static dist(v1, v2) {
        const sub = Vector.sub(v1, v2);
        
        return sub.mag();
    }
}