import { ReactNode } from "react";

interface LayerPaneArgs {
  width: number;
  height: number;
  children?: ReactNode;
}

export function LayerPane(options: LayerPaneArgs) {
  const style = {
    container: {
      backgroundColor: "#2d2d2d",
      width: options.width + "px",
      height: options.height + "px",
      border: '0.5px solid #484848'
    },
  };

  return <div style={style.container}>{options.children}</div>;
}
