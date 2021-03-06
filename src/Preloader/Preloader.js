import { LoadQueue, Sound } from 'createjs'

export const Manifest = [
    { id: 'floor', src: 'img/background1.png' },
    { id: 'clouds', src: 'img/background2.png' },
    { id: 'instructions', src: 'img/instructions.png' },
    { id: 'sonic', src: 'img/sonic.png' },
    { id: 'sonicHit', src: 'img/sonicdeath.png' },
    { id: 'enemy', src: 'img/enemy.png' },
    { id: 'score', src: 'img/score.png' },
    { id: 'miss', src: 'snd/miss.ogg' },
    { id: 'ring', src: 'snd/ring.ogg' },
    { id: 'music', src: 'snd/music.ogg' },
]

export default class Preloader {
    constructor(onLoading, onLoaded) {
        this.queue = new LoadQueue()
        Sound.alternateExtensions = ['mp3']
        this.queue.installPlugin(Sound)
        this.queue.addEventListener('complete', () => onLoaded())
        this.queue.addEventListener('progress', () => onLoading())
    }

    load() {
        this.queue.loadManifest(Manifest)
    }

    getProgress() {
        return this.queue.progress
    }

    getResult(key) {
        return this.queue.getResult(key)
    }
}
