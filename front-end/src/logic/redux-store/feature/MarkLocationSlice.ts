import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createMarkLocation,
  ProtoPenMarkLocation,
} from "../../proto_pen_method/proto_create_mark_location";

interface initialState {
  markLocation: { [x: string]: ProtoPenMarkLocation };
}

const initialState: initialState = {
  markLocation: {
    "Top Left": createMarkLocation("Top Left", 0, 0),
    "Top Right": createMarkLocation("Top Right", 5000, 0),
    "Bottom Left": createMarkLocation("Bottom Left", 0, 5000),
    "Bottom Right": createMarkLocation("Bottom Right", 5000, 5000),
  },
};

export const markLocationSlice = createSlice({
  name: "markLocation",
  initialState,
  reducers: {
    setMarkLocation: (
      state,
      action: PayloadAction<{ name: string; x: number; y: number }>
    ) => {
      state.markLocation[action.payload.name] = {
        name: action.payload.name,
        x: action.payload.x,
        y: action.payload.y,
      };
    },
    deleteMarkLocation: (state, action: PayloadAction<string>) => {
      delete state.markLocation[action.payload];
    },
  },
});

export const { setMarkLocation,deleteMarkLocation } = markLocationSlice.actions;
export default markLocationSlice.reducer;
