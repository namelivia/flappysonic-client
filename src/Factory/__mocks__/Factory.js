/* eslint-disable no-unused-vars */
export const preloader = (onLoading, onLoaded) => ({
    load: () => {},
    getProgress: () => {},
})
export const instructions = (stage, preloader) => 'instructions'
export const level = (canvas, preloader, onScore, onDie) => ({
    start: () => {},
})
export const loadingText = (stage, canvas) => 'loadingText'
export const stage = (canvas) => ({})
export const background = (cloudsImage, floorImage) => ({})
export const sonic = (sonicImage) => ({})
export const enemies = (stage, enemiesImage) => ({})
export const collisionManager = (sonic, enemies) => ({})
export const score = (scoreImage) => ({})
export const text = (message, stage, canvas) => ({})
