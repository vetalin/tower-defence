export const getRandomDigit = (max: number): number => {
  return Math.round(Math.random() * max);
};

export const getBlankArray = (length: number): number[] => {
  return Array.from({ length }, (_, i) => i);
};
