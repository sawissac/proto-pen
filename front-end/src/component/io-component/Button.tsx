import React, { CSSProperties } from "react";
import { generateButtonTheme } from "../../logic/theme/button";
import { color } from "../../logic/theme/color";
import { border, isExist, setPx } from "../../logic/theme/property";

interface ProtoPenButtonInterface {
  w?: number;
  h?: number;
  style?: React.CSSProperties;
  listener?: any;
  children?: React.ReactNode;
  title?: string;
  primary?: boolean;
  r?: number;
  px?: number;
  py?: number;
  className?: string;
}

function Toggle(options: ProtoPenButtonInterface) {
  const [toggle, setToggle] = React.useState(false);
  const btnStyle = {
    ...generateButtonTheme(
      options.w as number,
      options.h as number,
      options.r as number,
      options.px as number,
      options.py as number
    ),
    backgroundColor: toggle ? color.secondary : color.primary,
    ...options.style,
  };

  React.useEffect(() => {
    if (options.listener) options.listener(toggle);
  }, [toggle]);

  return (
    <button
      type="button"
      title={isExist(options.title, "toggle-button")}
      style={btnStyle}
      onClick={() => {
        setToggle((state) => !state);
      }}
    >
      {options.children}
    </button>
  );
}

function Click(options: ProtoPenButtonInterface) {
  const btnStyle = {
    ...generateButtonTheme(
      options.w as number,
      options.h as number,
      options.r as number,
      options.px as number,
      options.py as number
    ),
    backgroundColor: options.primary ? color.primary : color.secondary,
    ...options.style,
  };

  return (
    <button
      type="button"
      title={isExist(options.title, "click-button")}
      style={btnStyle}
      className={options.className}
      onClick={options.listener}
    >
      {options.children}
    </button>
  );
}
interface LabelInterface {
  label?: string;
  laW?: number;
}

function Label(options: ProtoPenButtonInterface & LabelInterface) {
  const btnStyle = {
    ...generateButtonTheme(
      options.w as number,
      options.h as number,
      options.r as number,
      options.px as number,
      options.py as number
    ),
    border: border(color.primaryHalf),
    backgroundColor: options.primary ? color.primary : color.secondary,
    ...options.style,
  };

  const labelStyle: CSSProperties = {
    width: setPx(options.laW as number),
    height: "max-content",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "bold"
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <label style={labelStyle}>{options.label}</label>
      <button
        type="button"
        title={isExist(options.title, "click-button")}
        style={btnStyle}
        onClick={options.listener}
      >
        {options.children}
      </button>
    </div>
  );
}
export const Button = {
  Toggle: React.memo(Toggle),
  Click: React.memo(Click),
  Label: React.memo(Label),
};
