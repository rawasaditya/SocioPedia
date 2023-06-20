import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./index";
export const store = configureStore({ reducer: authReducer });
