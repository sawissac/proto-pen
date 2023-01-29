import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createProtoPenElement,
  ProtoPenElement,
} from "../../proto_pen_method/proto_create_element";
import { math_half } from "../../proto_pen_method/proto_math";
import { arrange } from "../../proto_pen_method/proto_arrange";
import { CSSProperties } from "react";

interface InitialState {
  uniqueId: number;
  activeElement: string;
  selectedElement: string[];
  elementObjectData: { [x: string]: ProtoPenElement };
}

interface ElementObjectPosition {
  x: number;
  y: number;
  dx: number;
  dy: number;
}

const initialState: InitialState = {
  uniqueId: 0,
  activeElement: "",
  selectedElement: [],
  elementObjectData: {},
};

const elementObjectSlice = createSlice({
  name: "userInterface",
  initialState,
  reducers: {
    createElementObject(
      state,
      action: PayloadAction<{
        uid: number;
        w: number;
        h: number;
        a: number;
        times: number;
      }>
    ) {
      const size = action.payload.uid;
      const { w, h, a, times } = action.payload;
      let nextSize = 0;
      for (let i = size; i < times + size; i++) {
        const layer = i;
        const name = `eid-${layer}`;
        state.elementObjectData[name] = createProtoPenElement(
          name,
          layer,
          w,
          h,
          math_half(a)
        );
        nextSize = i + 1;
      }
      state.uniqueId = nextSize;
    },
    setActiveElementPos: (
      state,
      action: PayloadAction<{
        activeElement: string;
        position: ElementObjectPosition;
      }>
    ) => {
      state.elementObjectData[action.payload.activeElement].position =
        action.payload.position;
    },
    setElementPosMulti: (
      state,
      action: PayloadAction<{
        list: string[];
        position: ElementObjectPosition;
      }>
    ) => {
      action.payload.list.map((i) => {
        state.elementObjectData[i].position = action.payload.position;
      });
    },
    setActiveElement: (state, action: PayloadAction<string>) => {
      state.activeElement = action.payload;
      if (state.selectedElement.includes(action.payload)) {
        state.selectedElement = state.selectedElement.filter(
          (i) => i !== action.payload
        );
      }
    },
    setSelectedElement: (state, action: PayloadAction<string[]>) => {
      state.selectedElement = action.payload;
    },
    arrangeSelectedElement: (
      state,
      action: PayloadAction<{ c: number; g: number }>
    ) => {
      state.elementObjectData = {
        ...state.elementObjectData,
        ...arrange({
          activeElement: state.activeElement,
          column: action.payload.c,
          gap: action.payload.g,
          originList: state.elementObjectData,
          selectedList: state.selectedElement,
        }),
      };
    },
    deleteActiveSelect: (state) => {
      const toDelete = [state.activeElement, ...state.selectedElement];
      if (!state.activeElement) toDelete.shift();

      toDelete.map((i) => {
        delete state.elementObjectData[i];
      });
    },
    setTextOfActiveObject: (state, action: PayloadAction<string>) => {
      state.elementObjectData[state.activeElement].text = action.payload;
    },
    setTypeOfActiveObject: (state, action: PayloadAction<string>) => {
      state.elementObjectData[state.activeElement].type = action.payload;
    },
    setWidthOfActiveObject: (
      state,
      action: PayloadAction<{ w: number; h: number }>
    ) => {
      if (state.activeElement) {
        state.elementObjectData[state.activeElement].w = action.payload.w;
        state.elementObjectData[state.activeElement].h = action.payload.h;
      }
    },
    groupToActiveElement: (state) => {
      state.elementObjectData[state.activeElement].relationship.status = true;
      state.elementObjectData[state.activeElement].relationship.children = [
        ...state.elementObjectData[state.activeElement].relationship.children,
        ...state.selectedElement,
      ];
    },
    updateCssProps: (state, action: PayloadAction<{ css: CSSProperties }>) => {
      state.elementObjectData[state.activeElement].css = action.payload.css;
    },
    sharedCss: (
      state,
      action: PayloadAction<{
        cssSharedChild: any;
      }>
    ) => {
      state.elementObjectData[state.activeElement].cssSharedChild =
        action.payload.cssSharedChild;
      const ele = Object.keys(action.payload.cssSharedChild);
      ele.map((i) => {
        state.elementObjectData[i].className[state.activeElement] = "shared";
      });
    },
    deleteActiveChild: (state, action: PayloadAction<{ae: string,child:string}>) => {
      let child =
        state.elementObjectData[action.payload.ae].relationship.children;
      child = child.filter((i) => i !== action.payload.child);
    },
  },
});

export const {
  createElementObject,
  setActiveElement,
  setSelectedElement,
  setActiveElementPos,
  setElementPosMulti,
  arrangeSelectedElement,
  deleteActiveSelect,
  setTextOfActiveObject,
  setTypeOfActiveObject,
  setWidthOfActiveObject,
  groupToActiveElement,
  updateCssProps,
  sharedCss,
  deleteActiveChild
} = elementObjectSlice.actions;
export default elementObjectSlice.reducer;
