import { enemy as enemyFactory } from '../Factory/Factory'
import { STATE_ALIVE } from '../Level/Level'

export default class Enemies {
    NUM_ENEMIES = 4
    enemies = []
    constructor(stage, spritesheet) {
        for (var index = 0; index < this.NUM_ENEMIES; index++) {
            this.enemies[index] = enemyFactory(stage, spritesheet)
        }
        this.rearrange()
    }

    _getNewHole() {
        return Math.floor(Math.random() * (this.NUM_ENEMIES + 1) - 1)
    }

    rearrange() {
        var hole = this._getNewHole()
        for (var index = 0; index < this.NUM_ENEMIES; index++) {
            this.enemies[index].rearrange(index, hole)
        }
    }

    tick(state) {
        if (state === STATE_ALIVE) {
            if (this.enemies[0].hasReachedEnd()) {
                this.rearrange()
            }
            for (var index = 0; index < this.NUM_ENEMIES; index++) {
                this.enemies[index].tick()
            }
        }
    }

    areSurpassed() {
        return this.enemies[0].hasReachedSonic()
    }

    areColliding(collisionManager, sonic) {
        for (var index = 0; index < this.NUM_ENEMIES; index++) {
            if (
                collisionManager.checkPixelCollision(
                    sonic.sprite,
                    this.enemies[index].sprite
                )
            ) {
                return true
            }
        }
        return false
    }
}
