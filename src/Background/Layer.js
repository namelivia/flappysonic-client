import { Bitmap } from 'createjs'
export default class Layer extends Bitmap {
    constructor(image, x, y, speed, limit) {
        super(image)
        this.x = x
        this.y = y
        this.speed = speed
        this.limit = limit
    }

    tick() {
        this.x -= this.speed
        if (this.x === -this.limit) {
            this.x = this.limit
        }
    }
}
