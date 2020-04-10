import { Stage, Text, Ticker, Sound } from 'createjs'
import Scenario from '../Scenario/Scenario'
import Sonic from '../Sonic/Sonic'
import Enemies from '../Enemies/Enemies'
import Score from '../Score/Score'
import RestartText from '../RestartText/RestartText'

export const STATE_ALIVE = 0
export const STATE_DEAD = 1

export default class Level {
    restartOnClick = () => this.start()
    jumpOnClick = () => this.sonic.doJump()
    onTick = (evt) => this.tick(evt)

    constructor(canvas, preloader) {
        this.canvas = canvas
        this.preloader = preloader
    }

    start() {
        this.canvas.removeEventListener('click', this.restartOnClick)
        this.stage = new Stage(this.canvas)
        this.state = STATE_ALIVE
        this.scenario = new Scenario(
            this.preloader.getResult('clouds'),
            this.preloader.getResult('floor')
        )
        this.sonic = new Sonic(this.preloader.getResult('sonic'))
        this.enemies = new Enemies(this.preloader.getResult('enemy'))
        this.score = new Score(this.preloader.getResult('score'))
        this.stage.addChild(
            this.scenario,
            this.sonic,
            this.enemies,
            this.score
        )

        this.music = Sound.play('music')
        this.currentScore = this.enemies.score

        this.canvas.addEventListener('click', this.jumpOnClick)
        if (!Ticker.hasEventListener('tick')) {
            Ticker.addEventListener('tick', this.onTick)
        }
    }

    _isCollidingWithEnemy() {
        return this.enemies.collision(this.sonic.sprite) ||
            this.sonic.sprite.y < -60 ||
            this.sonic.sprite.y > 280
    }

    _killPlayer() {
        this.canvas.removeEventListener('click', this.jumpOnClick)
        this.sonic.die(this.preloader.getResult('sonicHit'))
        this.state = 1
        this.ticks = 0
        this.music.stop()
        Sound.play('miss')
    }

    _updateWhenAlive() {
        if (this._isCollidingWithEnemy()) {
            this._killPlayer()
            //socket.emit('send', { hiscore: currentScore, name: playerName})
        }
    }

    _waitForRestart() {
        new RestartText(this.stage, this.canvas)
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
        var newScore = this.enemies.score
        if (newScore != this.currentScore) {
            this.currentScore = newScore
            Sound.play('ring')
            this.score.update(newScore)
        }
    }

    tick(event) {
        //updates all entities
        this.player.tick(event, this.state)
        this.scenario.tick(this.state)
        this.enemies.tick(event, this.state)

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
