import Instructions from './Instructions'
import {
    Stage,
    mockedBitmapConstructor,
    mockAddChild,
    mockUpdate,
} from 'createjs'

test('instructions are loaded and rendered when initialized', () => {
    var preloadMock = {
        getResult: jest.fn(() => 'instructionsImage'),
    }
    const instructions = new Instructions(new Stage(), preloadMock)
    expect(mockedBitmapConstructor).toHaveBeenCalledWith('instructionsImage')
    expect(mockedBitmapConstructor).toHaveBeenCalledTimes(1)
    expect(instructions.image.x).toBe(0)
    expect(instructions.image.y).toBe(0)
    expect(mockAddChild).toHaveBeenCalledTimes(1)
    expect(mockUpdate).toHaveBeenCalledTimes(1)
})
