import { Stage } from 'createjs'
import Preloader from '../Preloader/Preloader'
import Instrucions from '../Instructions/Instructions'
import Level from '../Level/Level'
import LoadingText from '../LoadingText/LoadingText'

export const preloader = (onLoading, onLoaded) =>
    new Preloader(onLoading, onLoaded)

export const instructions = (stage, preloader) =>
    new Instrucions(stage, preloader)

export const level = (canvas, preloader, onScore, onDie) =>
    new Level(canvas, preloader, onScore, onDie)

export const loadingText = (stage, canvas) => new LoadingText(stage, canvas)

export const stage = (canvas) => new Stage(canvas)
