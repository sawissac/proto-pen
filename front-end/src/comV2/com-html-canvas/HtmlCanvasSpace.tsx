import React from "react";
import Box from "@mui/material/Box";
import { useAppSelector } from "../../logic/redux-store/hooks";

const HtmlCanvasSpace = React.forwardRef(
  (props: { children?: any }, ref: any) => {
    const UiRedux = useAppSelector((s) => s.ui);
    return (
      <Box
        ref={ref}
        className="dot-background"
        width={UiRedux.canvasSpaceSize}
        height={UiRedux.canvasSpaceSize}
        position={"relative"}
      >
        {props.children}
      </Box>
    );
  }
);

export default HtmlCanvasSpace;
