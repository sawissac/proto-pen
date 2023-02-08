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
    ? `0px 0px 0px 2px ${color.white},0px 0px 0px 4px ${color.secondary}`
    : selected
    ? `0px 0px 0px 2px ${color.white},0px 0px 0px 4px ${color.purple}`
    : `none`;
};

export const background = (active: boolean, selected: boolean) => {
  return active ? color.secondary : selected ? color.purple : color.primary;
};

export const _if = (value: any, meet: any, trueV: any, falseV: any) => {
  return value === meet ? trueV : falseV;
};

export const radius = (tl: number,tr: number,br: number,bl: number): string=>{
  return `${setPx(tl)} ${setPx(tr)} ${setPx(br)} ${setPx(bl)}`;
}