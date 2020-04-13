import Level from './Level'
jest.mock('../Factory/Factory')
import { preloader as preloaderFactory } from '../Factory/Factory'

test('should start all entities when starting level', () => {
    const level = initializeLevel()
    level.start()
})

test('should update all entities when updating level', () => {
    const level = initializeLevel()
    level.start()
    level.tick()
})

const initializeLevel = () => {
    const onScore = () => {}
    const onDie = () => {}
    const canvas = document.createElement('canvas')
    const preloader = preloaderFactory()
    return new Level(canvas, preloader, onScore, onDie)
}
