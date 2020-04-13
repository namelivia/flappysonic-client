import Game from './Game'
jest.mock('../Factory/Factory')
import {
    stage as stageFactory,
    preloader as preloaderFactory,
    loadingText as loadingTextFactory,
    instructions as instructionsFactory,
    level as levelFactory,
    getProgressMock,
    updateMock,
    updateStageMock,
    startLevelMock,
    loadMock,
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
    expect(preloaderFactory).toHaveBeenCalledWith(game.onLoading, game.onLoaded)
    expect(loadMock).toHaveBeenCalledTimes(1)
    expect(loadMock).toHaveBeenCalledWith()
})

test('should display instructions when loaded', () => {
    const game = initalizeGame()
    game.onLoaded()
    expect(instructionsFactory).toHaveBeenCalledTimes(1)
})

test('should update loading percentage when loading', () => {
    const game = initalizeGame()
    game.init()
    game.onLoading()
    expect(loadingTextFactory).toHaveBeenCalledTimes(1)
    expect(getProgressMock).toHaveBeenCalledTimes(1)
    expect(updateMock).toHaveBeenCalledTimes(1)
    expect(updateStageMock).toHaveBeenCalledTimes(1)
})

test('should create e new level when starting', () => {
    const game = initalizeGame()
    game.init()
    game.restart()
    expect(levelFactory).toHaveBeenCalledTimes(1)
    //expect(levelFactory).toHaveBeenCalledWith(canvas)
    expect(startLevelMock).toHaveBeenCalledTimes(1)
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
