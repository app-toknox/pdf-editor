import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as trimCanvasRaw from "trim-canvas";

import {
  BASE_POSITION_X,
  BASE_POSITION_Y,
  VERTICAL_DISTANCE,
} from "../config/constant";

export function cn(...classes) {
  return twMerge(clsx(...classes));
}

export const trimCanvas = trimCanvasRaw.default || trimCanvasRaw;

export const getBasePosition = (itemIndex, delta) => {
  return {
    x: BASE_POSITION_X + (delta ? delta.x : 0),
    y: BASE_POSITION_Y + VERTICAL_DISTANCE * itemIndex + (delta ? delta.y : 0),
  };
};
