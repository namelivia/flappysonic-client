import { Stage } from 'createjs'
import Preloader from '../Preloader/Preloader'
import LoadingText from '../LoadingText/LoadingText'
import Instructions from '../Instructions/Instructions'
import Level from '../Level/Level'

export default class Game {
    constructor(canvas, socket) {
        this.canvas = canvas
        this.stage = new Stage(this.canvas)
        if (socket) {
            this.socket = socket
        }
    }

    onCanvasClick = () => this.restart()

    restart() {
        this.canvas.removeEventListener('click', this.onCanvasClick)
        var level = new Level(
            this.canvas,
            this.preloader,
            () => {
                //Do nothing on score
            },
            (currentScore) => {
                if (this.socket) {
                    this.socket.sendHiscore(currentScore)
                }
            }
        )
        level.start()
    }

    restartOnClick() {
        this.canvas.removeEventListener('click', () => this.restartOnClick())
        this.restart()
    }

    startLoading() {
        let loadingText = new LoadingText(this.stage, this.canvas)
        this.preloader = new Preloader(
            //onLoading
            () => {
                loadingText.update(this.preloader.getProgress())
                this.stage.update()
            },
            //onLoaded
            () => {
                new Instructions(this.stage, this.preloader)
                this.canvas.addEventListener('click', this.onCanvasClick)
            }
        )
        this.preloader.load()
    }

    init() {
        this.startLoading()
    }
}
