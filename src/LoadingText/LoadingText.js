import Text from '../Text/Text'

export default class LoadingText extends Text{
    constructor(message, stage, canvas) {
        super.constructor(message, stage, canvas)
    }

    update(progress) {
        super.update('Loading ' + ((progress * 100) | 0) + '%')
    }
}
