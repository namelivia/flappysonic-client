export const mockAddChild = jest.fn()
export const mockUpdate = jest.fn()
export const mockedStageConstructor = jest.fn()
export const mockedContainerConstructor = jest.fn()
export const mockedSpriteConstructor = jest.fn()
export const spriteSheetConstructorMock = jest.fn()
export const mockedBitmapConstructor = jest.fn()
export const gotoAndPlayMock = jest.fn()
export const loadQueueConstructorMock = jest.fn()
export const installPluginMock = jest.fn()
export const loadManifestMock = jest.fn()
export const getResultMock = jest.fn()
export const removeEventListenerMock = jest.fn()
export const addEventListenerMock = jest.fn()
export const hasEventListenerMock = jest.fn()
export const mockedTextConstructor = jest.fn()
export const addChildMock = jest.fn()
export const updateMock = jest.fn()
export const stopMock = jest.fn()
export const getFrameMock = jest.fn()
export const musicMock = jest.fn().mockImplementation(() => {
    return {
        stop: stopMock,
    }
})
export const playMock = jest.fn().mockImplementation(() => {
    return musicMock()
})
export class Container {
    constructor() {
        return mockedContainerConstructor()
    }
    addChild = mockAddChild
}
export class Sprite {
    constructor(data, animation) {
        return mockedSpriteConstructor(data, animation)
    }
    currentAnimation = 'currentAnimation'
    gotoAndPlay = gotoAndPlayMock
    spriteSheet = {
        _frames: [{ image: 'image' }],
        getFrame: getFrameMock,
    }
}
export class SpriteSheet {
    constructor(data) {
        return spriteSheetConstructorMock(data)
    }
}
const localToGlobalMock = jest.fn().mockImplementation(() => {
    return {
        x: 10,
        y: 30,
    }
})
const globalToLocalMock = jest.fn().mockImplementation(() => {
    return {
        x: 50,
        y: 80,
    }
})
export class Bitmap {
    constructor(data) {
        return mockedBitmapConstructor(data)
    }
    globalToLocal = globalToLocalMock
    localToGlobal = localToGlobalMock
    image = {
        width: 20,
        height: 50,
    }
}
export class Canvas {
    constructor() {
        this.width = 640
        this.height = 480
    }
    removeEventListener = removeEventListenerMock
    addEventListener = addEventListenerMock
}
export class Stage {
    constructor(data) {
        return mockedStageConstructor(data)
    }
    addChild = mockAddChild
    update = mockUpdate
}
export class Text {
    constructor(data) {
        return mockedTextConstructor(data)
    }
}
export class LoadQueue {
    constructor(data) {
        this.progress = 20
        return loadQueueConstructorMock(data)
    }
    installPlugin = installPluginMock
    addEventListener = addEventListenerMock
    loadManifest = loadManifestMock
    getResult = getResultMock
}
export const Sound = {
    play: playMock,
}
export const Ticker = {
    hasEventListener: hasEventListenerMock,
    addEventListener: addEventListenerMock,
}
