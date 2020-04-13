import { collision as collisionFactory } from '../Factory/Factory'
export default class CollisionManager {
    constructor(sonic, enemies) {
        this.collisionManager = collisionFactory()
        this.sonic = sonic
        this.enemies = enemies
    }

    thereIsACollision() {
        return this.enemies.areColliding(this.collisionManager, this.sonic)
    }
}
