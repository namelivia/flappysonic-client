import LoadingText from './LoadingText'
import {
    Stage,
    Canvas,
} from 'createjs'

test('should display the loading percentage', () => {
    const stage = new Stage()
    const canvas = new Canvas()
    const text = new LoadingText(stage, canvas)
    text.update(0.2)
    expect(text.text.text).toBe('Loading 20%')
})
