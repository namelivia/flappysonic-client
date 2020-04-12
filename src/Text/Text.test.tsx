import Text from './Text'

test('should display text correctly in the middle of the screen', () => {
    const text = initializeText()
    /*expect(createjs.mockedTextConstructor).toHaveBeenCalledTimes(1)
    expect(createjs.mockedTextConstructor).toHaveBeenCalledWith('message')*/
    expect(text.text.maxWidth).toBe(1000)
    expect(text.text.textAlign).toBe('center')
    expect(text.text.x).toBe(320)
    expect(text.text.y).toBe(240)
    /*expect(createjs.mockAddChild).toHaveBeenCalledTimes(1)
    expect(createjs.mockAddChild).toHaveBeenCalledWith(text.text)*/
})

test('should update message', () => {
    const text = initializeText()
    text.update('new message')
    expect(text.text.text).toBe('new message')
})

const initializeText = () => {
    const canvas = new HTMLCanvasElement()
    const stage = new createjs.Stage(canvas)
    return new Text('message', stage, canvas)
}
