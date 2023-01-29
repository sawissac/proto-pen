import React, { CSSProperties, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../logic/redux-store/hooks";
import { ProtoPenElement } from "../../logic/proto_pen_method/proto_create_element";
import { MoveUtil } from "@wauxstudio/element-move-js";
import { current, listener, removeListener } from "../../logic/proto_pen_method/proto_event";
import { setActiveElementPos } from "../../logic/redux-store/feature/ElementObjectSlice";
import { NodeModel } from "./NodeModel";

interface MoveElementArgs {
  data: ProtoPenElement;
  parent:
    | any
    | {
        current: {
          clientWidth: number;
          clientHeight: number;
        };
      };
  onClick: any;
  children?: any;
  style?: CSSProperties;
}

export function MoveElement(options: MoveElementArgs) {
  const eod = useAppSelector((state) => {
    return state.elementObject;
  });
  const dispatch = useAppDispatch();
  const eleRef = useRef(null);
  useEffect(() => {
    let moveUtil: any = null;
    let mouseUp: any = null;
    let element: any = null;
    if (eleRef.current && options.parent) {
      element = current(eleRef);
      moveUtil = new MoveUtil({
        el: element,
        boundary: options.parent.current,
        pushBackDistance: 10,
      } as any);
      moveUtil.setPosition({
        left: options.data.position.x,
        top: options.data.position.y,
      } as any);

      let elementPos = {
        x: moveUtil.getX(),
        y: moveUtil.getY(),
        dx: 0,
        dy: 0,
      };

      moveUtil.listener(
        (pos: { left: number; top: number; right: number; bottom: number }) => {
          elementPos = {
            x: pos.left,
            y: pos.top,
            dx: pos.right,
            dy: pos.bottom,
          };
        }
      );

      mouseUp = () => {
        dispatch(
          setActiveElementPos({
            activeElement: options.data.name,
            position: elementPos,
          })
        );
      };
      listener("mouseup", element, mouseUp);
    }

    return () => {
      if (moveUtil) moveUtil.closeEvent();
      if (element) {
        removeListener("mouseup", element, mouseUp);
      }
    };
  }, [eleRef, options.data.position.x]);

  let getCss: any = Object.keys(options.data.className);

  getCss = getCss.reduce((p: any, c: any) => {
    let cssData = eod.elementObjectData[c].css;
    p = { ...p, ...cssData };
    return p;
  }, {});

  const Styles: CSSProperties = {
    left: options.data.position.x + "px",
    top: options.data.position.y + "px",
    backgroundColor:
      options.data.type === "Text Content" ? "transparent" : "#2d2d2d",
    zIndex: "5",
    width:
      options.data.type === "Node Model" ? 260 + "px" : options.data.w + "px",
    height:
      options.data.type === "Node Model"
        ? "max-content"
        : options.data.h + "px",
    borderRadius: options.data.type === "Node Model" ? 7 + "px" : 0 + "px",
    ...options.style,
    ...getCss,
  };

  return (
    <div ref={eleRef} style={Styles} onClick={options.onClick}>
      {options.data.type === "Node Model" ? (
        <NodeModel data={options.data} />
      ) : (
        <>
          {options.data.type === "Text Content" ? (
            <div>{options.data.text}</div>
          ) : null}
          {options.children}
        </>
      )}
    </div>
  );
}
