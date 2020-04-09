import Clouds from './Clouds'
import {
  mockedBitmapConstructor
} from 'createjs'
 

test('bitmap is initialized when initializing the clouds', () => {
  const myClouds = initializeClouds(10)
  expect(mockedBitmapConstructor).toHaveBeenCalledWith('cloudsImage');
  expect(mockedBitmapConstructor).toHaveBeenCalledTimes(1);
  expect(myClouds.x).toBe(10);
  expect(myClouds.y).toBe(0);
});

test('clouds move when updating', () => {
  const myClouds = initializeClouds(10)
  myClouds.tick()
  expect(myClouds.x).toBe(9);
});

test('clouds loop when updating', () => {
  const myClouds = initializeClouds(-639)
  myClouds.tick()
  expect(myClouds.x).toBe(640);
});

const initializeClouds = (x) => {
  return new Clouds('cloudsImage', x)
}
