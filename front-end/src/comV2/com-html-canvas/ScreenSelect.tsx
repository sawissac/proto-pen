import React from "react";
import { Paper } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../logic/redux-store/hooks";
import { current, eventListener } from "../../logic/proto_pen_method/proto_event";
import { setCursorSelectArea } from "../../logic/redux-store/feature/UserInterfaceSlice";
import { blue } from "@mui/material/colors";
import { setSelectedElement } from "../../logic/redux-store/feature/ElementObjectSlice";

function ScreenSelect() {
  const UiRedux = useAppSelector((s) => s.ui);
  const elementObjRedux = useAppSelector((s) => s.object);
  const toolRedux = useAppSelector((s) => s.tool);
  const dispatch = useAppDispatch();
  const selectScreenAreaRef = React.useRef(null);
  const selectScreenRef = React.useRef(null);
  React.useEffect(() => {
    let currentOffset = { x: 0, y: 0 };
    let preOffset = { x: 0, y: 0 };
    let offset = { x: 0, y: 0, dx: 0, dy: 0 };
    let isDrag = false;
    let isSelectOn = toolRedux.selectTool.state;
    let canvasSpaceSelectArea = current(selectScreenAreaRef);

    function boxPosition(x: number, y: number, width: number, height: number) {
      if (selectScreenRef) {
        const selectBox = current(selectScreenRef);
        selectBox.style.left = x + "px";
        selectBox.style.top = y + "px";
        selectBox.style.width = width + "px";
        selectBox.style.height = height + "px";
      }
    }
    function mouseDownHandler(ev: MouseEvent) {
      //! box select event
      isDrag = true;
      preOffset.x = ev.offsetX;
      preOffset.y = ev.offsetY;
    }
    function mouseLeaveHandler() {
      //! box select event
      isDrag = false;
    }
    function mouseMoveHandler(ev: MouseEvent) {
      //! box select event
      if (isDrag && isSelectOn) {
        currentOffset.x = ev.offsetX;
        currentOffset.y = ev.offsetY;
        if (currentOffset.x > preOffset.x && currentOffset.y > preOffset.y) {
          boxPosition(preOffset.x, preOffset.y, currentOffset.x - preOffset.x - 5, currentOffset.y - preOffset.y - 5);
          offset = {
            x: preOffset.x,
            y: preOffset.y,
            dx: preOffset.x + currentOffset.x - preOffset.x - 5,
            dy: preOffset.y + currentOffset.y - preOffset.y - 5,
          };
        } else if (currentOffset.x > preOffset.x && currentOffset.y < preOffset.y) {
          boxPosition(preOffset.x, currentOffset.y + 20, currentOffset.x - preOffset.x - 5, preOffset.y - currentOffset.y - 5);
          offset = {
            x: preOffset.x,
            y: currentOffset.y + 20,
            dx: preOffset.x + currentOffset.x - preOffset.x - 5,
            dy: currentOffset.y + 20 + preOffset.y - currentOffset.y - 5,
          };
        } else if (currentOffset.x < preOffset.x && currentOffset.y > preOffset.y) {
          boxPosition(currentOffset.x, preOffset.y, preOffset.x - currentOffset.x - 5, currentOffset.y - preOffset.y - 5);
          offset = {
            x: currentOffset.x,
            y: preOffset.y,
            dx: currentOffset.x + preOffset.x - currentOffset.x - 5,
            dy: preOffset.y + currentOffset.y - preOffset.y - 5,
          };
        } else if (currentOffset.x < preOffset.x && currentOffset.y < preOffset.y) {
          boxPosition(currentOffset.x + 20, currentOffset.y + 20, preOffset.x - currentOffset.x, preOffset.y - currentOffset.y);
          offset = {
            x: currentOffset.x + 20,
            y: currentOffset.y + 20,
            dx: currentOffset.x + 20 + preOffset.x - currentOffset.x,
            dy: currentOffset.y + 20 + preOffset.y - currentOffset.y,
          };
        }
      }
    }
    function mouseUpHandler() {
      dispatch(setCursorSelectArea({ cursorSelectArea: offset }));
      boxPosition(0, 0, 0, 0);
      preOffset = { x: 0, y: 0 };
      currentOffset = { x: 0, y: 0 };
      isDrag = false;
    }
    const reDown = eventListener("mousedown", canvasSpaceSelectArea, mouseDownHandler);
    const reLeave = eventListener("mouseLeave", canvasSpaceSelectArea, mouseLeaveHandler);
    const reUp = eventListener("mouseup", canvasSpaceSelectArea, mouseUpHandler);
    const reMove = eventListener("mousemove", canvasSpaceSelectArea, mouseMoveHandler);

    return () => {
      reDown();
      reLeave();
      reUp();
      reMove();
    };
  }, [toolRedux.selectTool.state]);

  //! add selected element
  React.useEffect(() => {
    let elementArr: any = Object.values(elementObjRedux.elementObjectData);
    let activeElement = elementObjRedux.activeElement;

    let result = elementArr
      .filter((i: any) => {
        return (
          i.position.x >= UiRedux.cursorSelectArea.x &&
          i.position.y >= UiRedux.cursorSelectArea.y &&
          i.position.x <= UiRedux.cursorSelectArea.dx &&
          i.position.y <= UiRedux.cursorSelectArea.dy &&
          i.name !== activeElement
        );
      })
      .map((i: any) => i.name);

    dispatch(setSelectedElement(result));
  }, [UiRedux.cursorSelectArea]);

  return (
    <SelectScreenArea ref={selectScreenAreaRef}>
      <SelectScreenBox ref={selectScreenRef} />
    </SelectScreenArea>
  );
}

export default ScreenSelect;

export const SelectScreenBox = React.forwardRef((options: any, ref: any) => {
  return (
    <Paper
      ref={ref}
      elevation={0}
      sx={{
        borderRadius: 0,
        position: "absolute",
        width: 0,
        height: 0,
        backgroundColor: blue[600],
        opacity: 0.2,
      }}
    ></Paper>
  );
});

export const SelectScreenArea = React.forwardRef((options: any, ref: any) => {
  return (
    <Paper
      ref={ref}
      sx={{
        position: "absolute",
        inset: 0,
        backgroundColor: "transparent",
        zIndex: 999,
      }}
    >
      {options.children}
    </Paper>
  );
});
