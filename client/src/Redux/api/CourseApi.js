import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base_url } from "../constants/url";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
  }),
  endpoints: (build) => ({
    createCourse: build.mutation({
      query: ({ name, semester, degree, department }) => ({
        url: "subject",
        method: "POST",
        body: {
          subject_name: name,
          semester: semester,
          degree: degree,
          department: department,
        },
      }),
    }),
    deleteSubjectById: build.mutation({
      query: ({ id }) => ({
        url: "subject/:id",
        method: "DELETE",
        body: { _id: id },
      }),
    }),
    getCourse: build.query({
      query: () => ({
        url: "subject",
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetCourseQuery,
  useDeleteSubjectByIdMutation,
} = courseApi;
