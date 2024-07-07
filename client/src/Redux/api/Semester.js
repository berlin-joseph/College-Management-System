import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base_url } from "../constants/url";

export const semesterApi = createApi({
  reducerPath: "semesterApi",
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
  }),
  endpoints: (build) => ({
    createSemester: build.mutation({
      query: ({ semester }) => ({
        url: "semester",
        method: "POST",
        body: { semester },
      }),
    }),
    getSemester: build.query({
      query: () => ({
        url: "semester",
      }),
    }),
    deleteSemesterById: build.mutation({
      query: ({ id }) => ({
        url: "semester/:id",
        method: "DELETE",
        body: { _id: id },
      }),
    }),
  }),
});

export const {
  useCreateSemesterMutation,
  useGetSemesterQuery,
  useDeleteSemesterByIdMutation,
} = semesterApi;
