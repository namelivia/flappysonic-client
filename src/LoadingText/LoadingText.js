import Text from '../Text/Text'

export default class LoadingText extends Text{
    constructor(stage, canvas) {
        super('Loading', stage, canvas)
    }

    update(progress) {
        super.update('Loading ' + ((progress * 100) | 0) + '%')
    }
}
