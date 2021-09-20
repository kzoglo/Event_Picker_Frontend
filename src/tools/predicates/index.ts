import { IComparableTypes } from './types';

export const isEqual = (x: IComparableTypes, y: IComparableTypes): boolean => {
  return x === y;
};

export const isLower = (x: number, y: number) => y > x;
