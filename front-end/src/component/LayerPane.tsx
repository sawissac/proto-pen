import { CSSProperties, ReactNode } from "react";
import { color } from "../logic/theme/color";
import { border, isExist, setPx } from "../logic/theme/property";

interface LayerPaneArgs {
  w?: number;
  h?: number;
  flowY?: boolean;
  style?: CSSProperties;
  className?: string;
  direction?: "row" | "column";
  children?: ReactNode;
  justify?: string;
  ali?: string;
  r?: number;
}

export function LayerPane(options: LayerPaneArgs) {
  const style: CSSProperties = {
    width: setPx(options.w as number),
    height: setPx(options.h as number),
    flexDirection: isExist(options.direction, "row"),
    border: border(color.primaryHalf),
    borderRadius: isExist(options.r, 0),
    overflowY: options.flowY ? "scroll" : "hidden",
    backgroundColor: color.primary,
    boxSizing: "border-box",
    display: "flex",
    alignItems: isExist(options.ali, "center"),
    justifyContent: isExist(options.justify, "center"),
    overflowX: "hidden",
    ...options.style,
  };

  return (
    <div style={style} className={options.className}>
      {options.children}
    </div>
  );
}
