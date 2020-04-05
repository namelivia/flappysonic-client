import { Bitmap } from 'createjs'
export default class Floor extends Bitmap {
    constructor(floorImage, x) {
        super(floorImage)
        this.x = x
        this.y = 192
    }

    tick() {
        this.x -= 2
        if (this.x == -674) {
            this.x = 674
        }
    }
}
