import { createReducer } from "@reduxjs/toolkit";
import { AuthState } from "../../../types";
import { setAccessToken, clearAccessToken } from "./actions";

const initialState: AuthState = {
  accessToken: null,
};

const authReducer = createReducer(initialState, builder => {
  builder
    .addCase(setAccessToken, (state, action) => {
      state.accessToken = action.payload;
    })
    .addCase(clearAccessToken, state => {
      state.accessToken = null;
    });
});

export default authReducer;
