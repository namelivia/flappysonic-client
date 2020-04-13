import Level from './Level'
jest.mock('../Factory/Factory')
import { preloader as preloaderFactory } from '../Factory/Factory'

test('this tests need to be written', () => {
    const onScore = () => {}
    const onDie = () => {}
    const canvas = document.createElement('canvas')
    const preloader = preloaderFactory()
    new Level(canvas, preloader, onScore, onDie)
})
