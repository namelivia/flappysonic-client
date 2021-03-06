import { Ticker, Sound } from 'createjs'
import {
    stage as stageFactory,
    background as backgroundFactory,
    sonic as sonicFactory,
    enemies as enemiesFactory,
    collisionManager as collisionManagerFactory,
    score as scoreFactory,
    text as textFactory,
} from '../Factory/Factory'

export const STATE_ALIVE = 0
export const STATE_DEAD = 1

export default class Level {
    restartOnClick = () => this.start()
    jumpOnClick = () => this.sonic.doJump()
    onTick = (evt) => this.tick(evt)

    constructor(canvas, preloader, onScore, onDie) {
        this.canvas = canvas
        this.preloader = preloader
        this.onScore = onScore
        this.onDie = onDie
    }

    start() {
        this.state = STATE_ALIVE
        this.score = 0
        this.canvas.removeEventListener('click', this.restartOnClick)
        this.stage = stageFactory(this.canvas)
        this.scenario = backgroundFactory(
            this.preloader.getResult('clouds'),
            this.preloader.getResult('floor')
        )
        this.sonic = sonicFactory(this.preloader.getResult('sonic'))
        this.stage.addChild(this.scenario)
        this.enemies = enemiesFactory(
            this.stage,
            this.preloader.getResult('enemy')
        )
        this.collisionManager = collisionManagerFactory(
            this.sonic,
            this.enemies
        )
        this.scoreCounter = scoreFactory(this.preloader.getResult('score'))
        this.stage.addChild(this.sonic, this.scoreCounter)

        this.music = Sound.play('music')

        this.canvas.addEventListener('click', this.jumpOnClick)
        if (!Ticker.hasEventListener('tick')) {
            Ticker.addEventListener('tick', this.onTick)
        }
    }

    _shouldKillPlayer() {
        return (
            this.collisionManager.thereIsACollision() ||
            this.sonic.isOutOfBounds()
        )
    }

    _killPlayer() {
        this.canvas.removeEventListener('click', this.jumpOnClick)
        this.sonic.die(this.preloader.getResult('sonicHit'))
        this.state = STATE_DEAD
        this.ticks = 0
        this.music.stop()
        Sound.play('miss')
    }

    _updateWhenAlive() {
        if (this._shouldKillPlayer()) {
            this._killPlayer()
            this.onDie(this.score)
        }
    }

    _waitForRestart() {
        textFactory('Click to restart', this.stage, this.canvas)
        this.canvas.removeEventListener('click', this.jumpOnClick)
        this.canvas.addEventListener('click', this.restartOnClick)
    }

    _updateWhenDead() {
        this.ticks++
        if (this.ticks == 100) {
            this._waitForRestart()
        }
    }

    _updateScore() {
        if (this.enemies.areSurpassed()) {
            this.score = this.score + 1
            Sound.play('ring')
            this.scoreCounter.update(this.score)
            this.onScore()
        }
    }

    tick(event) {
        this.sonic.tick(this.state)
        this.scenario.tick(this.tate)
        this.enemies.tick(this.state)

        if (this.state == STATE_ALIVE) {
            this._updateWhenAlive()
        }

        if (this.state == STATE_DEAD) {
            this._updateWhenDead()
        }

        this.stage.update(event)
        this._updateScore()
    }
}
