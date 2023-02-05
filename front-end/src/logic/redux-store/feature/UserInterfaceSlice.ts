import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ScreenInterface {
  screen: {
    width: number;
    height: number;
  };
}

interface InitialState {
  screen: {
    width: number;
    height: number;
  };
  canvasWidth: number;
  controlPaneWidth: number;
  actionPaneWidth: number;
  canvasSpaceSize: number;
  handMove: boolean;
  propertyPaneWidth: number;
  cursorSelectArea: {
    x: number;
    y: number;
    dx: number;
    dy: number;
  };
  messageDialog: {
    type: "warning" | "success" | "none";
    message: string;
  };
}

const initialState: InitialState = {
  screen: {
    width: 1000,
    height: 0,
  },
  canvasWidth: 0,
  controlPaneWidth: 200,
  actionPaneWidth: 50,
  canvasSpaceSize: 5000,
  handMove: false,
  propertyPaneWidth: 250,
  cursorSelectArea: {
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
  },
  messageDialog: {
    type: "none",
    message: "No Message!",
  },
};

const userInterfaceSlice = createSlice({
  name: "userInterface",
  initialState,
  reducers: {
    changeScreen: (state, action: PayloadAction<ScreenInterface>) => {
      state.screen.width = action.payload.screen.width;
      state.screen.height = action.payload.screen.height;
      state.canvasWidth =
        action.payload.screen.width -
        (state.controlPaneWidth + state.propertyPaneWidth + state.actionPaneWidth);
    },
    toggleHandMove: (state, action: PayloadAction<boolean>) => {
      state.handMove = action.payload;
    },
    setCursorSelectArea: (state, action) => {
      state.cursorSelectArea = action.payload;
    },
    setMessage: (
      state,
      action: PayloadAction<{
        type: "warning" | "success" | "none";
        message: string;
      }>
    ) => {
      state.messageDialog.type = action.payload.type;
      state.messageDialog.message = action.payload.message;
    },
  },
});

export const { changeScreen, toggleHandMove, setCursorSelectArea, setMessage } =
  userInterfaceSlice.actions;
export default userInterfaceSlice.reducer;
