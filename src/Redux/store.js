import { configureStore } from "@reduxjs/toolkit";
import crudReducer from "./crudSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: { crud: crudReducer, user: userReducer },
});
