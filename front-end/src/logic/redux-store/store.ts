import { configureStore } from "@reduxjs/toolkit";
import toolReducer from "./feature/ToolSlice";
import userInterfaceReducer from "./feature/UserInterfaceSlice";
import markLocationReducer from "./feature/MarkLocationSlice";
import elementObjectReducer from './feature/ElementObjectSlice'

export const store = configureStore({
  reducer: {
    tool: toolReducer,
    userInterface: userInterfaceReducer,
    markLocation: markLocationReducer,
    elementObject: elementObjectReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
