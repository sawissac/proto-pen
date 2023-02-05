import { CSSProperties } from "react";
import { math_half } from "./proto_math";

export interface ProtoPenElement {
  name: string;
  layer: number;
  w: number;
  h: number;
  position: {
    x: number;
    y: number;
    dx: number;
    dy: number;
  };
  relationship: {
    parent: string[];
    status: boolean;
    children: string[];
  };
  type: string;
  text: string;
  css: CSSProperties;
  className: {
    [x: string]: "shared";
  };
  cssSharedChild: {
    [x: string]: "shared";
  };
}

export function createProtoPenElement(
  name: string,
  layer: number,
  w: number,
  h: number,
  a: number
): ProtoPenElement {
  return {
    name,
    layer,
    w,
    h,
    position: {
      x: a - math_half(w),
      y: a - math_half(h),
      dx: a + math_half(w),
      dy: a + math_half(h),
    },
    type: "Box Model",
    text: "",
    relationship: {
      parent: [],
      status: false,
      children: [],
    },
    css: {},
    className: {},
    cssSharedChild: {},
  };
}
