import Level from './Level'
import { Canvas, Preloader, mockedStageConstructor } from 'createjs'

test('should initialize all components when starting', () => {
    const level = initializeLevel()
    level.start()
    expect(mockedStageConstructor).toHaveBeenCalledTimes(1)
    //expect(mockedPreloaderGetResult).toHaveBeenCalledTimes(1);
    //expect(addChildMock).toHaveBeenCalledTimes(1);
})

test('should update entitnes when updating', () => {
    const level = initializeLevel()
    //this is weird
    level.start()
    level.tick()
    //expect(mockedPreloaderGetResult).toHaveBeenCalledTimes(1);
    //expect(addChildMock).toHaveBeenCalledTimes(1);
})

const initializeLevel = () => {
    const canvasMock = new Canvas()
    const preloaderMock = new PreloaderMock()
    return new Level(canvasMock, preloaderMock)
}

export class PreloaderMock {
    getResult = jest.fn()
}
