import { Rubik } from './rubik';
import crypto from 'crypto';

describe('Rubik', () => {
    const size = 3;
    const data = Buffer.alloc(size);
    for (let i = 0; i < size; i++) {
        data[i] = i % 256
    }
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
        expect(() => rubik.rotateX(size,1)).toThrow('Invalid x coordinate');
    });

    test('rotateX2', () => {
        const rubik2 = new Rubik(size, Buffer.from(rubik.data));
          rubik.rotateX(0, 1);
          rubik.rotateX(0, 2);
          rubik2.rotateX(0, 3);
          expect(rubik.data).toEqual(rubik2.data);
        expect(() => rubik.rotateX(size)).toThrow('Invalid x coordinate');
      });

    test('rotateXN', () => {
        const originalData = Buffer.from(rubik.data);
        rubik.rotateX(0, 4);
        expect(rubik.data).toEqual(originalData);
        expect(() => rubik.rotateX(size, 1)).toThrow('Invalid x coordinate');
        expect(() => rubik.rotateX(0, 0)).toThrow('Invalid rotation count');
    });

    test('rotateY', () => {
        const originalData = Buffer.from(rubik.data);
        rubik.rotateY(0);
        rubik.rotateY(0);
        rubik.rotateY(0);
        rubik.rotateY(0);
        expect(rubik.data).toEqual(originalData);
        expect(() => rubik.rotateY(size)).toThrow('Invalid y coordinate');
    });
    test('rotateY2', () => {
        const rubik2 = new Rubik(size, Buffer.from(rubik.data));
          rubik.rotateY(0, 1);
          rubik.rotateY(0, 2);
          rubik2.rotateY(0, 3);
          expect(rubik.data).toEqual(rubik2.data);
        expect(() => rubik.rotateY(size)).toThrow('Invalid y coordinate');
      });

    test('rotateYN', () => {
        const originalData = Buffer.from(rubik.data);
        rubik.rotateY(0, 4);
        expect(rubik.data).toEqual(originalData);
        expect(() => rubik.rotateY(size, 1)).toThrow('Invalid y coordinate');
        expect(() => rubik.rotateY(0, 0)).toThrow('Invalid rotation count');
    });

    test('rotateZ', () => {
        const originalData = Buffer.from(rubik.data);
        rubik.rotateZ(0);
        rubik.rotateZ(0);
        rubik.rotateZ(0);
        rubik.rotateZ(0);
        expect(rubik.data).toEqual(originalData);
        expect(() => rubik.rotateZ(size)).toThrow('Invalid z coordinate');
    });

    test('rotateZ2', () => {
        const rubik2 = new Rubik(size, Buffer.from(rubik.data));
          rubik.rotateZ(0, 1);
          rubik.rotateZ(0, 2);
          rubik2.rotateZ(0, 3);
          expect(rubik.data).toEqual(rubik2.data);
        expect(() => rubik.rotateZ(size)).toThrow('Invalid z coordinate');
      });


    test('rotateZN', () => {
        const originalData = Buffer.from(rubik.data);
        rubik.rotateZ(0, 4);
        expect(rubik.data).toEqual(originalData);
        expect(() => rubik.rotateZ(size, 1)).toThrow('Invalid z coordinate');
        expect(() => rubik.rotateZ(0, 0)).toThrow('Invalid rotation count');
    });
});
