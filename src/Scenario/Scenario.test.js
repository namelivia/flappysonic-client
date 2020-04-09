import Scenario from './Scenario'
import { STATE_DEAD, STATE_ALIVE } from '../Level/Level.js'
 
test('shoud initialize floor and clouds when initializing the scenario', () => {
    const scenario = initializeScenario()
    expect(scenario.floor1.x).toBe(0);
    expect(scenario.floor2.x).toBe(674);
    expect(scenario.clouds1.x).toBe(0);
    expect(scenario.clouds2.x).toBe(640);
});

test('should update floor and clouds when updating if player is alive', () => {
    const scenario = initializeScenario()
    scenario.tick(STATE_ALIVE)
    expect(scenario.floor1.x).toBe(-2);
    expect(scenario.floor2.x).toBe(672);
    expect(scenario.clouds1.x).toBe(-1);
    expect(scenario.clouds2.x).toBe(639);
});

test('should not floor and clouds when updating if player is dead', () => {
    const scenario = initializeScenario()
    scenario.tick(STATE_DEAD)
    expect(scenario.floor1.x).toBe(0);
    expect(scenario.floor2.x).toBe(674);
    expect(scenario.clouds1.x).toBe(0);
    expect(scenario.clouds2.x).toBe(640);
});

const initializeScenario = () => {
  return new Scenario('cloudsImage', 'floorImage')
}
