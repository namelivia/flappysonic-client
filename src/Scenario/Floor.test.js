import Floor from './Floor'
import { Bitmap } from 'createjs'
import {
  mockedBitmapConstructor
} from 'createjs'
 

test('bitmap is initialized when initializing the floor', () => {
  var x = 10
  const myFloor = new Floor('floorImage', x)
  expect(mockedBitmapConstructor).toHaveBeenCalledWith('floorImage');
  expect(mockedBitmapConstructor).toHaveBeenCalledTimes(1);
  expect(myFloor.x).toBe(x);
  expect(myFloor.y).toBe(192);
});

test('floor moves when updating', () => {
  var x = 10
  const myFloor = new Floor('floorImage', x)
  myFloor.tick()
  expect(myFloor.x).toBe(8);
});

test('floor loops when updating', () => {
  var x = -672
  const myFloor = new Floor('floorImage', x)
  myFloor.tick()
  expect(myFloor.x).toBe(674);
});

