import React from "react";
import { FieldWarper, InputField } from "../io-component/InputField";
import { Button } from "../io-component/Button";
import { useMoveUtilForTool } from "../../logic/hooks/ToolMoveHook";
import { useAppDispatch, useAppSelector } from "../../logic/redux-store/hooks";
import { changeToolsPos } from "../../logic/redux-store/feature/ToolSlice";
import {
  createElementObject,
  setActiveElement,
} from "../../logic/redux-store/feature/ElementObjectSlice";
import {
  Divider,
  MessageDialogBox,
  Title,
} from "../io-component/MessageDialogBox";

interface NewLayerDialogArgs {
  parent: any;
}

const DefaultInput = {
  w: 50,
  h: 50,
  t: 1,
};

export function NewElementTool(options: NewLayerDialogArgs) {
  const toolRedux = useAppSelector((state) => state.tool);
  const uiRedux = useAppSelector((state) => state.userInterface);
  const elObjRedux = useAppSelector((state) => state.elementObject);
  const dispatch = useAppDispatch();

  const toolRef = React.useRef(null);
  const [input, setInput] = React.useState(DefaultInput);

  const createElementHandler = () => {
    dispatch(setActiveElement(""));
    dispatch(
      createElementObject({
        uid: elObjRedux.uniqueId,
        w: input.w,
        h: input.h,
        times: input.t,
        a: uiRedux.canvasSpaceSize,
      })
    );
  };

  useMoveUtilForTool(
    toolRef,
    options.parent,
    toolRedux.newElementTool.position,
    changeToolsPos,
    "newElementTool",
    []
  );

  return (
    <MessageDialogBox ref={toolRef} h={140}>
      <Title value="New Element Tool" txtAli="center" />
      <Divider />
      <FieldWarper justify="space-between" py={10} px={15}>
        <InputField
          type="number"
          title="element-width-input"
          label="W"
          value={input.w}
          placeHolder="100..."
          onChange={(ev: any) => {
            setInput((i) => {
              return { ...i, w: Number(ev.target.value) };
            });
          }}
        />
        <InputField
          type="number"
          title="element-height-input"
          label="H"
          value={input.h}
          placeHolder="100..."
          onChange={(ev: any) => {
            setInput((i) => {
              return { ...i, h: Number(ev.target.value) };
            });
          }}
        />
        <InputField
          type="number"
          title="element-times-input"
          label="&times;"
          value={input.t}
          placeHolder="1x..."
          onChange={(ev: any) => {
            setInput((i) => {
              return { ...i, t: Number(ev.target.value) };
            });
          }}
        />
      </FieldWarper>
      <FieldWarper px={16} py={1}>
        <Button.Click
          h={35}
          r={7}
          style={{ flex: 1 }}
          listener={createElementHandler}
        >
          CREATE
        </Button.Click>
      </FieldWarper>
    </MessageDialogBox>
  );
}
