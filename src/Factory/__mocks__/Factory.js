/* eslint-disable no-unused-vars */
export const loadMock = jest.fn()
export const getProgressMock = jest.fn()
export const updateMock = jest.fn()
export const updateStageMock = jest.fn()
export const startLevelMock = jest.fn()
export const preloader = jest.fn().mockImplementation(() => {
    return {
        load: loadMock,
        getProgress: getProgressMock,
    }
})
export const instructions = jest.fn().mockImplementation(() => {
    return {}
})
export const level = jest.fn().mockImplementation(() => {
    return {
        start: startLevelMock,
    }
})
export const loadingText = jest.fn().mockImplementation(() => {
    return {
        update: updateMock,
    }
})
export const stage = jest.fn().mockImplementation(() => {
    return {
        update: updateStageMock,
    }
})
export const background = (cloudsImage, floorImage) => ({})
export const sonic = (sonicImage) => ({})
export const enemies = (stage, enemiesImage) => ({})
export const collisionManager = (sonic, enemies) => ({})
export const score = (scoreImage) => ({})
export const text = (message, stage, canvas) => ({})
