import { Container, Sprite, SpriteSheet } from 'createjs'
import { STATE_DEAD } from '../Level/Level.js'

export const SpriteSheetData = {
    frames: { regX: 0, height: 64, count: 12, regY: 0, width: 64 },
    animations: {
        up: [0, 2, 'up'],
        straight: [3, 5, 'straight'],
        down: [6, 8, 'down'],
        dead: [9, 11, 'dead'],
    },
}

export const HurtSpriteSheetData = {
    frames: { regX: 0, height: 64, count: 2, regY: 0, width: 48 },
    animations: { dead: [0, 0, 'dead'], hurt: [1, 1, 'hurt'] },
}

export default class Sonic extends Container {
    constructor(spritesheet) {
        super()
        this.setup(spritesheet)
    }

    setup(spritesheet) {
        SpriteSheetData.images = [spritesheet]
        var dataSonic = new SpriteSheet(SpriteSheetData)
        this.sprite = new Sprite(dataSonic, 'straight')
        this.sprite.framerate = 5
        this.sprite.x = 50
        this.sprite.y = 50
        this.addChild(this.sprite)
        this.jump = 0
    }

    updateVerticalPosition() {
        this.sprite.y += 10
        this.sprite.y -= this.jump
    }

    decreaseJump() {
        this.jump -= 2
    }

    isJumping() {
        return this.jump > 0
    }

    isGoingUp() {
        return this.jump > 10
    }

    setAnimation(key) {
        if (this.sprite.currentAnimation != key) {
            this.sprite.gotoAndPlay(key)
        }
    }

    isDead(state) {
        return state == STATE_DEAD
    }

    isOutOfBounds() {
        return this.sprite.y < -60 || this.sprite.y > 280
    }

    _updateWhenAlive() {
        this.updateVerticalPosition()
        if (this.isJumping()) {
            this.decreaseJump()
            if (this.isGoingUp()) {
                return 'up'
            }
            return 'straight'
        }
        return 'down'
    }
    _updateWhenDead() {
        this.sprite.x += 6
        this.sprite.y += 6
        this.hurtSprite.y += 15
        this.hurtSprite.x -= 3
        return 'dead'
    }

    tick(state) {
        let newAnimationKey = this.isDead(state)
            ? this._updateWhenDead()
            : this._updateWhenAlive()
        this.setAnimation(newAnimationKey)
    }

    doJump() {
        this.jump = 20
    }

    die(spritesheet) {
        HurtSpriteSheetData.images = [spritesheet]
        var dataSonicHurt = new SpriteSheet(HurtSpriteSheetData)
        this.hurtSprite = new Sprite(dataSonicHurt, 'hurt')
        this.hurtSprite.x = this.sprite.x
        this.hurtSprite.y = this.sprite.y
        this.addChild(this.hurtSprite)
    }
}
