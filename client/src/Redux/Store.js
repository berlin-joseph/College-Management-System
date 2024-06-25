import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { degreeApi } from "./api/degreeApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [degreeApi.reducerPath]: degreeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(degreeApi.middleware),
});
