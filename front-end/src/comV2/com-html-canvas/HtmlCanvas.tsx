import React from "react";
import { useAppSelector } from "../../logic/redux-store/hooks";
import { Disabler } from "../helper/Disabler";
import Box from "@mui/material/Box";
import HtmlCanvasSpace from "./HtmlCanvasSpace";
import ScrollRefreshCenterHelper from "./ScrollRefreshCenterHelper";
import ScreenDragMoveHelper from "./ScreenDragMoveHelper";
import ScreenSelect from "./ScreenSelect";
import ElementGen from "./ElementGen";
import PinElement from "./PinElement";
import ScreenClick from "./ScreenClick";

function HtmlCanvas() {
  const UiRedux = useAppSelector((s) => s.ui);
  const toolRedux = useAppSelector((s) => s.tool);
  const canvasRef = React.useRef(null);
  const canvasSpaceRef = React.useRef(null);
  return (
    <Box
      ref={canvasRef}
      overflow="scroll"
      className="canvas-scrollbar"
      width={UiRedux.canvasWidth}
      height={UiRedux.screen.height - 34}
      zIndex={0}
    >
      <ScrollRefreshCenterHelper target={canvasRef}>
        <Disabler.Scroll target={canvasRef}>
          <HtmlCanvasSpace ref={canvasSpaceRef}>
            <ScreenDragMoveHelper
              dragConstraint={canvasRef}
              dragArea={canvasSpaceRef}
            >
              <ScreenClick target={canvasSpaceRef}>
                <ElementGen />
                {toolRedux.selectTool.state ? <ScreenSelect /> : null}
                {toolRedux.moveTool.state ? <PinElement /> : null}
              </ScreenClick>
            </ScreenDragMoveHelper>
          </HtmlCanvasSpace>
        </Disabler.Scroll>
      </ScrollRefreshCenterHelper>
    </Box>
  );
}

export default HtmlCanvas;
