import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base_url } from "../constants/url";

export const departmentApi = createApi({
  reducerPath: "departmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
  }),
  endpoints: (build) => ({
    createDepartment: build.mutation({
      query: ({ departmentId, departmentName }) => ({
        url: "department",
        method: "POST",
        body: { department_id: departmentId, department_name: departmentName },
      }),
    }),
    deleteDepartment: build.mutation({
      query: ({ id }) => ({
        url: "department/:id",
        method: "DELETE",
        body: { _id: id },
      }),
    }),
    getDepartment: build.query({
      query: () => ({
        url: "department",
      }),
    }),
  }),
});

export const {
  useCreateDepartmentMutation,
  useDeleteDepartmentMutation,
  useGetDepartmentQuery,
} = departmentApi;
