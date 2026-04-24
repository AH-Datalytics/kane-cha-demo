import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number, digits = 0): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function formatPercent(n: number, digits = 1): string {
  return `${n.toFixed(digits)}%`;
}

export function formatChange(n: number): string {
  const sign = n > 0 ? "+" : "";
  return `${sign}${n.toFixed(1)}`;
}

export const DATA_PALETTE = [
  "rgb(8, 110, 159)", // data-1 deep blue
  "rgb(219, 117, 44)", // data-2 amber
  "rgb(15, 118, 110)", // data-3 teal
  "rgb(124, 58, 107)", // data-4 plum
  "rgb(80, 117, 64)", // data-5 moss
  "rgb(160, 68, 52)", // data-6 clay
];

export const DIVERGING_PALETTE = [
  "rgb(160, 68, 52)", // high disparity - clay
  "rgb(219, 117, 44)",
  "rgb(238, 215, 165)",
  "rgb(200, 215, 210)",
  "rgb(120, 173, 185)",
  "rgb(8, 110, 159)", // low disparity - blue
];

export const SEQUENTIAL_PALETTE = [
  "rgb(237, 242, 247)",
  "rgb(207, 226, 237)",
  "rgb(158, 202, 222)",
  "rgb(100, 171, 204)",
  "rgb(46, 130, 173)",
  "rgb(8, 92, 139)",
  "rgb(21, 62, 104)",
];
