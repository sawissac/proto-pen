import React from "react";
import {
  Divider,
  MessageDialogBox,
  Title,
} from "../io-component/MessageDialogBox";
import { FieldWarper } from "../io-component/InputField";
import { Button } from "../io-component/Button";
import { useMoveUtilForTool } from "../../logic/hooks/ToolMoveHook";
import _ from "lodash";
import { useAppDispatch, useAppSelector } from "../../logic/redux-store/hooks";
import { changeToolsPos } from "../../logic/redux-store/feature/ToolSlice";
import { setElementPosMulti } from "../../logic/redux-store/feature/ElementObjectSlice";

interface NewLayerDialogArgs {
  parent: any;
}

export function MoveTool(options: NewLayerDialogArgs) {
  const toolRedux = useAppSelector((state) => state.tool);
  const elObjRedux = useAppSelector((state) => state.elementObject);
  const dispatch = useAppDispatch();
  const toolRef = React.useRef(null);

  const moveHandler = () => {
    const selectedElement = elObjRedux.selectedElement;
    const activeElement = elObjRedux.activeElement;
    const toMove = [activeElement, ...selectedElement];
    const pin = toolRedux.pin.position;

    if (!activeElement) toMove.shift();

    dispatch(
      setElementPosMulti({
        list: toMove,
        position: { x: pin.x + 5, y: pin.y + 20 } as any,
      })
    );
  };

  useMoveUtilForTool(
    toolRef,
    options.parent,
    toolRedux.moveTool.position,
    changeToolsPos,
    "moveTool",
    []
  );

  return (
    <MessageDialogBox ref={toolRef} h={155}>
      <Title value="MoveElement" txtAli="center" />
      <Divider />
      <FieldWarper py={10} px={15}>
        <Title
          value="Ctrl + Click on canvas and select or click the
        element."
          txtAli="center"
        />
      </FieldWarper>
      <FieldWarper px={16} py={1}>
        <Button.Click
          h={35}
          r={7}
          style={{ flex: 1 }}
          px={16}
          py={1}
          listener={moveHandler}
        >
          Move
        </Button.Click>
      </FieldWarper>
    </MessageDialogBox>
  );
}
