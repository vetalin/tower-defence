export const getRandomDigit = (max: number): number => {
  return Math.round(Math.random() * max);
};

export const getRandomDigitMinMax = (min: number, max: number): number => {
  return Math.round(Math.random() * (max - min) + min);
};

export const getBlankArray = (length: number): number[] => {
  return Array.from({ length }, (_, i) => i);
};

export const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
