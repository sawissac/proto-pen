import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createProtoPenElement,
  ProtoPenElement,
} from "../../proto_pen_method/proto_create_element";
import { math_half } from "../../proto_pen_method/proto_math";
import { arrange } from "../../proto_pen_method/proto_arrange";
import { CSSProperties } from "react";
import { ComponentModel } from "../../ComponentModel";

interface InitialState {
  uniqueId: number;
  activeElement: string;
  activeNode: string;
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
  activeNode: "",
  selectedElement: [],
  elementObjectData: {},
};

const elementObjectSlice = createSlice({
  name: "userInterface",
  initialState,
  reducers: {
    createElementObject: (
      state,
      action: PayloadAction<{
        uid: number;
        a: number;
        times: number;
      }>
    ) => {
      const size = action.payload.uid;
      const { a, times } = action.payload;
      let nextSize = 0;
      for (let i = size; i < times + size; i++) {
        const layer = i;
        const name = `eid-${layer}`;
        state.elementObjectData[name] = createProtoPenElement(
          name,
          layer,
          50,
          50,
          math_half(a)
        );
        nextSize = i + 1;
      }
      state.uniqueId = nextSize;
    },
    duplicateElementObject: (state) => {
      let id = state.uniqueId;
      let activeElement = state.activeElement;
      let elo = state.elementObjectData;
      let name = "eid-" + id;
      elo[name] = createProtoPenElement(name, id, 0, 0, 0);
      elo[name].position.x = elo[activeElement].position.x + 50;
      elo[name].position.y = elo[activeElement].position.y + 50;
      elo[name].w = elo[activeElement].w;
      elo[name].h = elo[activeElement].h;
      elo[name].className = elo[activeElement].className;
      elo[name].relationship = elo[activeElement].relationship;
      elo[name].type = elo[activeElement].type;
      state.uniqueId = id + 1;
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
      const ave = state.activeElement;
      const sle = state.selectedElement;
      const elo = state.elementObjectData;
      const toDelete = [ave, ...sle];

      if (!ave) toDelete.shift();

      toDelete.map((i) => {
        const { type, relationship, name, className } = elo[i];

        //! delete class name
        Object.keys(className).map((i) => {
          delete elo[i].cssSharedChild[name];
        });

        //! if node model is deleted it will search it shared child and
        //! delete it name in the child class name
        if (type === ComponentModel.nm) {
          const toDeleteCssSharedChild = Object.keys(elo[i].cssSharedChild);
          toDeleteCssSharedChild.map((sharedChildName) => {
            delete elo[sharedChildName].className[i];
          });
        }
        //! if child is deleted, will look for parent and delete name in parent
        relationship.parent.map((pi) => {
          elo[pi].relationship.children = elo[pi].relationship.children.filter(
            (fi) => fi !== name
          );
        });
        //! if node model parent is deleted, will look for child and delete name in child
        relationship.children.map((ci) => {
          elo[ci].relationship.parent = elo[ci].relationship.parent.filter(
            (fi) => fi !== name
          );
        });

        delete elo[i];
      });

      const toRender = Object.keys(elo);

      toRender.map((i) => {
        const { relationship } = elo[i];
        if (
          relationship.children.length === 0 &&
          relationship.parent.length === 0
        ) {
          relationship.status = false;
        }
      });
    },
    setTextOfActiveObject: (state, action: PayloadAction<string>) => {
      state.elementObjectData[state.activeElement].text = action.payload;
    },
    setTypeOfActiveObject: (state, action: PayloadAction<string>) => {
      if (ComponentModel.bm) {
        state.elementObjectData[state.activeElement].w = 50;
        state.elementObjectData[state.activeElement].h = 50;
      }
      state.elementObjectData[state.activeElement].type = action.payload;
    },
    setWidthOfActiveObject: (
      state,
      action: PayloadAction<{ activeEl: string; w: number; h: number }>
    ) => {
      if (action.payload.activeEl) {
        state.elementObjectData[action.payload.activeEl].w = action.payload.w;
        state.elementObjectData[action.payload.activeEl].h = action.payload.h;
      }
    },
    groupToActiveElement: (state) => {
      const elo = state.elementObjectData;
      const sle = state.selectedElement.filter(
        (i) => elo[i].type !== ComponentModel.nm
      );

      if (sle.length > 0) {
        elo[state.activeElement].relationship.status = true;

        elo[state.activeElement].relationship.children = [
          ...elo[state.activeElement].relationship.children,
          ...sle,
        ];
        sle.map((i) => {
          elo[i].relationship.parent = [
            ...elo[i].relationship.parent,
            state.activeElement,
          ];
        });
      }
    },
    //! node model part
    updateCssProps: (
      state,
      action: PayloadAction<{ activeEl: any; css: CSSProperties }>
    ) => {
      state.elementObjectData[action.payload.activeEl].css = action.payload.css;
    },
    sharedCss: (
      state,
      action: PayloadAction<{
        activeEl: any;
        cssSharedChild: any;
      }>
    ) => {
      state.elementObjectData[action.payload.activeEl].cssSharedChild =
        action.payload.cssSharedChild;
      const ele = Object.keys(action.payload.cssSharedChild);

      ele.map((i) => {
        state.elementObjectData[i].className[action.payload.activeEl] =
          "shared";
      });
    },
    disconnectCssSharedChild: (
      state,
      action: PayloadAction<{
        activeEl: any;
        deleteName: any;
      }>
    ) => {
      const elo = state.elementObjectData;
      const { deleteName, activeEl } = action.payload;
      delete elo[activeEl].cssSharedChild[deleteName];
      delete elo[deleteName].className[activeEl];
    },
    createNode: (state, action: PayloadAction<{ name: string }>) => {
      let id = state.uniqueId;
      let elo = state.elementObjectData;
      let { name } = action.payload;
      let eid = "eid-" + id;
      elo[eid] = createProtoPenElement(eid, id, 0, 0, 0);
      elo[eid].css = { width: "50px", height: "50px" };
      elo[eid].text = name;
      elo[eid].type = ComponentModel.nm;
      state.uniqueId = id + 1;
    },
    removeNode: (state, action: PayloadAction<string>) => {
      const elementObjectData = state.elementObjectData;
      const activeNode = action.payload;
      const childToRemove = Object.keys(
        elementObjectData[activeNode].cssSharedChild
      );
      childToRemove.map((sharedChildName) => {
        delete elementObjectData[activeNode].cssSharedChild[sharedChildName];
        delete elementObjectData[sharedChildName].className[activeNode];
      });
      delete elementObjectData[activeNode];
    },
    renameNode: (state, action: PayloadAction<string>) => {
      state.elementObjectData[state.activeNode].text = action.payload;
    },
    setActiveNode: (state, action: PayloadAction<string>) => {
      state.activeNode = action.payload;
    },
    duplicateNode: (state, action: PayloadAction<string>) => {
      let id = state.uniqueId;
      let elo = state.elementObjectData;
      let activeElement = action.payload;
      let name = "eid-" + id;

      elo[name] = createProtoPenElement(name, id, 0, 0, 0);
      elo[name].text = elo[activeElement].text + "- copy";
      elo[name].css = elo[activeElement].css;
      elo[name].cssSharedChild = {};
      elo[name].type = ComponentModel.nm;
      elo[name].position.x = elo[activeElement].position.x + 50;
      elo[name].position.y = elo[activeElement].position.y + 50;

      state.uniqueId = id + 1;
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
  duplicateElementObject,
  updateCssProps,
  sharedCss,
  disconnectCssSharedChild,
  setActiveNode,
  createNode,
  removeNode,
  renameNode,
  duplicateNode,
} = elementObjectSlice.actions;
export default elementObjectSlice.reducer;

//! relationship
function healRelationship(data: any) {}
