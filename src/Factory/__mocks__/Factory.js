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
