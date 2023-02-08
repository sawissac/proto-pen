import React, { Children } from "react";

export const SelectScreenBox = React.forwardRef((options: any, ref: any) => {
  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        width: 0,
        height: 0,
        backgroundColor: "#0000ff2e",
        zIndex: 9998,
      }}
    ></div>
  );
});

export const SelectScreenArea = React.forwardRef((options: any, ref: any) => {
  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "transparent",
        zIndex: 9999,
      }}
    >
      {options.children}
    </div>
  );
});
