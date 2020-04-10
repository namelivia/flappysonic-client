import Collision from '../Collision/Collision'
export default class CollisionManager {
    constructor(sonic, enemies) {
        this.collisionManager = new Collision()
        this.sonic = sonic
        this.enemies = enemies
    }

    thereIsACollision() {
        return this.enemies.areColliding(this.collisionManager, this.sonic)
    }
}
