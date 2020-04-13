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
}
