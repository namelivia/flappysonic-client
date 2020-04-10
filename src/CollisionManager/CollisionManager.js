import Collision from '../Collision/Collision'
export default class CollisionManager {
    constructor(sonic, enemies) {
        this.collisionManager = new Collision()
        this.sonic = sonic
        this.enemies = enemies
    }

    thereIsACollision() {
        //TODO: Restructure this
        /*
        for (var index = 0; index < this.NUM_ENEMIES; index++) {
            if (this.collisionManager.checkPixelCollision(sonic, this.enemies[index])) {
                return true
            }
        }
        return false
        */
    }
}
