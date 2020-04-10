import Enemies from './Enemies'

import {
    Stage
} from 'createjs'

beforeEach(() => {
    jest.clearAllMocks()
})

test('should initialize and rearrange enemies when creating', () => {
    //spriteSheetConstructorMock.mockImplementation(() => 'spriteSheet') TODO I havent been able to do this
    const enemies = initializeEnemies()
})


test('should rearrange all enemies when rearranging', () => {
    const enemies = initializeEnemies()
    enemies.rearrange()
})

test('should update enemies and rearrange them at end', () => {
    const enemies = initializeEnemies()
    enemies.tick()
})

test('should get if enemies are surpassed', () => {
    const enemies = initializeEnemies()
    enemies.areSurpassed()
})

const initializeEnemies = () => {
    const stage = new Stage()
    return new Enemies(stage, 'spritesheet')
}
