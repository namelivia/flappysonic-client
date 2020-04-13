import Imgr from './Imgr'
import { Sprite, getFrameMock } from 'createjs'
test('should get the Imgr for a sprite', () => {
    const sprite = new Sprite()
    sprite.currentFrame = 0
    getFrameMock.mockReturnValueOnce({
        rect: {
            width: 10,
            height: 5,
        },
        regX: 12,
        regY: 23,
    })
    const result = new Imgr(sprite)
    expect(getFrameMock).toHaveBeenCalledTimes(1)
    expect(result).toStrictEqual({
        height: 5,
        regX: 12,
        regY: 23,
        width: 10,
    })
})
