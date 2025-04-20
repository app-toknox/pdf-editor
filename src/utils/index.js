import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as trimCanvasRaw from "trim-canvas";

export function cn(...classes) {
  return twMerge(clsx(...classes));
}



export const trimCanvas = trimCanvasRaw.default || trimCanvasRaw;

