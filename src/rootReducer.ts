// libraries
import { combineReducers } from "@reduxjs/toolkit";

// features/auth
import authReducer from "./features/auth/authSlice";
import userReducer from "./features/auth/userSlice";

// features/diary
import diariesReducer from "./features/diary/dairiesSlice";

// features/entry
import entriesReducer from "./features/entry/entriesSlice";
import editorReducer from "./features/entry/editorSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  diaries: diariesReducer,
  entries: entriesReducer,
  user: userReducer,
  editor: editorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
