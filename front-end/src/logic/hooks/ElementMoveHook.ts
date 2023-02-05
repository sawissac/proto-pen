import React from "react";
import {
  current,
  listener,
  removeListener,
} from "../proto_pen_method/proto_event";
import { MoveUtil } from "@wauxstudio/element-move-js";
import { useAppDispatch } from "../redux-store/hooks";

export function useMoveUtilForElementMove(
  eleRef: any,
  parentRef: any,
  position: any,
  dispatchMethod: any,
  name: string,
  dependency: any[]
) {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    let moveUtil: any = null;
    let mouseUp: any = null;
    let element: any = null;
    let parent: any = null;

    if (eleRef.current && parentRef.current) {
      element = current(eleRef);
      parent = current(parentRef);
      
      moveUtil = new MoveUtil({
        el: element,
        boundary: parent,
        pushBackDistance: 10,
      } as any);

      moveUtil.setPosition({
        left: position.x,
        top: position.y,
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
          dispatchMethod({
            activeElement: name,
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
  }, dependency);
}
