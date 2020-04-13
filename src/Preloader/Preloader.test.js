import Preloader, { Manifest } from './Preloader'
import {
    getResultMock,
    loadManifestMock,
    installPluginMock,
    addEventListenerMock,
} from 'createjs'

test('should install sound and set callbacks on initialization', () => {
    const onLoadingMock = jest.fn()
    const onLoadedMock = jest.fn()
    initializePreloader(onLoadingMock, onLoadedMock)
    expect(installPluginMock).toHaveBeenCalledTimes(1)
    expect(addEventListenerMock).toHaveBeenCalledTimes(2)
})

test('should load manifest', () => {
    const preloader = initializePreloader()
    preloader.load()
    expect(loadManifestMock).toHaveBeenCalledTimes(1)
    expect(loadManifestMock).toHaveBeenCalledWith(Manifest)
})

test('should return loading progress', () => {
    const preloader = initializePreloader()
    expect(preloader.getProgress()).toBe(20)
})

test('should retrieve loaded items', () => {
    const preloader = initializePreloader()
    preloader.getResult('key')
    expect(getResultMock).toHaveBeenCalledTimes(1)
    expect(getResultMock).toHaveBeenCalledWith('key')
})

const initializePreloader = (onLoading = () => {}, onLoaded = () => {}) => {
    return new Preloader(onLoading, onLoaded)
}
