import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const DefaultToolState = {
  state: false,
};

const initialState = {
  newElementTool: DefaultToolState,
  locationTool: DefaultToolState,
  moveTool: DefaultToolState,
  arrangeTool: DefaultToolState,
  propertyTool: DefaultToolState,
  groupTool: DefaultToolState,
  selectTool: DefaultToolState,
  colorPaletteTool: DefaultToolState,
  noteBookTool: DefaultToolState,
  handMove: DefaultToolState,
};

type ToolsKey = keyof typeof initialState;

const toolSlice = createSlice({
  name: "tool",
  initialState,
  reducers: {
    toggleToolsState: (
      state,
      action: PayloadAction<{ name: ToolsKey; state: boolean }>
    ) => {
      let type = action.payload;
      switch (type.name) {
        case "newElementTool":
          state.newElementTool.state = type.state;
          break;
        case "locationTool":
          state.locationTool.state = type.state;
          break;
        case "moveTool":
          state.moveTool.state = type.state;
          break;
        case "arrangeTool":
          state.arrangeTool.state = type.state;
          break;
        case "propertyTool":
          state.propertyTool.state = type.state;
          break;
        case "groupTool":
          state.groupTool.state = type.state;
          break;
        case "selectTool":
          state.selectTool.state = type.state;
          break;
        case "colorPaletteTool":
          state.colorPaletteTool.state = type.state;
          break;
        case "noteBookTool":
          state.noteBookTool.state = type.state;
          break;
        case "handMove":
          state.handMove.state = type.state;
          break;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleToolsState } = toolSlice.actions;
export default toolSlice.reducer;
