import React from "react";
import { FieldWarper, SelectBox } from "../io-component/InputField";
import { useMoveUtilForTool } from "../../logic/hooks/ToolMoveHook";
import { useAppDispatch, useAppSelector } from "../../logic/redux-store/hooks";
import { changeToolsPos } from "../../logic/redux-store/feature/ToolSlice";
import {
  updateCssProps,
} from "../../logic/redux-store/feature/ElementObjectSlice";
import { Divider, ToolBox, Title } from "../io-component/ToolBox";
import { setMessage } from "../../logic/redux-store/feature/UserInterfaceSlice";
import { ChromePicker } from "react-color";
interface NewLayerDialogArgs {
  parent: any;
}

export function ColorPaletteTool(options: NewLayerDialogArgs) {
  const toolRedux = useAppSelector((state) => state.tool);
  const elementObjectRedux = useAppSelector((state) => state.elementObject);
  const dispatch = useAppDispatch();
  const toolRef = React.useRef(null);
  const [color, setColor] = React.useState("#ffffff");
  const [property, setProperty] = React.useState("");
  const activeNode = elementObjectRedux.activeNode;
  const elo = elementObjectRedux.elementObjectData;

  const selectData = activeNode ? Object.keys(elo[activeNode].css) : [];

  useMoveUtilForTool(
    toolRef,
    options.parent,
    toolRedux.colorPaletteTool.position,
    changeToolsPos,
    "colorPaletteTool",
    []
  );
  return (
    <ToolBox
      ref={toolRef}
      w={226}
      style={{height: "max-content" }}
    >
      <Title value="MoveElement" txtAli="center" />
      <Divider />
      <FieldWarper style={{ width: "100%" }} direction="column">
        <SelectBox
          direct={selectData}
          selectTitle="Property"
          label="Select"
          sBW={120}
          seLaW={100}
          sLaW={80}
          onChange={(value: string) => {
            setProperty(value);
          }}
        />
      </FieldWarper>
      <ChromePicker
        color={color}
        disableAlpha={true}
        onChangeComplete={(color) => {
          setColor(color.hex);
          if (property) {
            const css = {
              ...elo[activeNode].css,
              [property]: color.hex,
            };
            dispatch(
              updateCssProps({
                activeEl: activeNode,
                css,
              })
            );
          }
        }}
      />
    </ToolBox>
  );
}
