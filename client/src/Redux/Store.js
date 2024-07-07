import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { degreeApi } from "./api/degreeApi";
import { departmentApi } from "./api/departmentApi";
import { semesterApi } from "./api/Semester";
import { courseApi } from "./api/CourseApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [degreeApi.reducerPath]: degreeApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [semesterApi.reducerPath]: semesterApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(degreeApi.middleware)
      .concat(departmentApi.middleware)
      .concat(semesterApi.middleware)
      .concat(courseApi.middleware),
});
