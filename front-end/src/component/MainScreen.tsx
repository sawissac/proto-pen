import { ReactNode, forwardRef } from "react";
import { Ui } from "../logic/UiDefaultValue";

interface MainScreenPaneArgs {
  width: number;
  height: number;
  children?: ReactNode;
}

export const MainScreenPane = forwardRef((options: MainScreenPaneArgs, ref: any) => {
    let calculatedWidth = options.width - (Ui.layerPane.width + Ui.ActionLayerPane.width);
    const style = {
      container: {
        overflow: "hidden",
        width: calculatedWidth + "px",
        height: options.height + "px",
        backgroundColor: "#ffffff",
      },
    };
    return (
      <div ref={ref} style={style.container}>
        {options.children}
      </div>
    );
  }
);
