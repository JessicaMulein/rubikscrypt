import { Rubik } from './rubik';
import crypto from 'crypto';

describe('Rubik', () => {
  const size = 3;
  const data = Buffer.from('Hello, world!');
  const rubik = new Rubik(size, data);

  test('constructor', () => {
    expect(rubik.cubeSize).toBe(size);
    expect(rubik.data).toEqual(expect.any(Buffer));
  });

  test('get', () => {
    expect(rubik.get(0, 0, 0)).toBe(data[0]);
    expect(() => rubik.get(size, 0, 0)).toThrow('Invalid x coordinate');
    expect(() => rubik.get(0, size, 0)).toThrow('Invalid y coordinate');
    expect(() => rubik.get(0, 0, size)).toThrow('Invalid z coordinate');
  });

  test('set', () => {
    const value = crypto.randomBytes(1)[0];
    rubik.set(0, 0, 0, value);
    expect(rubik.get(0, 0, 0)).toBe(value);
    expect(() => rubik.set(size, 0, 0, value)).toThrow('Invalid x coordinate');
    expect(() => rubik.set(0, size, 0, value)).toThrow('Invalid y coordinate');
    expect(() => rubik.set(0, 0, size, value)).toThrow('Invalid z coordinate');
    expect(() => rubik.set(0, 0, 0, 256)).toThrow('Invalid value');
    expect(() => rubik.set(0, 0, 0, -1)).toThrow('Invalid value');
  });

  test('rotateX', () => {
    const originalData = Buffer.from(rubik.data);
    rubik.rotateX(0);
    rubik.rotateX(0);
    rubik.rotateX(0);
    rubik.rotateX(0);
    expect(rubik.data).toEqual(originalData);
    expect(() => rubik.rotateX(size)).toThrow('Invalid x coordinate');
  });

  test('rotateXN', () => {
    const originalData = Buffer.from(rubik.data);
    rubik.rotateXN(0, 4);
    expect(rubik.data).toEqual(originalData);
    expect(() => rubik.rotateXN(size, 1)).toThrow('Invalid x coordinate');
    expect(() => rubik.rotateXN(0, 0)).toThrow('Invalid rotation count');
  });

  // Similar tests can be written for rotateY, rotateYN, rotateZ, rotateZN
});
