import React from "react";
import { FieldWarper } from "../io-component/InputField";
import { Button } from "../io-component/Button";
import { useMoveUtilForTool } from "../../logic/hooks/ToolMoveHook";
import _ from "lodash";
import { useAppDispatch, useAppSelector } from "../../logic/redux-store/hooks";
import { changeToolsPos } from "../../logic/redux-store/feature/ToolSlice";
import { groupToActiveElement } from "../../logic/redux-store/feature/ElementObjectSlice";
import {
  Divider,
  MessageDialogBox,
  Title,
} from "../io-component/MessageDialogBox";

interface NewLayerDialogArgs {
  parent: any;
}

export function GroupTool(options: NewLayerDialogArgs) {
  const toolRedux = useAppSelector((state) => state.tool);
  const dispatch = useAppDispatch();
  const dialogRef = React.useRef(null);

  const groupHandler = () => {
    dispatch(groupToActiveElement());
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
    <MessageDialogBox ref={dialogRef} h={140}>
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
    </MessageDialogBox>
  );
}
