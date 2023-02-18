import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { math_add, math_extract } from "../../proto_pen_method/proto_math";

const initialState = {
  screen: {
    width: 0,
    height: 0,
  },
  canvasWidth: 0,
  canvasSpaceSize: 5000,
  controlPaneWidth: 200,
  actionPaneWidth: 50,
  propertyPaneWidth: 230,
  cursorSelectArea: {
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
  },
  messageDialog: {
    type: "info",
    message: "No Message!",
  },
  scrollPos: {
    x: 0,
    y: 0,
  },
  scale: 1,
  pin: {
    x: 0,
    y: 0,
  },
  scrollRequest: {
    x: 0,
    y: 0,
  },
};

type InitialState = typeof initialState;
type MessageType = "warning" | "success" | "info";
const userInterfaceSlice = createSlice({
  name: "userInterface",
  initialState,
  reducers: {
    changeScreen: (state, action: PayloadAction<Pick<InitialState, "screen">>) => {
      let allPaneCombination = math_add(state.controlPaneWidth, state.propertyPaneWidth, state.actionPaneWidth);
      let calculatedCanvasWidth = math_extract(action.payload.screen.width, allPaneCombination);
      let { width, height } = action.payload.screen;
      //? reassign value
      state.screen.width = width;
      state.screen.height = height;
      state.canvasWidth = calculatedCanvasWidth;
    },
    setCursorSelectArea: (state, action: PayloadAction<Pick<InitialState, "cursorSelectArea">>) => {
      state.cursorSelectArea = action.payload.cursorSelectArea;
    },
    setUiState: (state, action: PayloadAction<{ name: keyof InitialState; value: any }>) => {
      const { name, value } = action.payload;
      switch (name) {
        case "cursorSelectArea":
          state.cursorSelectArea = value;
          break;
        case "pin":
          state.pin = value;
          break;
        case "scrollPos":
          state.scrollPos = value;
          break;
        case "scale":
          state.scale = value;
          break;
        case "scrollRequest":
          state.scrollRequest = value;
          break;
      }
    },
    setMessage: (state, action: PayloadAction<{ type: MessageType; message: string }>) => {
      state.messageDialog.type = action.payload.type;
      state.messageDialog.message = action.payload.message;
    },
  },
});

export const { changeScreen, setCursorSelectArea, setMessage, setUiState } = userInterfaceSlice.actions;
export default userInterfaceSlice.reducer;
