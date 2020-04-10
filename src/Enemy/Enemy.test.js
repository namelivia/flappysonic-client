import Enemy, { SpriteSheetData } from './Enemy'
import {
    //mockAddChild,
    mockedContainerConstructor,
    mockedSpriteConstructor,
    spriteSheetConstructorMock,
    Stage,
} from 'createjs'

beforeEach(() => {
    jest.clearAllMocks()
})

test('sprites are initialized when initializing enemies', () => {
    //spriteSheetConstructorMock.mockImplementation(() => 'spriteSheet') TODO I havent been able to do this
    const enemy = initializeEnemy(20, 10)
    expect(mockedContainerConstructor).toHaveBeenCalledTimes(1)
    expect(mockedContainerConstructor).toHaveBeenCalledWith()
    expect(spriteSheetConstructorMock).toHaveBeenCalledTimes(1)
    expect(spriteSheetConstructorMock).toHaveBeenCalledWith(SpriteSheetData)
    expect(mockedSpriteConstructor).toHaveBeenCalledTimes(1)
    expect(mockedSpriteConstructor).toHaveBeenCalledWith({}, 'stay')
    //expect(mockAddChild).toHaveBeenCalledTimes(1)
})

test('should advance when updating', () => {
    const enemy = initializeEnemy(20, 10)
    updateEnemy(enemy)
    assertEnemyStatus(enemy, 14, 10)
})

test('should reach end at -60', () => {
    const enemy = initializeEnemy(-100, 10)
    expect(enemy.hasReachedEnd()).toBe(true)

    const enemy2 = initializeEnemy(100, 10)
    expect(enemy2.hasReachedEnd()).toBe(false)
})

test('should reposition when rearranging', () => {
    const enemy = initializeEnemy(-100, 10)
    enemy.rearrange(2, 1)
    assertEnemyStatus(enemy, 350, 192)

    const enemy2 = initializeEnemy(20, 5)
    enemy2.rearrange(4, 2)
    assertEnemyStatus(enemy2, 350, 292)
})

test('should reach sonic at -20', () => {
    const enemy = initializeEnemy(20, 10)
    expect(enemy.hasReachedSonic()).toBe(true)

    const enemy2 = initializeEnemy(19, 10)
    expect(enemy2.hasReachedSonic()).toBe(false)
})

const initializeEnemy = (x, y) => {
    const stage = new Stage()
    const enemy = new Enemy(stage, 'spritesheet')
    enemy.sprite.x = x
    enemy.sprite.y = y
    return enemy
}

const assertEnemyStatus = (enemy, x, y) => {
    expect(enemy.sprite.x).toBe(x)
    expect(enemy.sprite.y).toBe(y)
}

const updateEnemy = enemy => {
    enemy.tick()
}
