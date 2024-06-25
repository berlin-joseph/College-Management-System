import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base_url } from "../constants/url";

export const degreeApi = createApi({
  reducerPath: "degreeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
  }),
  endpoints: (build) => ({
    createDegree: build.mutation({
      query: ({ degreeId, degreeName }) => ({
        url: "degree",
        method: "POST",
        body: { degree_id: degreeId, degree_name: degreeName },
      }),
    }),
    getDegree: build.query({
      query: () => ({
        url: "degree",
      }),
    }),
  }),
});

export const { useCreateDegreeMutation, useGetDegreeQuery } = degreeApi;
