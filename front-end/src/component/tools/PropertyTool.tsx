import React, { useState } from "react";
import { FieldWarper, InputField, SelectBox } from "../io-component/InputField";
import { Button } from "../io-component/Button";
import { useMoveUtilForTool } from "../../logic/hooks/ToolMoveHook";
import { useAppDispatch, useAppSelector } from "../../logic/redux-store/hooks";
import { changeToolsPos } from "../../logic/redux-store/feature/ToolSlice";
import {
  setTextOfActiveObject,
  setTypeOfActiveObject,
} from "../../logic/redux-store/feature/ElementObjectSlice";
import {
  Divider,
  MessageDialogBox,
  Title,
} from "../io-component/MessageDialogBox";
interface NewLayerDialogArgs {
  parent: any;
}

export function PropertyTool(options: NewLayerDialogArgs) {
  const toolRedux = useAppSelector((state) => state.tool);
  const elementObjectRedux = useAppSelector((state) => state.elementObject);
  const dispatch = useAppDispatch();
  const toolRef = React.useRef(null);

  const [typeValue, setTypeValue] = useState("");
  const [input, setInput] = useState({ value: "" });

  const activeElement = elementObjectRedux.activeElement;

  const selectData = ["Text Content", "Box Model", "Node Model"];

  useMoveUtilForTool(
    toolRef,
    options.parent,
    toolRedux.propertyTool.position,
    changeToolsPos,
    "propertyTool",
    []
  );

  return (
    <MessageDialogBox ref={toolRef} style={{ height: "max-content" }}>
      <Title value="Property Tool" txtAli="center" />
      <Divider />
      <FieldWarper px={16} py={5} justify="flex-start">
        <Button.Label
          label="Target"
          laW={100}
          h={35}
          w={165}
          r={7}
          primary={true}
        >
          {activeElement ? activeElement : "Selected None"}
        </Button.Label>
      </FieldWarper>
      <SelectBox
        dataSet={selectData}
        sLaW={100}
        sBW={165}
        onChange={(type: string) => {
          setTypeValue(type);
        }}
      />
      {typeValue === selectData[0] || typeValue === selectData[2] ? (
        <>
          <FieldWarper direction="column" align="flex-start" px={16} py={5}>
            <InputField
              label={"search"}
              iMrL={0}
              value={input.value}
              style={{ width: "100%", textAlign: "center" }}
              labelWidth={152}
              onChange={(ev: any) => {
                setInput({ value: ev.target.value });
              }}
            />
          </FieldWarper>
        </>
      ) : null}
      <FieldWarper px={16} py={7} style={{marginBottom: "5px"}}>
        <Button.Click
          h={35}
          r={7}
          style={{ flex: 1 }}
          listener={() => {
            if (activeElement) {
              dispatch(setTypeOfActiveObject(typeValue));
              dispatch(setTextOfActiveObject(input.value));
            }
          }}
        >
          Apply
        </Button.Click>
      </FieldWarper>
    </MessageDialogBox>
  );
}
