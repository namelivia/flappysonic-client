import { Stage } from 'createjs'
import Preloader from '../Preloader/Preloader'
import LoadingText from '../LoadingText/LoadingText'
import Instructions from '../Instructions/Instructions'
import Level from '../Level/Level'

export default class Game {
    constructor(canvas, onScore, onDie) {
        this.canvas = canvas
        this.stage = new Stage(this.canvas)
        if (this.onScore) {
            this.onScore = onScore
        }
        if (this.onDie) {
            this.onDie = onDie
        }
    }

    onCanvasClick = () => this.restart()

    restart() {
        this.canvas.removeEventListener('click', this.onCanvasClick)
        var level = new Level(
            this.canvas,
            this.preloader,
            this.onScore,
            this.onDie
        )
        level.start()
    }

    restartOnClick() {
        this.canvas.removeEventListener('click', () => this.restartOnClick())
        this.restart()
    }

    onLoading() {
        let loadingText = new LoadingText(this.stage, this.canvas)
        loadingText.update(this.preloader.getProgress())
        this.stage.update()
    }

    onLoaded() {
        new Instructions(this.stage, this.preloader)
        this.canvas.addEventListener('click', this.onCanvasClick)
    }

    startLoading() {
        this.preloader = new Preloader(this.onLoading, this.onLoaded)
        this.preloader.load()
    }

    init() {
        this.startLoading()
    }
}
