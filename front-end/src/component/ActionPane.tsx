import * as Icons from "@tabler/icons-react";
import { LayerPane } from "./LayerPane";
import { Button } from "./io-component/Button";
import { useAppDispatch, useAppSelector } from "../logic/redux-store/hooks";
import { toggleToolsState } from "../logic/redux-store/feature/ToolSlice";
import { Divider } from "./io-component/ToolBox";
import {
  setMessage,
  toggleHandMove,
} from "../logic/redux-store/feature/UserInterfaceSlice";
import {
  deleteActiveSelect,
  setActiveElement,
  setSelectedElement,
} from "../logic/redux-store/feature/ElementObjectSlice";
import { color } from "../logic/theme/color";

export function ActionPane() {
  const dispatch = useAppDispatch();
  const userInterfaceRedux = useAppSelector((state) => state.userInterface);

  function setDialog(flag: boolean, message: string) {
    if (flag) {
      dispatch(
        setMessage({
          type: "none",
          message: message,
        })
      );
    } else {
      dispatch(
        setMessage({
          type: "none",
          message: `No message!`,
        })
      );
    }
  }

  return (
    <LayerPane
      direction="column"
      justify="flex-start"
      h={userInterfaceRedux.screen.height}
      w={50}
      flowY={false}
    >
      <Button.Toggle
        w={50}
        h={50}
        listener={(flag: boolean) => {
          dispatch(toggleToolsState({ name: "newElementTool", state: flag }));
          setDialog(flag, "[ W = width, H = height, X = times ]");
        }}
      >
        <Icons.IconPlus size={18} color="white" />
      </Button.Toggle>
      <Button.Toggle
        w={50}
        h={50}
        listener={(flag: boolean) => {
          dispatch(toggleHandMove(flag));
          setDialog(flag, "[ Click & drag on the canvas to move ]");
        }}
      >
        <Icons.IconHandStop size={18} color="white" />
      </Button.Toggle>
      <Button.Toggle
        w={50}
        h={50}
        listener={(flag: boolean) => {
          dispatch(toggleToolsState({ name: "locationTool", state: flag }));
          setDialog(flag, "[ X: canvas x, Y: canvas y, N: mark name ]");
        }}
      >
        <Icons.IconMapPin size={18} color="white" />
      </Button.Toggle>
      <Button.Toggle
        w={50}
        h={50}
        listener={(flag: boolean) => {
          dispatch(toggleToolsState({ name: "moveTool", state: flag }));
          setDialog(
            flag,
            "[ Ctrl + click on canvas, pin icon will appear, select elements and press move ]"
          );
        }}
      >
        <Icons.IconArrowLoopRight size={18} color="white" />
      </Button.Toggle>
      <Button.Toggle
        w={50}
        h={50}
        listener={(flag: boolean) => {
          dispatch(toggleToolsState({ name: "arrangeTool", state: flag }));
          setDialog(flag, "[ C: columns, G: gap ]");
        }}
      >
        <Icons.IconGridDots size={18} color="white" />
      </Button.Toggle>
      <Button.Toggle
        w={50}
        h={50}
        listener={(flag: boolean) => {
          dispatch(toggleToolsState({ name: "propertyTool", state: flag }));
          setDialog(flag, "[ Select Type to change model ]");
        }}
      >
        <Icons.IconSunLow size={18} color="white" />
      </Button.Toggle>
      <Button.Toggle
        w={50}
        h={50}
        listener={(flag: boolean) => {
          dispatch(toggleToolsState({ name: "groupTool", state: flag }));
        }}
      >
        <Icons.IconBoxModel2 size={18} color="white" />
      </Button.Toggle>
      <Divider />
      <Button.Click
        w={50}
        h={50}
        listener={() => {
          dispatch(deleteActiveSelect());
          dispatch(setActiveElement(""));
        }}
        style={{
          backgroundColor: color.primary,
        }}
      >
        <Icons.IconTrash size={18} color="white" />
      </Button.Click>
      <Button.Click
        w={50}
        h={50}
        listener={() => {
          dispatch(setActiveElement(""));
          dispatch(setSelectedElement([]));
        }}
        style={{
          backgroundColor: color.primary,
        }}
      >
        <Icons.IconShapeOff size={18} color="white" />
      </Button.Click>
    </LayerPane>
  );
}
