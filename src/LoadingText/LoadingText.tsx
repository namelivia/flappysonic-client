import Text from '../Text'

export default class LoadingText extends Text {
    constructor(stage: createjs.Stage, canvas: HTMLCanvasElement) {
        super('Loading', stage, canvas)
    }

    setProgress(progress: number) {
        super.update('Loading ' + ((progress * 100) | 0) + '%')
    }
}
