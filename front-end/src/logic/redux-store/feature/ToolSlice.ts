import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const DefaultToolState = {
  state: false,
  position: { x: 0, y: 0 },
};

const initialState = {
  newElementTool: DefaultToolState,
  locationTool: DefaultToolState,
  moveTool: DefaultToolState,
  pin: DefaultToolState,
  arrangeTool: DefaultToolState,
  propertyTool: DefaultToolState,
  groupTool: DefaultToolState,
};

type ToolsKey = keyof typeof initialState;

type ChangeToolPosPayload = {
  name: ToolsKey;
  position: {
    x: number;
    y: number;
  };
};

const toolSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    toggleToolsState: (state, action: PayloadAction<ToolsKey>) => {
      let type = action.payload;
      switch (type) {
        case "newElementTool":
          state.newElementTool.state = !state.newElementTool.state;
          break;
        case "locationTool":
          state.locationTool.state = !state.locationTool.state;
          break;
        case "moveTool":
          state.moveTool.state = !state.moveTool.state;
          break;
        case "arrangeTool":
          state.arrangeTool.state = !state.arrangeTool.state;
          break;
        case "propertyTool":
          state.propertyTool.state = !state.propertyTool.state;
          break;
        case "groupTool":
          state.groupTool.state = !state.groupTool.state;
          break;
      }
    },

    changeToolsPos: (state, action: PayloadAction<ChangeToolPosPayload>) => {
      let type = action.payload.name;

      switch (type) {
        case "newElementTool":
          state.newElementTool.position = action.payload.position;
          break;
        case "locationTool":
          state.locationTool.position = action.payload.position;
          break;
        case "moveTool":
          state.moveTool.position = action.payload.position;
          break;
        case "arrangeTool":
          state.arrangeTool.position = action.payload.position;
          break;
        case "pin":
          state.pin.position = action.payload.position;
          break;
        case "propertyTool":
          state.propertyTool.position = action.payload.position;
          break;
        case "groupTool":
          state.groupTool.position = action.payload.position;
          break;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleToolsState, changeToolsPos } = toolSlice.actions;
export default toolSlice.reducer;
