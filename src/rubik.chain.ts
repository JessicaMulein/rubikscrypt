import { Rubik } from "./rubik";

export class RubiksChain {
    public readonly cubeSize: number;
    public readonly rubiks: Rubik[];
    constructor(size: number, rubiks: Rubik[]) {
        this.cubeSize = size;
        this.rubiks = rubiks;
        // validate the rubiks
        for (const rubik of rubiks) {
            if (rubik.cubeSize !== size) throw new Error("Invalid rubik cube size");
        }
    }
    public static make(data: Buffer): RubiksChain {
        // how many cubes does it take to hold the data?
        const size = Math.ceil(Math.pow(data.length, 1/3));
        const sizeMax = size * size * size;
        const count = Math.ceil(data.length / sizeMax);

        const rubiks: Rubik[] = [];
        for (let i = 1; i < data.length; i += sizeMax + 1) {
            // data.slice is deprecated
            // data.slice(i, i + size * size * size)
            const d = data.subarray(i, i + sizeMax)
            rubiks.push(Rubik.fromBuffer(size, d));
        }
        return new RubiksChain(size, rubiks);
    }
    public rotateX(x: number, n: number): void {
        if (n < 1) throw new Error("Invalid rotation count");
        if (x < 0 || x >= this.cubeSize) throw new Error("Invalid x coordinate");
        for (const rubik of this.rubiks) {
            if (n != 1) {
                rubik.rotateXN(x, n);
            } else {
                rubik.rotateX(x);
            }
        }
    }
    public rotateY(y: number, n: number): void {
        if (n < 1) throw new Error("Invalid rotation count");
        if (y < 0 || y >= this.cubeSize) throw new Error("Invalid y coordinate");
        for (const rubik of this.rubiks) {
            if(n != 1) {
                rubik.rotateYN(y, n);
            } else {
                rubik.rotateY(y);
            }
        }
    }
    public rotateZ(z: number, n: number): void {
        if (n < 1) throw new Error("Invalid rotation count");
        if (z < 0 || z >= this.cubeSize) throw new Error("Invalid z coordinate");
        for (const rubik of this.rubiks) {
            if (n != 1) {
                rubik.rotateZN(z, n);
            } else {
                rubik.rotateZ(z);
            }
        }
    }
    public swapRubiks(a: number, b: number): void {
        if (a <0 || a>= this.rubiks.length) throw new Error("Invalid rubik index");
        if (b <0 || b>= this.rubiks.length) throw new Error("Invalid rubik index");
        const temp = this.rubiks[a];
        this.rubiks[a] = this.rubiks[b];
        this.rubiks[b] = temp;
    }
    public toBuffer(): Buffer {
        const size = this.cubeSize;
        const sizeMax = size * size * size;
        const count = this.rubiks.length;
        const data = Buffer.alloc(1 + count * sizeMax);
        data[0] = size;
        for (let i = 0; i < count; i++) {
            const rubik = this.rubiks[i];
            const offset = 1 + i * sizeMax;
            rubik.data.copy(data, offset, 0, sizeMax);
        }
        return data;
    }
}