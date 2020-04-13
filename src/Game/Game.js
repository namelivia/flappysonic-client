import {
    stage as stageFactory,
    preloader as preloaderFactory,
    level as levelFactory,
    loadingText as loadingTextFactory,
    instructions as instructionsFactory,
} from '../Factory/Factory'

export default class Game {
    constructor(canvas, onScore, onDie) {
        this.canvas = canvas
        this.stage = stageFactory(this.canvas)
        if (this.onScore) {
            this.onScore = onScore
        }
        if (this.onDie) {
            this.onDie = onDie
        }
    }

    onCanvasClick = () => this.restart()

    restartOnClick() {
        this.canvas.removeEventListener('click', () => this.restartOnClick())
        this.restart()
    }

    restart() {
        this.canvas.removeEventListener('click', this.onCanvasClick)
        var level = levelFactory(
            this.canvas,
            this.preloader,
            this.onScore,
            this.onDie
        )
        level.start()
    }

    onLoading() {
        let loadingText = loadingTextFactory(this.stage, this.canvas)
        loadingText.update(this.preloader.getProgress())
        this.stage.update()
    }

    onLoaded() {
        instructionsFactory(this.stage, this.preloader)
        this.canvas.addEventListener('click', this.onCanvasClick)
    }

    init() {
        this.preloader = preloaderFactory(this.onLoading, this.onLoaded)
        this.preloader.load()
    }
}
