import { Sprite } from 'createjs'
export default class Imgr {
    constructor(bounds, obj) {
        if (obj instanceof Sprite && this._spriteFrameHasImage(obj)) {
            return this._getImgrForSprite(obj)
        }
    }

    _getImgrForSprite(obj) {
        var imgr = {}
        var cframe = obj.spriteSheet.getFrame(obj.currentFrame)
        imgr.width = cframe.rect.width
        imgr.height = cframe.rect.height
        imgr.regX = cframe.regX
        imgr.regY = cframe.regY
        return imgr
    }

    _spriteFrameHasImage(obj) {
        return (
            obj.spriteSheet._frames &&
            obj.spriteSheet._frames[obj.currentFrame] &&
            obj.spriteSheet._frames[obj.currentFrame].image
        )
    }
}
