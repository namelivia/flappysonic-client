import 'createjs'

export default class Text {
    text: createjs.Text
    constructor(message: string, stage: createjs.Stage, canvas: HTMLCanvasElement) {
        this.text = new createjs.Text(message, 'bold 24px Helvetica', '#FFFFFF')
        this.text.maxWidth = 1000
        this.text.textAlign = 'center'
        this.text.x = canvas.width / 2
        this.text.y = canvas.height / 2
        stage.addChild(this.text)
    }

    update(message: string) {
        this.text.text = message
    }
}
