import { MoveUtil } from "@wauxstudio/element-move-js";
import React from "react";
import { useAppDispatch } from "../redux-store/hooks";
import {
  current,
  listener,
  removeListener,
} from "../proto_pen_method/proto_event";

export function useMoveUtilForTool(
  dialogRef: any,
  parentRef: any,
  position: any,
  dispatchMethod: any,
  name: string,
  dependency: any[]
) {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    let moveUtil: MoveUtil | null = null;
    const dialog = current(dialogRef);
    const parent = current(parentRef);
    const pos = position;

    let mouseup: any = null;
    if (dialog && parent) {
      moveUtil = new MoveUtil({
        el: dialog,
        boundary: parent,
        pushBackDistance: 5,
      });

      mouseup = () => {
        dispatch(
          dispatchMethod({
            name: name,
            position: { x: moveUtil?.getX(), y: moveUtil?.getY() },
          })
        );
      };

      if (pos.x > 0 || pos.y > 0) {
        moveUtil.setPosition({
          left: pos.x,
          top: pos.y,
        } as any);
      } else {
        moveUtil.setPosition({
          left: parent.clientWidth / 2 - 300 / 2,
          top: parent.clientHeight / 2 - dialog.clientHeight / 2,
        } as any);
      }

      listener("mouseup", dialog, mouseup);
    }
    return () => {
      if (moveUtil) {
        moveUtil.closeEvent();
        removeListener("mouseup", dialog, mouseup);
      }
    };
  }, dependency);
}
