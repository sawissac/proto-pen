import React from "react";
import { FieldWarper } from "../io-component/InputField";
import { Button } from "../io-component/Button";
import { useMoveUtilForTool } from "../../logic/hooks/ToolMoveHook";
import { useAppDispatch, useAppSelector } from "../../logic/redux-store/hooks";
import { changeToolsPos } from "../../logic/redux-store/feature/ToolSlice";
import { setElementPosMulti } from "../../logic/redux-store/feature/ElementObjectSlice";
import { Divider, ToolBox, Title } from "../io-component/ToolBox";
import { setMessage } from "../../logic/redux-store/feature/UserInterfaceSlice";

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

    if (toMove.length > 0) {
      dispatch(
        setMessage({
          type: "success",
          message: `Success: ${toMove.length} Elements Moved`,
        })
      );
      dispatch(
        setElementPosMulti({
          list: toMove,
          position: { x: pin.x + 5, y: pin.y + 20 } as any,
        })
      );
    }else{
      dispatch(
        setMessage({
          type: "warning",
          message: `Fail: Select elements to move`,
        })
      );
    }
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
    <ToolBox ref={toolRef} h={155}>
      <Title value="MoveElement" txtAli="center" />
      <Divider />
      <FieldWarper py={10} px={15}>
        <Title
          value="Ctrl + Click on canvas, pin icon will appear and select or click the element."
          txtAli="center"
        />
      </FieldWarper>
      <FieldWarper px={16} py={1}>
        <Button.Click
          h={35}
          r={7}
          px={16}
          py={1}
          style={{ flex: 1 }}
          listener={moveHandler}
        >
          Move
        </Button.Click>
      </FieldWarper>
    </ToolBox>
  );
}
