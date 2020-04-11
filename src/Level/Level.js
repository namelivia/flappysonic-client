import { Stage, Ticker, Sound } from 'createjs'
import Background from '../Background/Background'
import Sonic from '../Sonic/Sonic'
import CollisionManager from '../CollisionManager/CollisionManager'
import Enemies from '../Enemies/Enemies'
import Score from '../Score/Score'
import Text from '../Text/Text'

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
        this.stage = new Stage(this.canvas)
        this.scenario = new Background(
            this.preloader.getResult('clouds'),
            this.preloader.getResult('floor')
        )
        this.sonic = new Sonic(this.preloader.getResult('sonic'))
        this.stage.addChild(this.scenario)
        //I can't test this ATM
        this.enemies = new Enemies(
            this.stage,
            this.preloader.getResult('enemy')
        )
        this.collisionManager = new CollisionManager(this.sonic, this.enemies)
        this.scoreCounter = new Score(this.preloader.getResult('score'))
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
        //I can't test this ATM
        if (this._shouldKillPlayer()) {
            this._killPlayer()
            this.onDie(this.score)
        }
    }

    _waitForRestart() {
        new Text('Click to restart', this.stage, this.canvas)
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
        //I can't test this ATM
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
