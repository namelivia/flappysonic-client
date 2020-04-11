import Layer from './Layer'
import { mockedBitmapConstructor } from 'createjs'

test('should initialize bitmap when initializing the layer', () => {
    const myLayer = initializeLayer(10)
    expect(mockedBitmapConstructor).toHaveBeenCalledWith('layerImage')
    expect(mockedBitmapConstructor).toHaveBeenCalledTimes(1)
    expect(myLayer.x).toBe(10)
    expect(myLayer.y).toBe(0)
})

test('should move layer when updating', () => {
    const myLayer = initializeLayer(10)
    myLayer.tick()
    expect(myLayer.x).toBe(9)
})

test('should loop layer when updating', () => {
    const myLayer = initializeLayer(-639)
    myLayer.tick()
    expect(myLayer.x).toBe(640)
})

const initializeLayer = (x) => {
    return new Layer('layerImage', x, 0, 1, 640)
}
