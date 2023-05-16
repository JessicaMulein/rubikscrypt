# Rubik's Cube Data Transformation

This project provides a unique way to transform data in the fashion of a Rubik's cube. It allows you to load data into a 3D grid (like a Rubik's cube of size N^3) and perform rotations on the data, similar to how you would rotate rows, columns, or layers of a Rubik's cube.

## Classes

The project consists of two main classes:

- `Rubik`: This class represents a single Rubik's cube of data. It provides methods to get and set data at specific coordinates, rotate rows, columns, or layers of the cube, and convert the cube's data to a buffer.

- `RubiksChain`: This class represents a chain of Rubik's cubes. It provides methods to rotate rows, columns, or layers across all cubes in the chain, and convert the chain's data to a buffer.

## Usage

Here's a basic example of how to use these classes:

```javascript
import { Rubik, RubiksChain } from './rubiks';

// Create a new Rubik's cube with size 3 and some data
const cube = new Rubik(3, Buffer.from('Hello, world!'));

// Rotate the first row of the cube
cube.rotateX(0);

// Create a chain of Rubik's cubes from some data
const chain = RubiksChain.make(Buffer.from('Hello, world!'));

// Rotate the first row of all cubes in the chain
chain.rotateX(0);
```

## Encryption

You can use these classes to encrypt data by loading it into a Rubik's cube or chain of cubes and performing a series of rotations. To decrypt the data, simply perform the inverse rotations.

For example, you could encrypt data by rotating the first row of a cube three times, then rotating the second row two times. To decrypt the data, you would rotate the second row two times in the opposite direction, then rotate the first row three times in the opposite direction.

## Cryptographically Secure Padding

When creating a new Rubik's cube, if the provided data does not fill the entire cube, the remaining cells are filled with cryptographically secure random bytes. This ensures that all cubes are fully filled, even if the data does not perfectly fit into a cube.

## Error Handling

The classes in this project perform extensive error checking to ensure that all operations are valid. If an invalid operation is attempted, an error will be thrown.

## Future Work

Future work on this project could include adding more complex rotation operations, improving the efficiency of the rotation methods, and adding support for different types of data.