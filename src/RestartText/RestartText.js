import { Text } from 'createjs'

export default class RestartText {
    constructor(stage, canvas) {
        this.message = new Text(
            'Click to restart',
            'bold 24px Helvetica',
            '#FFFFFF'
        )
        this.message.maxWidth = 1000
        this.message.textAlign = 'center'
        this.message.x = canvas.width / 8
        this.message.y = canvas.height / 2
        stage.addChild(this.message)
    }
}
