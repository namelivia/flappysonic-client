import { Text as CreateJSText} from 'createjs'

export default class Text {
    constructor(message, stage, canvas) {
        this.text = new CreateJSText(message, 'bold 24px Helvetica', '#FFFFFF')
        this.text.maxWidth = 1000
        this.text.textAlign = 'center'
        this.text.x = canvas.width / 2
        this.text.y = canvas.height / 2
        stage.addChild(this.text)
    }

    update(message) {
        this.text.text = message
    }
}
