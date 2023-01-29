import { color } from "./color";

export const border = (color: string) => {
  return `0.5px solid ${color}`;
};

export const setPx = (x: number) => {
  return x ? x + "px" : 0;
};

export const setPad = (px: number, py: number) => {
  return px && py ? `${py}px ${px}px` : "5px 7px";
};

export const isExist = (target: any, replace: any) => {
  return target ? target : replace;
};

export const boxShadow = (active: boolean, selected: boolean) => {
  return active
    ? `0px 0px 0px 2px ${color.secondary},${color.shadow} 0px 4px 8px 2px`
    : selected
    ? `0px 0px 0px 2px ${color.purple},${color.shadow} 0px 4px 8px 2px`
    : `${color.shadow} 0px 4px 8px 2px`;
};
