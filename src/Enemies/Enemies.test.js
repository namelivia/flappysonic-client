import Enemies, { NUM_ENEMIES } from './Enemies'
import { Stage } from 'createjs'
import { STATE_ALIVE, STATE_DEAD } from '../Level/Level'
jest.mock('../Factory/Factory')
import {
    enemy as enemyFactory,
    hasReachedEndMock,
    hasReachedSonicMock,
    rearrangeMock,
    enemyTickMock,
} from '../Factory/Factory'

beforeEach(() => {
    jest.clearAllMocks()
})

test('should initialize enemies and rearrange enemies when creating', () => {
    //spriteSheetConstructorMock.mockImplementation(() => 'spriteSheet') TODO I havent been able to do this
    initializeEnemies()
    expect(enemyFactory).toHaveBeenCalledTimes(NUM_ENEMIES)
})

test('should rearrange all enemies when rearranging', () => {
    const enemies = initializeEnemies()
    expect(rearrangeMock).toHaveBeenCalledTimes(NUM_ENEMIES)
    enemies.rearrange()
    expect(rearrangeMock).toHaveBeenCalledTimes(NUM_ENEMIES * 2)
})

test('should update enemies when alive', () => {
    const enemies = initializeEnemies()
    hasReachedEndMock.mockReturnValueOnce(false)
    enemies.tick(STATE_ALIVE)
    expect(hasReachedEndMock).toHaveBeenCalledTimes(1)
    expect(enemyTickMock).toHaveBeenCalledTimes(NUM_ENEMIES)
})

test('should rearrange enemies if they reach the end when updating', () => {
    const enemies = initializeEnemies()
    expect(rearrangeMock).toHaveBeenCalledTimes(NUM_ENEMIES)
    hasReachedEndMock.mockReturnValueOnce(true)
    enemies.tick(STATE_ALIVE)
    expect(hasReachedEndMock).toHaveBeenCalledTimes(1)
    expect(enemyTickMock).toHaveBeenCalledTimes(NUM_ENEMIES)
    expect(rearrangeMock).toHaveBeenCalledTimes(NUM_ENEMIES * 2)
})

test('should not update enemies when dead', () => {
    const enemies = initializeEnemies()
    enemies.tick(STATE_DEAD)
    expect(enemyTickMock).toHaveBeenCalledTimes(0)
})

test('should get if enemies are surpassed', () => {
    const enemies = initializeEnemies()
    hasReachedSonicMock.mockReturnValueOnce(false)
    var result = enemies.areSurpassed()
    expect(hasReachedSonicMock).toHaveBeenCalledTimes(1)
    expect(result).toBe(false)

    hasReachedSonicMock.mockReturnValueOnce(true)
    result = enemies.areSurpassed()
    expect(hasReachedSonicMock).toHaveBeenCalledTimes(2)
    expect(result).toBe(true)
})

const initializeEnemies = () => {
    const stage = new Stage()
    return new Enemies(stage, 'spritesheet')
}
