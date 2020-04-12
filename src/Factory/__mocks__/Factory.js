/* eslint-disable no-unused-vars */
export const preloader = jest.fn().mockImplementation(() => {
    return {
        load: jest.fn(),
        getProgress: jest.fn(),
    }
})
export const instructions = (stage, preloader) => 'instructions'
export const level = (canvas, preloader, onScore, onDie) => ({
    start: () => {},
})
export const loadingText = (stage, canvas) => 'loadingText'
export const stage = jest.fn().mockImplementation(() => {
    return {}
})
export const background = (cloudsImage, floorImage) => ({})
export const sonic = (sonicImage) => ({})
export const enemies = (stage, enemiesImage) => ({})
export const collisionManager = (sonic, enemies) => ({})
export const score = (scoreImage) => ({})
export const text = (message, stage, canvas) => ({})
