import React from "react";
import {
  Divider,
  MessageDialogBox,
  Title,
} from "../io-component/MessageDialogBox";
import { FieldWarper, InputField } from "../io-component/InputField";
import { Button } from "../io-component/Button";
import { useMoveUtilForTool } from "../../logic/hooks/ToolMoveHook";
import { useAppDispatch, useAppSelector } from "../../logic/redux-store/hooks";
import { changeToolsPos } from "../../logic/redux-store/feature/ToolSlice";
import { arrangeSelectedElement } from "../../logic/redux-store/feature/ElementObjectSlice";

interface NewLayerDialogArgs {
  parent: any;
}
const DefaultInput = {
  c: 5,
  g: 20,
};

export function ArrangeTool(options: NewLayerDialogArgs) {
  const dialogRedux = useAppSelector((state) => state.tool);
  const dispatch = useAppDispatch();
  const toolRef = React.useRef(null);

  const [input, setInput] = React.useState(DefaultInput);

  const arrangeHandler = () => {
    dispatch(
      arrangeSelectedElement({
        c: input.c,
        g: input.g,
      })
    );
  };

  useMoveUtilForTool(
    toolRef,
    options.parent,
    dialogRedux.arrangeTool.position,
    changeToolsPos,
    "arrangeTool",
    []
  );

  return (
    <MessageDialogBox ref={toolRef} h={175}>
      <Title value="Arrange Tool" txtAli="center" />
      <Divider />
      <FieldWarper>
        <Title
          value="Click on the element and select the others."
          txtAli="center"
        />
      </FieldWarper>
      <FieldWarper justify="center" py={10} px={15}>
        <InputField
          type="number"
          title="arrange-row-input-dialog"
          label="Columns"
          value={input.c}
          placeHolder="5..."
          onChange={(ev: any) => {
            setInput((i) => {
              return { ...i, c: Number(ev.target.value) };
            });
          }}
        />
        <InputField
          type="number"
          title="arrange-row-input-dialog"
          label="Gap"
          value={input.g}
          placeHolder="5..."
          iMrL={7}
          onChange={(ev: any) => {
            setInput((i) => {
              return { ...i, g: Number(ev.target.value) };
            });
          }}
        />
      </FieldWarper>
      <FieldWarper px={16} py={1}>
        <Button.Click
          h={35}
          r={7}
          px={16}
          py={1}
          style={{ flex: 1 }}
          listener={arrangeHandler}
        >
          Arrange
        </Button.Click>
      </FieldWarper>
    </MessageDialogBox>
  );
}
