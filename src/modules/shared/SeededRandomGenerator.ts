/*
* Generates a random number from a seed provided as a string.
*/

/* eslint no-bitwise: "off" */

/*
* * Generates random numbers from a seed, but combining with the standard Math.random()
* to generate random results for the user not just per user.
* Code pulled from
* https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
*/
const simpleRandom = (seed: number): () => number => {
  let x = seed;
  return () => {
    x += 0x6D2B79F5;
    let t = x;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
};

// Hash 'string' to a small number
const stringToNumberHash = (x: string, digits: number): number => {
  const m = 10 ** (digits + 1) - 1;
  const phi = 10 ** digits / 2 - 1;
  const calculateHash = (acc: number, char: string): number =>
    (acc + phi * char.charCodeAt(0)) % m;
  return [...x].reduce(calculateHash, 0);
};

const SeededRandomGenerator = (seed: string): (() => number) => {
  return simpleRandom(stringToNumberHash(seed, 8));
};

export default SeededRandomGenerator;
