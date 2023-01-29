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
  cursorSelectArea: {
    x: number;
    y: number;
    dx: number;
    dy: number;
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
  cursorSelectArea: {
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
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
        (state.controlPaneWidth + state.actionPaneWidth);
    },
    toggleHandMove: (state) => {
      state.handMove = !state.handMove;
    },
    setCursorSelectArea: (state, action) => {
      state.cursorSelectArea = action.payload;
    },
  },
});

export const { changeScreen, toggleHandMove, setCursorSelectArea } = userInterfaceSlice.actions;
export default userInterfaceSlice.reducer;
