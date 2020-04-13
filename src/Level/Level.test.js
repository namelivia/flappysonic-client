import Level from './Level'
import { stopMock, playMock } from 'createjs'
jest.mock('../Factory/Factory')
import {
    preloader as preloaderFactory,
    isOutOfBoundsMock,
    thereIsACollisionMock,
    dieMock,
} from '../Factory/Factory'

beforeEach(() => {
    jest.clearAllMocks()
})

test('should start all entities when starting level', () => {
    const level = initializeLevel()
    level.start()
})

test('should update all entities when updating level', () => {
    const level = initializeLevel()
    level.start()
    level.tick()
})

test('should not kill player if is not colliding and in the screen', () => {
    thereIsACollisionMock.mockReturnValue(false)
    isOutOfBoundsMock.mockReturnValue(false)
    const level = initializeLevel()
    level.start()
    expect(level._shouldKillPlayer()).toBe(false)
})

test('should kill player when collides enemies', () => {
    thereIsACollisionMock.mockReturnValue(true)
    isOutOfBoundsMock.mockReturnValue(false)
    const level = initializeLevel()
    level.start()
    expect(level._shouldKillPlayer()).toBe(true)
})

test('should kill player when its out of bounds', () => {
    thereIsACollisionMock.mockReturnValue(false)
    isOutOfBoundsMock.mockReturnValue(true)
    const level = initializeLevel()
    level.start()
    expect(level._shouldKillPlayer()).toBe(true)
})

test('should kill player and play miss music', () => {
    const level = initializeLevel()
    level.start()
    expect(playMock).toHaveBeenCalledTimes(1)
    level._killPlayer()
    expect(dieMock).toHaveBeenCalledTimes(1)
    expect(stopMock).toHaveBeenCalledTimes(1)
    expect(playMock).toHaveBeenCalledTimes(2)
})

const initializeLevel = () => {
    const onScore = () => {}
    const onDie = () => {}
    const canvas = document.createElement('canvas')
    const preloader = preloaderFactory()
    return new Level(canvas, preloader, onScore, onDie)
}
