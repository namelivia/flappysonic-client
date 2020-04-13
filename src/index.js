import Game from './Game/Game'
export const start = (canvas, onScore, onDie) => {
    const game = new Game(canvas, onScore, onDie)
    game.init()
}
