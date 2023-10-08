import { createAction } from "@reduxjs/toolkit";

export const setAccessToken = createAction<string | null>(
  "auth/setAccessToken"
);
export const clearAccessToken = createAction<void>("auth/clearAccessToken");
