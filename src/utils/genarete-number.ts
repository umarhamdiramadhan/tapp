export function generateRandomFrom1To3000() {
    const min = 1;
    const max = 3000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  