import React from "react";
import { FieldWarper } from "../io-component/InputField";
import { Button } from "../io-component/Button";
import { useMoveUtilForTool } from "../../logic/hooks/ToolMoveHook";
import { useAppDispatch, useAppSelector } from "../../logic/redux-store/hooks";
import { changeToolsPos } from "../../logic/redux-store/feature/ToolSlice";
import { groupToActiveElement } from "../../logic/redux-store/feature/ElementObjectSlice";
import {
  Divider,
  ToolBox,
  Title,
} from "../io-component/ToolBox";
import { setMessage } from "../../logic/redux-store/feature/UserInterfaceSlice";

interface NewLayerDialogArgs {
  parent: any;
}

export function GroupTool(options: NewLayerDialogArgs) {
  const toolRedux = useAppSelector((state) => state.tool);
  const elo = useAppSelector(state=>state.elementObject)
  const dispatch = useAppDispatch();
  const dialogRef = React.useRef(null);

  const groupHandler = () => {
    const activeElement = elo.activeElement; 
    const activeElementCssSharedChild = elo.elementObjectData[activeElement].cssSharedChild;
    const selectedElement = elo.selectedElement;
    const has = ()=>{
      let flag = false;
      selectedElement.map(i=>{
        let isExit = Object.hasOwn(activeElementCssSharedChild, i);
        if(isExit){
          flag = true;
        }
      })
      return flag;
    }

    if(has()){
      dispatch(
        setMessage({
          type: "warning",
          message: "Fail: Element is already grouped"
        })
      )
    }else{
      dispatch(groupToActiveElement());
    }
  };

  useMoveUtilForTool(
    dialogRef,
    options.parent,
    toolRedux.groupTool.position,
    changeToolsPos,
    "groupTool",
    []
  );

  return (
    <ToolBox ref={dialogRef} h={140}>
      <Title value="Group Tool" txtAli="center" />
      <Divider />
      <FieldWarper>
        <Title
          value="Select Element, click element that will become parent element and click group."
          txtAli="center"
        />
      </FieldWarper>
      <FieldWarper px={16} py={1}>
        <Button.Click
          h={35}
          r={7}
          px={16}
          py={1}
          listener={groupHandler}
          style={{ flex: 1 }}
        >
          Group
        </Button.Click>
      </FieldWarper>
    </ToolBox>
  );
}
