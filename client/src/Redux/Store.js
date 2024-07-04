import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { degreeApi } from "./api/degreeApi";
import { departmentApi } from "./api/departmentApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [degreeApi.reducerPath]: degreeApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(degreeApi.middleware)
      .concat(departmentApi.middleware),
});
