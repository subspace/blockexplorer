import { BigNumber } from "@ethersproject/bignumber";
import { formatUnits } from "@ethersproject/units";

export const shortString = (
  value: string,
  initialLength = 6,
  endLength = -4
): string => `${value.slice(0, initialLength)}...${value.slice(endLength)}`;

export const generateArrayOfNumbers = (length: number): number[] => {
  return Array.from(Array(length).keys());
};

export const formatSpacePledged = (value: number) => {
  const TB = 1024 * 1024 * 1024 * 1024;
  const GB = 1024 * 1024 * 1024;
  const MB = 1024 * 1024;

  if (value >= TB) {
    return `${Math.round((value * 100) / TB) / 100} TB`;
  } else if (value >= GB) {
    return `${Math.round((value * 100) / GB) / 100} GB`;
  } else {
    return `${Math.round((value * 100) / MB) / 100} MB`;
  }
};

export const bigNumberToNumber = (
  bigNumber: BigNumber,
  decimals: number
): number => {
  const number = Number(formatUnits(bigNumber, decimals));

  return limitNumberDecimals(number);
};

export const limitNumberDecimals = (number: number, precision = 2): number => {
  if (number === 0) {
    return number;
  }

  const [integer, decimals] = String(number).split(".");

  if (!decimals) return Number(integer);

  const decimalsToUse = decimals.slice(0, precision);

  return Number(integer + "." + decimalsToUse);
};
