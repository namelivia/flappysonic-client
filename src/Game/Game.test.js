import Game from './Game'
jest.mock('../Factory/Factory')
import {
    stage as stageFactory,
    preloader as preloaderFactory,
} from '../Factory/Factory'

test('should create stage when initalizing', () => {
    const canvas = document.createElement('canvas')
    initalizeGame(canvas)
    expect(stageFactory).toHaveBeenCalledTimes(1)
    expect(stageFactory).toHaveBeenCalledWith(canvas)
})

test('should start loading when init', () => {
    const game = initalizeGame()
    game.init()
    expect(preloaderFactory).toHaveBeenCalledTimes(1)
})

test('should display instructions when loaded', () => {
    const game = initalizeGame()
    game.onLoaded()
})

/*test('should update loading percentage when loading', () => {
    const game = initalizeGame()
    game.onLoading()
})*/

test('should restart game when clicking', () => {
    const game = initalizeGame()
    game.restartOnClick()
})

test('should create e new level when starting', () => {
    const game = initalizeGame()
    game.restart()
})

const initalizeGame = (canvas, onScore, onDie) => {
    if (canvas === undefined) {
        canvas = document.createElement('canvas')
    }
    if (onScore === undefined) {
        onScore = () => {}
    }
    if (onDie === undefined) {
        onDie = () => {}
    }
    return new Game(canvas, onScore, onDie)
}
