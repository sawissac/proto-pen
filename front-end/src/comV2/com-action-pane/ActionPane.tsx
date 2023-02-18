import Stack from "@mui/material/Stack";
import { Button, Divider, ToggleButton, styled } from "@mui/material";
import { toggleToolsState } from "../../logic/redux-store/feature/ToolSlice";
import { useAppDispatch, useAppSelector } from "../../logic/redux-store/hooks";
import { blue, grey } from "@mui/material/colors";
import { setMessage, setUiState } from "../../logic/redux-store/feature/UserInterfaceSlice";
import { deleteActiveSelect, setActiveElement, setSelectedElement } from "../../logic/redux-store/feature/ElementObjectSlice";
import { IconArrowLoopRight, IconBoxModel2, IconGridDots, IconHandStop, IconMapPin, IconNotebook, IconPalette, IconPlus, IconResize, IconShapeOff, IconSunLow, IconTrash } from "@tabler/icons-react";

const CustomToggleButton = styled(ToggleButton)(() => ({
  "&.MuiToggleButton-root": {
    border: 0,
    borderRadius: 0,
    transitionDuration: "0.3s",
    minWidth: 50,
    minHeight: 50,
  },
  "&.Mui-selected": {
    opacity: 1,
    backgroundColor: blue[600],
  },
  "&.Mui-selected:hover": {
    opacity: 1,
    backgroundColor: blue[600],
  },
}));

const CustomButton = styled(Button)(() => ({
  "&.MuiButton-root": {
    border: 0,
    borderRadius: 0,
    transitionDuration: "0.3s",
    minWidth: 50,
    minHeight: 50,
    color: grey[200],
  },
}));

function ActionPane() {
  const UiRedux = useAppSelector((s) => s.ui);
  const toolRedux = useAppSelector((s) => s.tool);
  const dispatch = useAppDispatch();

  function setDialog(flag: boolean, message: string) {
    if (flag) {
      dispatch(
        setMessage({
          type: "info",
          message: message,
        })
      );
    } else {
      dispatch(
        setMessage({
          type: "info",
          message: `No message!`,
        })
      );
    }
  }

  return (
    <Stack
      direction="column"
      sx={{
        width: UiRedux.actionPaneWidth,
        height: UiRedux.screen.height,
        borderRight: 1,
        borderColor: grey[800],
        overflowY: "scroll",
      }}
      className="scroll-invisible"
    >
      <CustomToggleButton
        value={toolRedux.newElementTool.state}
        selected={toolRedux.newElementTool.state}
        onClick={(ev: any, flag) => {
          dispatch(toggleToolsState({ name: "newElementTool", state: !flag }));
          setDialog(!flag, "X = times");
        }}
      >
        <IconPlus size={18} />
      </CustomToggleButton>
      <CustomToggleButton
        value={toolRedux.handMove.state}
        selected={toolRedux.handMove.state}
        onClick={(ev: any, flag) => {
          dispatch(toggleToolsState({ name: "handMove", state: !flag }));
          setDialog(!flag, "Click & drag on the canvas to move");
        }}
      >
        <IconHandStop size={18} />
      </CustomToggleButton>
      <CustomToggleButton
        value={toolRedux.selectTool.state}
        selected={toolRedux.selectTool.state}
        onClick={(ev: any, flag) => {
          dispatch(toggleToolsState({ name: "selectTool", state: !flag }));
          if (!flag) {
            dispatch(
              setUiState({
                name: "cursorSelectArea",
                value: {
                  x: 0,
                  y: 0,
                  dx: 0,
                  dy: 0,
                },
              })
            );
          }
          setDialog(!flag, "Drag canvas & move around");
        }}
      >
        <IconResize size={18} />
      </CustomToggleButton>
      <CustomToggleButton
        value={toolRedux.locationTool.state}
        selected={toolRedux.locationTool.state}
        onClick={(ev: any, flag) => {
          dispatch(toggleToolsState({ name: "locationTool", state: !flag }));
          setDialog(!flag, "X: canvas x, Y: canvas y, N: mark name");
        }}
      >
        <IconMapPin size={18} />
      </CustomToggleButton>
      <CustomToggleButton
        value={toolRedux.moveTool.state}
        selected={toolRedux.moveTool.state}
        onClick={(ev: any, flag) => {
          dispatch(toggleToolsState({ name: "moveTool", state: !flag }));
          setDialog(!flag, "Ctrl + click on canvas, pin icon will appear, select elements and press move");
        }}
      >
        <IconArrowLoopRight size={18} />
      </CustomToggleButton>
      <CustomToggleButton
        value={toolRedux.arrangeTool.state}
        selected={toolRedux.arrangeTool.state}
        onClick={(ev: any, flag) => {
          dispatch(toggleToolsState({ name: "arrangeTool", state: !flag }));
          setDialog(!flag, "C: columns, G: gap");
        }}
      >
        <IconGridDots size={18} />
      </CustomToggleButton>
      <CustomToggleButton
        value={toolRedux.propertyTool.state}
        selected={toolRedux.propertyTool.state}
        onClick={(ev: any, flag) => {
          dispatch(toggleToolsState({ name: "propertyTool", state: !flag }));
          setDialog(!flag, "C: Select Type to change model");
        }}
      >
        <IconSunLow size={18} />
      </CustomToggleButton>
      <CustomToggleButton
        value={toolRedux.groupTool.state}
        selected={toolRedux.groupTool.state}
        onClick={(ev: any, flag) => {
          dispatch(toggleToolsState({ name: "groupTool", state: !flag }));
          setDialog(!flag, "Click element & select other element, perform group.");
        }}
      >
        <IconBoxModel2 size={18} />
      </CustomToggleButton>
      <CustomToggleButton
        value={toolRedux.colorPaletteTool.state}
        selected={toolRedux.colorPaletteTool.state}
        onClick={(ev: any, flag) => {
          dispatch(toggleToolsState({ name: "colorPaletteTool", state: !flag }));
          setDialog(!flag, "Type -h and run script");
        }}
      >
        <IconPalette size={18} />
      </CustomToggleButton>
      <CustomToggleButton
        value={toolRedux.noteBookTool.state}
        selected={toolRedux.noteBookTool.state}
        onClick={(ev: any, flag) => {
          dispatch(toggleToolsState({ name: "noteBookTool", state: !flag }));
          setDialog(!flag, "Type -h and run script");
        }}
      >
        <IconNotebook size={18} />
      </CustomToggleButton>
      <Divider sx={{ borderColor: "grey.800" }} />
      <CustomButton
        variant="text"
        onClick={(ev: any) => {
          dispatch(deleteActiveSelect());
          dispatch(setActiveElement(""));
        }}
      >
        <IconTrash size={18} />
      </CustomButton>
      <CustomButton
        variant="text"
        onClick={(ev: any) => {
          dispatch(setActiveElement(""));
          dispatch(setSelectedElement([]));
        }}
      >
        <IconShapeOff size={18} />
      </CustomButton>
    </Stack>
  );
}

export default ActionPane;
