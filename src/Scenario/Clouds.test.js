import Clouds from './Clouds'
import { Bitmap } from 'createjs'
import {
  mockedBitmapConstructor
} from 'createjs'
 

test('bitmap is initialized when initializing the clouds', () => {
  var x = 10
  const myClouds = new Clouds('cloudsImage', x)
  expect(mockedBitmapConstructor).toHaveBeenCalledWith('cloudsImage');
  expect(mockedBitmapConstructor).toHaveBeenCalledTimes(1);
  expect(myClouds.x).toBe(x);
  expect(myClouds.y).toBe(0);
});

test('clouds move when updating', () => {
  var x = 10
  const myClouds = new Clouds('cloudsImage', x)
  myClouds.tick()
  expect(myClouds.x).toBe(9);
});

test('clouds loop when updating', () => {
  var x = -639
  const myClouds = new Clouds('cloudsImage', x)
  myClouds.tick()
  expect(myClouds.x).toBe(640);
});

