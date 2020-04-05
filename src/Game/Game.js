import { Stage } from 'createjs'
import Preloader from '../Preloader/Preloader'
import LoadingText from '../LoadingText/LoadingText'
import Instructions from '../Instructions/Instructions'
import Level from '../Level/Level'

export default class Game {
    onCanvasClick = () => this.restart()

    restart() {
        this.canvas.removeEventListener('click', this.onCanvasClick)
        var level = new Level(this.canvas, this.preloader)
        level.start()
    }

    restartOnClick() {
        this.canvas.removeEventListener('click', () => this.restartOnClick())
        this.restart()
    }

    setName() {
        let newName = document.getElementById('name').value
        if (newName.length === 0) {
            document.getElementById('noName').style.display = 'block'
            return false
        } else {
            this.playerName = newName
            return true
        }
    }

    UpdateScoreTable(data, scoreTable) {
        var new_tbody = document.createElement('tbody')
        for (var i = 0; i < data.length; i++) {
            var row = new_tbody.insertRow(0)
            var name = row.insertCell(0)
            var score = row.insertCell(1)

            name.innerHTML = data[i].name
            score.innerHTML = data[i].hiscore
        }
        scoreTable.replaceChild(new_tbody, scoreTable.tBodies[0])
    }

    UpdateHiscores(data) {
        this.UpdateScoreTable(data, this.hiscoresTable)
    }

    UpdateLastscores(data) {
        this.UpdateScoreTable(data, this.lastscoresTable)
    }

    startLoading() {
        let loadingText = new LoadingText(this.stage, this.canvas)
        this.preloader = new Preloader(
            //onLoading
            () => {
                loadingText.update(this.preloader.getProgress(), this.stage)
            },
            //onLoaded
            () => {
                //TODO:what was this for?
                //clearInterval(loadingInterval)
                /*this.handleClickFastButton = new FastButton(canvas, () => {
          this.handleClickFastButton.destroy()
          restart()
        })*/
                new Instructions(this.stage, this.preloader),
                    this.canvas.addEventListener('click', this.onCanvasClick)
            }
        )
        this.preloader.load()
    }

    init() {
        //socket = io.connect('https://flappysonic.namelivia.com')
        this.canvas = document.getElementById('gameCanvas')
        this.hiscoresTable = document.getElementById('hiscoresTable')
        this.lastscoresTable = document.getElementById('lastscoresTable')
        this.stage = new Stage(this.canvas)

        //LoadingStage
        this.startLoading()

        //When player has written its name, show the game
        var nameButton = document.getElementById('set')
        nameButton.onclick = () => {
            if (this.setName()) {
                document.getElementById('rooster').style.display = 'none'
                document.getElementById('leftContainer').style.display = 'block'
                document.getElementById('rightContainer').style.display =
                    'block'
                document.getElementById('centralContainer').style.display =
                    'block'
                //socket.emit('send', { getHiscores:"data"})
            }
        }

        //Process server responses
        /*socket.on('message', (data) => {
        if(data.hiscores){
        UpdateHiscores(data.hiscores.reverse())
      }
        if(data.lastscores){
        UpdateLastscores(data.lastscores.reverse())
      }
    })*/
    }
}
