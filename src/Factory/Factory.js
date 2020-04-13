import { Stage } from 'createjs'
import Preloader from '../Preloader/Preloader'
import Instrucions from '../Instructions/Instructions'
import Level from '../Level/Level'
import LoadingText from '../LoadingText/LoadingText'
import Background from '../Background/Background'
import Sonic from '../Sonic/Sonic'
import Enemies from '../Enemies/Enemies'
import Score from '../Score/Score'
import Text from '../Text/Text'
import GlobalPositions from '../Collision/GlobalPositions'
import CollisionManager from '../CollisionManager/CollisionManager'
import Collision from '../Collision/Collision'
import Enemy from '../Enemy/Enemy'

export const preloader = (onLoading, onLoaded) =>
    new Preloader(onLoading, onLoaded)

export const instructions = (stage, preloader) =>
    new Instrucions(stage, preloader)

export const level = (canvas, preloader, onScore, onDie) =>
    new Level(canvas, preloader, onScore, onDie)

export const loadingText = (stage, canvas) => new LoadingText(stage, canvas)

export const stage = (canvas) => new Stage(canvas)

export const background = (cloudsImage, floorImage) =>
    new Background(cloudsImage, floorImage)

export const sonic = (sonicImage) => new Sonic(sonicImage)

export const enemies = (stage, enemiesImage) => new Enemies(stage, enemiesImage)

export const collisionManager = (sonic, enemies) =>
    new CollisionManager(sonic, enemies)

export const score = (scoreImage) => new Score(scoreImage)

export const text = (message, stage, canvas) => new Text(message, stage, canvas)

export const enemy = (stage, spreadsheet) => new Enemy(stage, spreadsheet)

export const collision = () => new Collision()

export const canvas = () => document.createElement('canvas')

export const globalPositions = (obj, imgr) => new GlobalPositions(obj, imgr)
