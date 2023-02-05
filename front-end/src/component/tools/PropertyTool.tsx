import React from "react";
import { FieldWarper, InputField, SelectBox } from "../io-component/InputField";
import { Button } from "../io-component/Button";
import { useMoveUtilForTool } from "../../logic/hooks/ToolMoveHook";
import { useAppDispatch, useAppSelector } from "../../logic/redux-store/hooks";
import { changeToolsPos } from "../../logic/redux-store/feature/ToolSlice";
import {
  setTextOfActiveObject,
  setTypeOfActiveObject,
} from "../../logic/redux-store/feature/ElementObjectSlice";
import { Divider, ToolBox, Title } from "../io-component/ToolBox";
import { setMessage } from "../../logic/redux-store/feature/UserInterfaceSlice";

interface NewLayerDialogArgs {
  parent: any;
}

export const SelectData = ["Text Content", "Box Model", "Node Model"];
export const SelectDataEnum = {
  txc: SelectData[0],
  bm: SelectData[1],
  nm: SelectData[2],
};
export function PropertyTool(options: NewLayerDialogArgs) {
  const toolRedux = useAppSelector((state) => state.tool);
  const elementObjectRedux = useAppSelector((state) => state.elementObject);
  const dispatch = useAppDispatch();
  const toolRef = React.useRef(null);
  const [input, setInput] = React.useState({ value: "", type: "" });
  const activeElement = elementObjectRedux.activeElement;

  useMoveUtilForTool(
    toolRef,
    options.parent,
    toolRedux.propertyTool.position,
    changeToolsPos,
    "propertyTool",
    []
  );

  return (
    <ToolBox ref={toolRef} style={{ height: "max-content" }}>
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
      <FieldWarper px={0} py={5} direction="column">
        <SelectBox
          label="Type"
          direct={SelectData}
          sLaW={100}
          sBW={165}
          onChange={(type: string) => {
            setInput((i) => ({ ...i, type }));
          }}
        />
      </FieldWarper>

      {input.type === SelectDataEnum.txc || input.type === SelectDataEnum.nm ? (
        <>
          <FieldWarper direction="column" align="flex-start" px={16} py={5}>
            <InputField
              label={input.type === SelectDataEnum.txc ? "Text" : "Name"}
              iMrL={0}
              value={input.value}
              style={{ width: "100%", textAlign: "center" }}
              labelWidth={152}
              onChange={(ev: any) => {
                setInput((i) => ({ ...i, value: ev.target.value }));
              }}
            />
          </FieldWarper>
        </>
      ) : null}
      <FieldWarper px={16} py={7} style={{ marginBottom: "5px" }}>
        <Button.Click
          h={35}
          r={7}
          style={{ flex: 1 }}
          listener={() => {
            if (
              (activeElement && input.value) ||
              (activeElement && input.type === SelectDataEnum.bm)
            ) {
              dispatch(setTypeOfActiveObject(input.type));
              dispatch(setTextOfActiveObject(input.value));
              dispatch(
                setMessage({
                  type: "success",
                  message: "Success: Applied",
                })
              );
            }

            if (!activeElement) {
              dispatch(
                setMessage({
                  type: "warning",
                  message: "Fail: Please Select Element",
                })
              );
            } else if (activeElement && !input.type) {
              dispatch(
                setMessage({
                  type: "warning",
                  message: "Fail: Please Select Type",
                })
              );
            } else if (
              activeElement &&
              !input.value &&
              input.type !== SelectDataEnum.bm
            ) {
              dispatch(
                setMessage({
                  type: "warning",
                  message: "Fail: Please fill the input",
                })
              );
            }
          }}
        >
          Apply
        </Button.Click>
      </FieldWarper>
    </ToolBox>
  );
}
