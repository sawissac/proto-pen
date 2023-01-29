import React, { CSSProperties, forwardRef, useEffect, useRef } from "react";
import CustomStyle from "../../custom.module.css";
import {
  current,
  listener,
  removeListener,
} from "../../logic/proto_pen_method/proto_event";
import { math_half } from "../../logic/proto_pen_method/proto_math";
import { useAppDispatch, useAppSelector } from "../../logic/redux-store/hooks";
import { changeToolsPos } from "../../logic/redux-store/feature/ToolSlice";
import {
  setActiveElement,
  setActiveElementPos,
  setSelectedElement,
} from "../../logic/redux-store/feature/ElementObjectSlice";
import { setCursorSelectArea } from "../../logic/redux-store/feature/UserInterfaceSlice";
import { ProtoPenElement } from "../../logic/proto_pen_method/proto_create_element";
import { NodeModel } from "./NodeModel";
import { Pin } from "./Pin";
import { boxShadow } from "../../logic/theme/property";
import { SelectScreenBox } from "./SelectScreenBox";
import { RecursiveElement } from "./RecursiveElement";
import { MoveElement } from "./MoveElement";

export const ScreenPane = React.forwardRef((options: any, canvasRef: any) => {
  const toolRedux = useAppSelector((state) => state.tool);
  const userInterfaceRedux = useAppSelector((state) => state.userInterface);
  const elementObjectRedux = useAppSelector((state) => state.elementObject);
  const dispatch = useAppDispatch();

  const canvasSpaceRef = useRef(null);
  const selectBoxRef = useRef(null);
  const pinRef = useRef(null);

  const styles: { [options: string]: CSSProperties } = {
    canvas: {
      width: userInterfaceRedux.canvasWidth + "px",
      height: userInterfaceRedux.screen.height + "px",
      backgroundColor: "#ffffff",
      overflow: "scroll",
      position: "relative",
    },
    canvasSpace: {
      width: `${userInterfaceRedux.canvasSpaceSize}px`,
      height: `${userInterfaceRedux.canvasSpaceSize}px`,
      position: "relative",
    },
  };

  //! canvas Scroll
  useEffect(() => {
    const canvas = current(canvasRef);
    const canvasSpaceSize = math_half(userInterfaceRedux.canvasSpaceSize);
    const screenWidth = math_half(userInterfaceRedux.canvasWidth);
    const screenHeight = math_half(userInterfaceRedux.screen.height);

    canvas.scrollTo({
      behavior: "smooth",
      top: canvasSpaceSize - screenHeight,
      left: canvasSpaceSize - screenWidth,
    });
  }, [userInterfaceRedux.screen.width]);

  //! pointer select
  useEffect(() => {
    let currentOffset = { x: 0, y: 0 };
    let preOffset = { x: 0, y: 0 };
    let offset = { x: 0, y: 0, dx: 0, dy: 0 };
    let isDrag = false;
    let isHandMove = userInterfaceRedux.handMove;
    let canvasSpace = current(canvasSpaceRef);

    function boxPosition(x: number, y: number, width: number, height: number) {
      if (selectBoxRef) {
        const selectBox = current(selectBoxRef);
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
      if (isDrag && !isHandMove) {
        currentOffset.x = ev.offsetX;
        currentOffset.y = ev.offsetY;
        if (currentOffset.x > preOffset.x && currentOffset.y > preOffset.y) {
          boxPosition(
            preOffset.x,
            preOffset.y,
            currentOffset.x - preOffset.x - 5,
            currentOffset.y - preOffset.y - 5
          );
          offset = {
            x: preOffset.x,
            y: preOffset.y,
            dx: preOffset.x + currentOffset.x - preOffset.x - 5,
            dy: preOffset.y + currentOffset.y - preOffset.y - 5,
          };
        } else if (
          currentOffset.x > preOffset.x &&
          currentOffset.y < preOffset.y
        ) {
          boxPosition(
            preOffset.x,
            currentOffset.y + 20,
            currentOffset.x - preOffset.x - 5,
            preOffset.y - currentOffset.y - 5
          );
          offset = {
            x: preOffset.x,
            y: currentOffset.y + 20,
            dx: preOffset.x + currentOffset.x - preOffset.x - 5,
            dy: currentOffset.y + 20 + preOffset.y - currentOffset.y - 5,
          };
        } else if (
          currentOffset.x < preOffset.x &&
          currentOffset.y > preOffset.y
        ) {
          boxPosition(
            currentOffset.x,
            preOffset.y,
            preOffset.x - currentOffset.x - 5,
            currentOffset.y - preOffset.y - 5
          );
          offset = {
            x: currentOffset.x,
            y: preOffset.y,
            dx: currentOffset.x + preOffset.x - currentOffset.x - 5,
            dy: preOffset.y + currentOffset.y - preOffset.y - 5,
          };
        } else if (
          currentOffset.x < preOffset.x &&
          currentOffset.y < preOffset.y
        ) {
          boxPosition(
            currentOffset.x + 20,
            currentOffset.y + 20,
            preOffset.x - currentOffset.x,
            preOffset.y - currentOffset.y
          );
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
      dispatch(setCursorSelectArea(offset));
      boxPosition(0, 0, 0, 0);
      preOffset = { x: 0, y: 0 };
      currentOffset = { x: 0, y: 0 };
      isDrag = false;
    }
    function mouseClickHandler(ev: MouseEvent) {
      if (ev.ctrlKey) {
        dispatch(
          changeToolsPos({
            name: "pin",
            position: {
              x: ev.offsetX,
              y: ev.offsetY - 20,
            },
          })
        );
      }
    }

    listener("mousedown", canvasSpace, mouseDownHandler);
    listener("mouseLeave", canvasSpace, mouseLeaveHandler);
    listener("mouseup", canvasSpace, mouseUpHandler);
    listener("mousemove", canvasSpace, mouseMoveHandler);
    listener("click", canvasSpace, mouseClickHandler);

    return () => {
      removeListener("mousedown", canvasSpace, mouseDownHandler);
      removeListener("mouseLeave", canvasSpace, mouseLeaveHandler);
      removeListener("mouseup", canvasSpace, mouseUpHandler);
      removeListener("mousemove", canvasSpace, mouseMoveHandler);
      removeListener("click", canvasSpace, mouseClickHandler);
    };
  }, [userInterfaceRedux.handMove]);

  //! canvas hand move
  useEffect(() => {
    let canvas = current(canvasRef);
    let canvasSpace = current(canvasSpaceRef);
    let isDrag = false;

    function mouseDownHandler() {
      isDrag = true;
    }
    function mouseUpHandler() {
      isDrag = false;
    }
    function mouseMoveHandler(ev: MouseEvent) {
      if (isDrag && userInterfaceRedux.handMove) {
        canvas.scrollTo({
          left: canvas.scrollLeft - ev.movementX * 1.2,
          top: canvas.scrollTop - ev.movementY * 1.2,
        });
      }
    }

    listener("mousemove", canvasSpace, mouseMoveHandler);
    listener("mousedown", canvasSpace, mouseDownHandler);
    listener("mouseup", canvasSpace, mouseUpHandler);

    return () => {
      removeListener("mousemove", canvasSpace, mouseMoveHandler);
      removeListener("mousedown", canvasSpace, mouseDownHandler);
      removeListener("mouseup", canvasSpace, mouseUpHandler);
    };
  }, [userInterfaceRedux.handMove]);

  //! add selected element
  useEffect(() => {
    let elementArr: any = Object.values(elementObjectRedux.elementObjectData);
    let activeElement = elementObjectRedux.activeElement;
    let result = elementArr
      .filter((i: any) => {
        return (
          i.position.x >= userInterfaceRedux.cursorSelectArea.x &&
          i.position.y >= userInterfaceRedux.cursorSelectArea.y &&
          i.position.x <= userInterfaceRedux.cursorSelectArea.dx &&
          i.position.y <= userInterfaceRedux.cursorSelectArea.dy &&
          i.name !== activeElement
        );
      })
      .map((i: any) => i.name);
    dispatch(setSelectedElement(result));
  }, [userInterfaceRedux.cursorSelectArea]);

  const selectedElementList = new Set(elementObjectRedux.selectedElement);
  const listOfElement = Object.values(elementObjectRedux.elementObjectData);
  const activeElement = elementObjectRedux.activeElement;

  const normalElements = listOfElement.filter(
    (i) => i.relationship.status === false
  );
  const relationshipElements = listOfElement.filter(
    (i) => i.relationship.status === true
  );

  return (
    <div
      ref={canvasRef}
      style={styles.canvas}
      className={CustomStyle.protoPenScrollbar}
    >
      <div
        ref={canvasSpaceRef}
        style={styles.canvasSpace}
        className={CustomStyle.dotBackground}
      >
        {toolRedux.moveTool.state ? (
          <Pin
            ref={pinRef}
            x={toolRedux.pin.position.x}
            y={toolRedux.pin.position.y}
          />
        ) : null}

        {normalElements.map((data: any, index) => {
          return (
            <MoveElement
              key={index}
              parent={canvasSpaceRef}
              data={data}
              style={{
                boxShadow: boxShadow(
                  data.name === activeElement,
                  selectedElementList.has(data.name)
                ),
              }}
              onClick={() => {
                dispatch(setActiveElement(data.name));
              }}
            />
          );
        })}
        {relationshipElements.map((data: ProtoPenElement, index) => {
          return (
            <MoveElement
              key={index}
              parent={canvasSpaceRef}
              data={data}
              style={{
                boxShadow: boxShadow(
                  data.name === activeElement,
                  selectedElementList.has(data.name)
                ),
              }}
              onClick={() => {
                dispatch(setActiveElement(data.name));
              }}
            >
              <RecursiveElement data={data.relationship.children} />
            </MoveElement>
          );
        })}

        <SelectScreenBox ref={selectBoxRef} />
      </div>
    </div>
  );
});



