import * as Icons from "@tabler/icons-react";
import { LayerPane } from "./LayerPane";
import { Button } from "./io-component/Button";
import { useAppDispatch, useAppSelector } from "../logic/redux-store/hooks";
import { toggleToolsState } from "../logic/redux-store/feature/ToolSlice";
import { Divider } from "./io-component/MessageDialogBox";
import { toggleHandMove } from "../logic/redux-store/feature/UserInterfaceSlice";
import {
  deleteActiveSelect,
  setActiveElement,
  setSelectedElement,
} from "../logic/redux-store/feature/ElementObjectSlice";

export function ActionPane() {
  const dispatch = useAppDispatch();
  const userInterfaceRedux = useAppSelector((state) => state.userInterface);

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
        listener={() => {
          dispatch(toggleToolsState("newElementTool"));
        }}
      >
        <Icons.IconPlus size={18} color="white" />
      </Button.Toggle>
      <Button.Toggle
        w={50}
        h={50}
        listener={() => {
          dispatch(toggleHandMove());
        }}
      >
        <Icons.IconHandStop size={18} color="white" />
      </Button.Toggle>
      <Button.Toggle
        w={50}
        h={50}
        listener={() => {
          dispatch(toggleToolsState("locationTool"));
        }}
      >
        <Icons.IconMapPin size={18} color="white" />
      </Button.Toggle>
      <Button.Toggle
        w={50}
        h={50}
        listener={() => {
          dispatch(toggleToolsState("moveTool"));
        }}
      >
        <Icons.IconArrowLoopRight size={18} color="white" />
      </Button.Toggle>
      <Button.Toggle
        w={50}
        h={50}
        listener={() => {
          dispatch(toggleToolsState("arrangeTool"));
        }}
      >
        <Icons.IconGridDots size={18} color="white" />
      </Button.Toggle>
      <Button.Toggle
        w={50}
        h={50}
        listener={() => {
          dispatch(toggleToolsState("propertyTool"));
        }}
      >
        <Icons.IconSunLow size={18} color="white" />
      </Button.Toggle>
      <Button.Toggle
        w={50}
        h={50}
        listener={() => {
          dispatch(toggleToolsState("groupTool"));
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
        }}
        style={{
          backgroundColor: "transparent",
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
          backgroundColor: "transparent",
        }}
      >
        <Icons.IconShapeOff size={18} color="white" />
      </Button.Click>
    </LayerPane>
  );
}
