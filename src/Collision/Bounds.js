export default class Bounds {
    constructor() {
        this.x = Infinity
        this.y = Infinity
        this.x2 = -Infinity
        this.y2 = -Infinity
        this.width = 0
        this.height = 0
    }

    _replaceInfinityWithZero(bound) {
        if (bound == Infinity) {
            return 0
        }
        return bound
    }

    replaceInfinitiesWithZeroes() {
        this.x = this._replaceInfinityWithZero(this.x)
        this.y = this._replaceInfinityWithZero(this.y)
        this.x2 = this._replaceInfinityWithZero(this.x2)
        this.y2 = this._replaceInfinityWithZero(this.y2)
    }

    setX(x) {
        this.x = x
    }

    setRegX(regX) {
        this.regX = regX
    }

    setRegY(regY) {
        this.regY = regY
    }

    setX2(x2) {
        this.x2 = x2
    }

    setY(y) {
        this.y = y
    }

    setY2(y2) {
        this.y2 = y2
    }
}
