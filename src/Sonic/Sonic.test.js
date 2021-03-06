import Sonic, { SpriteSheetData, HurtSpriteSheetData } from './Sonic'
import { STATE_DEAD, STATE_ALIVE } from '../Level/Level.js'
import {
    mockAddChild,
    mockedContainerConstructor,
    mockedSpriteConstructor,
    spriteSheetConstructorMock,
    gotoAndPlayMock,
} from 'createjs'

beforeEach(() => {
    jest.clearAllMocks()
})

test('sprites are initialized when initializing sonic', () => {
    //spriteSheetConstructorMock.mockImplementation(() => 'spriteSheet') TODO I havent been able to do this
    const sonic = new Sonic('spritesheet')
    expect(mockedContainerConstructor).toHaveBeenCalledTimes(1)
    expect(mockedContainerConstructor).toHaveBeenCalledWith()
    expect(spriteSheetConstructorMock).toHaveBeenCalledTimes(1)
    expect(spriteSheetConstructorMock).toHaveBeenCalledWith(SpriteSheetData)
    expect(mockedSpriteConstructor).toHaveBeenCalledTimes(1)
    expect(mockedSpriteConstructor).toHaveBeenCalledWith({}, 'straight')
    expect(mockAddChild).toHaveBeenCalledTimes(1)
    expect(sonic.jump).toBe(0)
})

test('updating data while jumping up', () => {
    const sonic = initializeSonic(20, 10, 16)
    updateSonic(sonic, STATE_ALIVE)
    assertSonicStatus(sonic, 20, 4, 14)
    expect(sonic.sprite.x).toBe(20)
    expect(sonic.sprite.y).toBe(4)
    expect(gotoAndPlayMock).toHaveBeenCalledTimes(1)
    expect(gotoAndPlayMock).toHaveBeenCalledWith('up')
})

test('updating data while going straight', () => {
    const sonic = initializeSonic(20, 10, 2)
    updateSonic(sonic, STATE_ALIVE)
    assertSonicStatus(sonic, 20, 18, 0)
    expect(gotoAndPlayMock).toHaveBeenCalledTimes(1)
    expect(gotoAndPlayMock).toHaveBeenCalledWith('straight')
})

test('updating data while going down', () => {
    const sonic = initializeSonic(20, 10, 0)
    updateSonic(sonic, STATE_ALIVE)
    assertSonicStatus(sonic, 20, 20, 0)
    expect(gotoAndPlayMock).toHaveBeenCalledTimes(1)
    expect(gotoAndPlayMock).toHaveBeenCalledWith('down')
})

test('should be out of bounds', () => {
    const sonic = initializeSonic(20, -70, 0)
    expect(sonic.isOutOfBounds()).toBe(true)

    const sonic2 = initializeSonic(20, 290, 0)
    expect(sonic2.isOutOfBounds()).toBe(true)

    const sonic3 = initializeSonic(20, 100, 0)
    expect(sonic3.isOutOfBounds()).toBe(false)
})

test('updating data while dead', () => {
    const sonic = initializeSonic(20, 10, 0)
    sonic.die('spritesheet')
    updateSonic(sonic, STATE_DEAD)
    assertSonicStatus(sonic, 26, 16, 0)
    expect(gotoAndPlayMock).toHaveBeenCalledTimes(1)
    expect(gotoAndPlayMock).toHaveBeenCalledWith('dead')
    expect(spriteSheetConstructorMock).toHaveBeenCalledTimes(2)
    expect(spriteSheetConstructorMock).toHaveBeenCalledWith(HurtSpriteSheetData)
    expect(mockedSpriteConstructor).toHaveBeenCalledTimes(2)
    expect(mockedSpriteConstructor).toHaveBeenCalledWith({}, 'hurt')
    expect(mockAddChild).toHaveBeenCalledTimes(2)
})

test('jumping resets the jump to 20', () => {
    const sonic = new Sonic('spritesheet')
    sonic.jump = 5
    sonic.doJump()
    expect(sonic.jump).toBe(20)
})

const initializeSonic = (x, y, jump) => {
    const sonic = new Sonic('spritesheet')
    sonic.sprite.x = x
    sonic.sprite.y = y
    sonic.jump = jump
    return sonic
}

const assertSonicStatus = (sonic, x, y, jump) => {
    expect(sonic.sprite.x).toBe(x)
    expect(sonic.sprite.y).toBe(y)
    expect(sonic.jump).toBe(jump)
}

const updateSonic = (sonic, currentStatus) => {
    sonic.tick(currentStatus)
}
