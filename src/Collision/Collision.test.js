import Collision from './Collision'
import { Bitmap } from 'createjs'
jest.mock('../Factory/Factory')
import { canvas as canvasFactory, saveContextMock } from '../Factory/Factory'

beforeEach(() => {
    jest.clearAllMocks()
})

test('should initialize properly', () => {
    //spriteSheetConstructorMock.mockImplementation(() => 'spriteSheet') TODO I havent been able to do this
    initializeCollision()
    expect(canvasFactory).toHaveBeenCalledTimes(2)
    expect(saveContextMock).toHaveBeenCalledTimes(2)
})

test('should check for pixel collision', () => {
    //spriteSheetConstructorMock.mockImplementation(() => 'spriteSheet') TODO I havent been able to do this
    const collision = initializeCollision()
    const bitmap1 = new Bitmap()
    const bitmap2 = new Bitmap()
    const result = collision.checkPixelCollision(bitmap1, bitmap2)
    expect(result).toBe(false)
})

const initializeCollision = () => {
    return new Collision()
}
