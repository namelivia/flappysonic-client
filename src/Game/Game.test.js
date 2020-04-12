import Game from './Game'
jest.mock('../Factory/Factory')

test('should create stage when initalizing', () => {
    initalizeGame()
})

test('should start loading when init', () => {
    const game = initalizeGame()
    game.init()
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

const initalizeGame = () => {
    const canvas = document.createElement('canvas')
    const onScore = jest.fn()
    const onDie = jest.fn()
    return new Game(canvas, onScore, onDie)
}
