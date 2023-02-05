import React, { CSSProperties } from "react";
import { border, isExist, setPad, setPx } from "../../logic/theme/property";
import { color } from "../../logic/theme/color";

interface MessageDialogBoxArgs {
  h?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const ToolBox = React.forwardRef(
  (options: MessageDialogBoxArgs, ref: any) => {
    const styles: React.CSSProperties = {
      height: setPx(options.h as number),
      backgroundColor: color.primary,
      border: border(color.primaryHalf),
      zIndex: 9999,
      cursor: "pointer",
      width: "300px",
      position: "absolute",
      borderRadius: "7px",
      userSelect: "none",
      overflow: "hidden",
      ...options.style,
    };
    return (
      <div ref={ref} style={styles}>
        {options.children}
      </div>
    );
  }
);

interface TitleArgs {
  px?: number;
  py?: number;
  value?: string;
  txtAli?: "center" | "left" | "right";
}

export function Title(options: TitleArgs) {
  const style: CSSProperties = {
    color: color.white,
    padding: setPad(options.px as number, options.py as number),
    textAlign: options.txtAli ? options.txtAli : "center",
    width: "100%"
  };
  return <h5 style={style}>{options.value}</h5>;
}

interface DividerArgs {
  color?: string;
}

export function Divider(options: DividerArgs) {
  return <hr color={isExist(options.color, color.primaryHalf)} style={{width: "100%"}}/>;
}
