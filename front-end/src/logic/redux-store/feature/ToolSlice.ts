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
    toggleToolsState: (state, action: PayloadAction<{name:ToolsKey; state: boolean}>) => {
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
