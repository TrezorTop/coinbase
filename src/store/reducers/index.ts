import { combineReducers } from "redux";
import { coinsReducer } from "./coinsReducer";

export const rootReducer = combineReducers({
  coinsState: coinsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
