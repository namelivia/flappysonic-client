import { Container } from 'createjs'
import Layer from './Layer'
import { STATE_ALIVE } from '../Level/Level'
export default class Background extends Container {
    constructor(cloudsImage, floorImage) {
        super()
        this.setup(cloudsImage, floorImage)
    }

    setup(cloudsImage, floorImage) {
        this.floor1 = new Layer(floorImage, 0, 192, 2, 674)
        this.floor2 = new Layer(floorImage, 674, 192, 2, 674)
        this.clouds1 = new Layer(cloudsImage, 0, 0, 1, 640)
        this.clouds2 = new Layer(cloudsImage, 640, 0, 1, 640)

        this.addChild(this.floor1, this.floor2, this.clouds1, this.clouds2)
    }

    tick(state) {
        if (state == STATE_ALIVE) {
            this.floor1.tick()
            this.floor2.tick()
            this.clouds1.tick()
            this.clouds2.tick()
        }
    }
}
