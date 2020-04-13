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
export const areCollidingMock = jest.fn()
export const tickMock = jest.fn()
export const rearrangeMock = jest.fn()
export const hasReachedSonicMock = jest.fn()
export const hasReachedEndMock = jest.fn()
export const enemyTickMock = jest.fn()
export const dieMock = jest.fn()
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
        die: dieMock,
        isOutOfBounds: isOutOfBoundsMock,
    }
})
export const enemy = jest.fn().mockImplementation(() => {
    return {
        rearrange: rearrangeMock,
        hasReachedSonic: hasReachedSonicMock,
        hasReachedEnd: hasReachedEndMock,
        tick: enemyTickMock,
    }
})
export const enemies = jest.fn().mockImplementation(() => {
    return {
        tick: tickMock,
        areSurpassed: areSurpassedMock,
        areColliding: areCollidingMock,
    }
})
export const collisionManager = jest.fn().mockImplementation(() => {
    return {
        thereIsACollision: thereIsACollisionMock,
    }
})
export const checkPixelCollisionMock = jest.fn()
export const collisionMock = {
    checkPixelCollision: checkPixelCollisionMock,
}
export const collision = jest.fn().mockImplementation(() => {
    return collisionMock
})

export const saveContextMock = jest.fn()
export const restoreContextMock = jest.fn()
export const rotateContextMock = jest.fn()
export const scaleContextMock = jest.fn()
export const translateContextMock = jest.fn()
export const drawImageMock = jest.fn()
export const getImageDataMock = jest.fn().mockImplementation(() => {
    return {
        data: {},
    }
})
export const getContextMock = jest.fn().mockImplementation(() => {
    return {
        save: saveContextMock,
        restore: restoreContextMock,
        rotate: rotateContextMock,
        scale: scaleContextMock,
        translate: translateContextMock,
        drawImage: drawImageMock,
        getImageData: getImageDataMock,
    }
})
export const canvasMock = {
    getContext: getContextMock,
}
export const canvas = jest.fn().mockImplementation(() => {
    return canvasMock
})
export const globalPositions = jest.fn().mockImplementation(() => {
    return {
        minX: 10,
        minY: 20,
        maxX: 30,
        maxY: 40,
    }
})
