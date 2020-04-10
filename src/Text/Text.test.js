import Text from './Text'
import { mockAddChild, mockedTextConstructor, Stage, Canvas } from 'createjs'

test('should display text correctly in the middle of the screen', () => {
    const text = initializeText()
    expect(mockedTextConstructor).toHaveBeenCalledTimes(1)
    expect(mockedTextConstructor).toHaveBeenCalledWith('message')
    expect(text.text.maxWidth).toBe(1000)
    expect(text.text.textAlign).toBe('center')
    expect(text.text.x).toBe(320)
    expect(text.text.y).toBe(240)
    expect(mockAddChild).toHaveBeenCalledTimes(1)
    expect(mockAddChild).toHaveBeenCalledWith(text.text)
})

test('should update message', () => {
    const text = initializeText()
    text.update('new message')
    expect(text.text.text).toBe('new message')
})

const initializeText = () => {
    const stage = new Stage()
    const canvas = new Canvas()
    return new Text('message', stage, canvas)
}
