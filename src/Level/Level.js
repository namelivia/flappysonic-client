import { Stage, Text, Ticker, Sound } from 'createjs'
import Scenario from '../Scenario/Scenario'
import Sonic from '../Sonic/Sonic'
import Enemies from '../Enemies/Enemies'
import Score from '../Score/Score'

export const STATE_ALIVE = 0
export const STATE_DEAD = 1

export default class Level {
    restartOnClick = () => this.start()
    jumpOnClick = () => this.player.doJump()
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
        this.player = new Sonic(this.preloader.getResult('sonic'))
        this.enemies = new Enemies(this.preloader.getResult('enemy'))
        this.score = new Score(this.preloader.getResult('score'))
        this.stage.addChild(
            this.scenario,
            this.player,
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

    tick(event) {
        //updates all entities
        this.player.tick(event, this.state)
        this.scenario.tick(this.state)
        this.enemies.tick(event, this.state)

        //checks every update if
        if (this.state == STATE_ALIVE) {
            if (
                this.enemies.collision(this.player.sprite) ||
                this.player.sprite.y < -60 ||
                this.player.sprite.y > 280
            ) {
                this.canvas.removeEventListener('click', this.jumpOnClick)
                this.player.die(this.preloader.getResult('sonicHit'))
                this.state = 1
                this.ticks = 0
                this.music.stop()
                Sound.play('miss')
                //socket.emit('send', { hiscore: currentScore, name: playerName})
            }
        }

        //checks every update if
        if (this.state == STATE_DEAD) {
            this.ticks++
            if (this.ticks == 100) {
                this.message = new Text(
                    'Click to restart',
                    'bold 24px Helvetica',
                    '#FFFFFF'
                )
                this.message.maxWidth = 1000
                this.message.textAligns = 'center'
                this.message.x = this.canvas.width / 8
                this.message.y = this.canvas.height / 2
                this.stage.addChild(this.message)
                this.canvas.removeEventListener('click', this.jumpOnClick)
                this.canvas.addEventListener('click', this.restartOnClick)
                /*restartFastButton = new FastButton(canvas, () => {
          restart()
          }*/
            }
        }

        //checks every update if
        this.stage.update(event)

        var newScore = this.enemies.score
        if (newScore != this.currentScore) {
            this.currentScore = newScore
            Sound.play('ring')
            this.score.update(newScore)
        }
    }
}
