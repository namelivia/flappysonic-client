import CollisionManager from './CollisionManager.js'
jest.mock('../Factory/Factory')
import {
    collision as collisionFactory,
    collisionMock,
    enemies as enemiesFactory,
    sonic as sonicFactory,
    areCollidingMock,
} from '../Factory/Factory'

test('should check for collision between the enemies and sonic', () => {
    const sonic = sonicFactory()
    const enemies = enemiesFactory()
    const manager = new CollisionManager(sonic, enemies)
    expect(collisionFactory).toHaveBeenCalledTimes(1)
    expect(collisionFactory).toHaveBeenCalledWith()

    areCollidingMock.mockReturnValueOnce(false)
    var isCollision = manager.thereIsACollision()
    expect(isCollision).toBe(false)

    areCollidingMock.mockReturnValueOnce(true)
    isCollision = manager.thereIsACollision()
    expect(isCollision).toBe(true)
    expect(areCollidingMock).toHaveBeenCalledTimes(2)
    expect(areCollidingMock).toHaveBeenCalledWith(collisionMock, sonic)
})
