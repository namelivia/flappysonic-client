import { Container, Sprite, SpriteSheet } from 'createjs'

export const SpriteSheetData = {
    frames: { regX: 0, height: 52, count: 2, regY: 0, width: 48 },
    animations: { stay: [0, 1, 'stay'] },
}

export default class Enemy extends Container {
    constructor(stage, spritesheet) {
        super()
        SpriteSheetData.images = [spritesheet]
        var dataEnemy = new SpriteSheet(SpriteSheetData)
        this.sprite = new Sprite(dataEnemy, 'stay')
        this.framerate = this.calculateFramerate()
        stage.addChild(this.sprite)
    }

    calculateFramerate() {
        //TODO: This framerate seems too fast
        return Math.floor(Math.random() * 8)
    }

    rearrange(index, hole) {
        this.sprite.x = 350
        this.framerate = this.calculateFramerate()
        this.sprite.y = 50 * index - 8
        if (index > hole) {
            this.sprite.y += 100
        }
    }

    hasReachedEnd() {
        return this.sprite.x < -60
    }

    hasReachedSonic() {
        return this.sprite.x == 20
    }

    tick() {
        this.sprite.x = this.sprite.x - 6
    }
}
