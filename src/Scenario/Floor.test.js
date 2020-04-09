import Floor from './Floor'
import {
  mockedBitmapConstructor
} from 'createjs'
 

test('bitmap is initialized when initializing the floor', () => {
  const myFloor = initializeFloor(10)
  expect(mockedBitmapConstructor).toHaveBeenCalledWith('floorImage');
  expect(mockedBitmapConstructor).toHaveBeenCalledTimes(1);
  expect(myFloor.x).toBe(10);
  expect(myFloor.y).toBe(192);
});

test('floor moves when updating', () => {
  const myFloor = initializeFloor(10)
  myFloor.tick()
  expect(myFloor.x).toBe(8);
});

test('floor loops when updating', () => {
  const myFloor = initializeFloor(-672)
  myFloor.tick()
  expect(myFloor.x).toBe(674);
});

const initializeFloor = (x) => {
  return new Floor('floorImage', x)
}
