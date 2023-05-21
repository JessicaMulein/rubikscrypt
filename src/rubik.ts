import crypto from "crypto";

/** We load data into rubiks cubes of N^3 size */
export class Rubik {
    public readonly cubeSize: number;
    public readonly data: Buffer;
    constructor(cubeSize: number, data: Buffer) {
        const sizeMax = cubeSize * cubeSize * cubeSize;
        if (cubeSize < 2 || cubeSize > 256) throw new Error("Invalid size");
        if (data.length > sizeMax) throw new Error("Data too large");
        this.cubeSize = cubeSize;
        this.data = data || Buffer.alloc(sizeMax);
        // pad the rest with random data
        const padding = crypto.randomBytes(sizeMax - data.length);
        padding.copy(this.data, data.length);
    }
    public get(x: number, y: number, z: number): number {
        if (x < 0 || x >= this.cubeSize) throw new Error("Invalid x coordinate");
        if (y < 0 || y >= this.cubeSize) throw new Error("Invalid y coordinate");
        if (z < 0 || z >= this.cubeSize) throw new Error("Invalid z coordinate");
        return this.data[x + this.cubeSize * (y + this.cubeSize * z)];
    }
    public set(x: number, y: number, z: number, value: number): void {
        if (value < 0 || value > 255) throw new Error("Invalid value");
        if (x < 0 || x >= this.cubeSize) throw new Error("Invalid x coordinate");
        if (y < 0 || y >= this.cubeSize) throw new Error("Invalid y coordinate");
        if (z < 0 || z >= this.cubeSize) throw new Error("Invalid z coordinate");
        this.data[x + this.cubeSize * (y + this.cubeSize * z)] = value;
    }
    public rotateX(x: number, n: number = 1): void {
        if (n < 1) throw new Error("Invalid rotation count");
        if (x < 0 || x >= this.cubeSize) throw new Error("Invalid x coordinate");
    
        const size = this.cubeSize;
        const data = this.data;
        const temp = Buffer.alloc(size * size);
        const rotations = ((n % 4) + 4) % 4; // ensures the result is always between 0 and 3
    
        // Loop through each cell in the slice at x
        for (let y = 0; y < size; y++) {
            for (let z = 0; z < size; z++) {
                let newY, newZ;
    
                // Determine the new coordinates after rotation
                switch (rotations) {
                    case 1: // 90 degrees counterclockwise
                        newY = z;
                        newZ = size - y - 1;
                        break;
                    case 2: // 180 degrees
                        newY = size - y - 1;
                        newZ = size - z - 1;
                        break;
                    case 3: // 90 degrees clockwise
                        newY = size - z - 1;
                        newZ = y;
                        break;
                    default: // 0 degrees
                        newY = y;
                        newZ = z;
                        break;
                }
    
                // Copy the cell to the temporary buffer
                temp[newY + size * newZ] = data[x + size * (y + size * z)];
            }
        }
    
        // Copy the rotated data from the temporary buffer back to the cube
        for (let y = 0; y < size; y++) {
            for (let z = 0; z < size; z++) {
                data[x + size * (y + size * z)] = temp[y + size * z];
            }
        }
    }    
    public rotateY(y: number, n: number = 1): void {
        if (n < 1) throw new Error("Invalid rotation count");
        if (y < 0 || y >= this.cubeSize) throw new Error("Invalid y coordinate");
        const size = this.cubeSize;
        const data = this.data;
        const temp = Buffer.alloc(size * size);
        const rotations = ((n % 4) + 4) % 4; // ensures the result is always between 0 and 3
    
        for (let x = 0; x < size; x++) {
            for (let z = 0; z < size; z++) {
                let newX, newZ;
                switch (rotations) {
                    case 1: // 90 degrees counterclockwise
                        newX = z;
                        newZ = size - x - 1;
                        break;
                    case 2: // 180 degrees
                        newX = size - x - 1;
                        newZ = size - z - 1;
                        break;
                    case 3: // 90 degrees clockwise
                        newX = size - z - 1;
                        newZ = x;
                        break;
                    default: // 0 degrees
                        newX = x;
                        newZ = z;
                        break;
                }
                temp[newX + size * newZ] = data[newX + size * (y + size * newZ)];
            }
        }
    
        for (let x = 0; x < size; x++) {
            for (let z = 0; z < size; z++) {
                data[x + size * (y + size * z)] = temp[x + size * z];
            }
        }
    }    
    public rotateZ(z: number, n: number = 1): void {
        if (n < 1) throw new Error("Invalid rotation count");
        if (z < 0 || z >= this.cubeSize) throw new Error("Invalid z coordinate");
        const size = this.cubeSize;
        const data = this.data;
        const temp = Buffer.alloc(size * size);
        const rotations = ((n % 4) + 4) % 4; // ensures the result is always between 0 and 3
    
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                let newX, newY;
                switch (rotations) {
                    case 1: // 90 degrees counterclockwise
                        newX = y;
                        newY = size - x - 1;
                        break;
                    case 2: // 180 degrees
                        newX = size - x - 1;
                        newY = size - y - 1;
                        break;
                    case 3: // 90 degrees clockwise
                        newX = size - y - 1;
                        newY = x;
                        break;
                    default: // 0 degrees
                        newX = x;
                        newY = y;
                        break;
                }
                temp[newX + size * newY] = data[newX + size * (newY + size * z)];
            }
        }
    
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                data[x + size * (y + size * z)] = temp[x + size * y];
            }
        }
    }
    public toBuffer(): Buffer {
        return this.data;
    }
    public static fromBuffer(size: number, data: Buffer): Rubik {
        return new Rubik(size, data);
    }
}