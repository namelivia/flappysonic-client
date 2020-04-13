/* eslint-disable no-unused-vars */
export const loadMock = jest.fn()
export const getProgressMock = jest.fn()
export const updateMock = jest.fn()
export const updateStageMock = jest.fn()
export const thereIsACollisionMock = jest.fn()
export const isOutOfBoundsMock = jest.fn()
export const addChildMock = jest.fn()
export const startLevelMock = jest.fn()
export const getResultMock = jest.fn()
export const areSurpassedMock = jest.fn()
export const tickMock = jest.fn()
export const preloader = jest.fn().mockImplementation(() => {
    return {
        load: loadMock,
        getProgress: getProgressMock,
        getResult: getResultMock,
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
        addChild: addChildMock,
    }
})
export const background = jest.fn().mockImplementation(() => {
    return {
        tick: tickMock,
    }
})
export const sonic = jest.fn().mockImplementation(() => {
    return {
        tick: tickMock,
        isOutOfBounds: isOutOfBoundsMock,
    }
})
export const enemies = jest.fn().mockImplementation(() => {
    return {
        tick: tickMock,
        areSurpassed: areSurpassedMock,
    }
})
export const collisionManager = jest.fn().mockImplementation(() => {
    return {
        thereIsACollision: thereIsACollisionMock,
    }
})
export const score = (scoreImage) => ({})
export const text = (message, stage, canvas) => ({})
