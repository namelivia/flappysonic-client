export const mockAddChild = jest.fn();
export const mockUpdate = jest.fn();
export const mockedStageConstructor = jest.fn();
export const mockedContainerConstructor = jest.fn();
export const mockedSpriteConstructor = jest.fn();
export const spriteSheetConstructorMock = jest.fn();
export const mockedBitmapConstructor = jest.fn();
export const gotoAndPlayMock = jest.fn();
export const loadQueueConstructorMock = jest.fn();
export const installPluginMock = jest.fn();
export const addEventListenerMock = jest.fn();
export const loadManifestMock = jest.fn();
export const getResultMock = jest.fn();
export const removeEventListenerMock = jest.fn();
export const addEventListenerMock = jest.fn();
export const mockedStageConstructor = jest.fn();
export const addChildMock = jest.fn();
export const updateMock = jest.fn();
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
}
export class SpriteSheet {
	constructor(data) {
		return spriteSheetConstructorMock(data)
	}
}
export class Bitmap{
	constructor(data) {
		return mockedBitmapConstructor(data)
	}
}
export class Canvas {
	removeEventListener = removeEventListenerMock
	addEventListener = addEventListenerMock
}
export class Stage{
	constructor(data) {
		return mockedStageConstructor(data)
	}
	addChild = mockAddChild
	update = mockUpdate
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
export class Sound {
}
