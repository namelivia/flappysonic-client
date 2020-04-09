import { Container } from 'createjs'
import Floor from './Floor'
import Clouds from './Clouds'
import { STATE_ALIVE } from '../Level/Level.js'
export default class Scenario extends Container {
    constructor(cloudsImage, floorImage) {
        super()
        this.setup(cloudsImage, floorImage)
    }

    setup(cloudsImage, floorImage) {
        this.floor1 = new Floor(floorImage, 0)
        this.floor2 = new Floor(floorImage, 674)
        this.clouds1 = new Clouds(cloudsImage, 0)
        this.clouds2 = new Clouds(cloudsImage, 640)

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
