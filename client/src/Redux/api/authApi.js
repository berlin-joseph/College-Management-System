import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base_url } from "../constants/url";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
  }),
  endpoints: (build) => ({
    authLogin: build.mutation({
      query: ({ email, password }) => ({
        url: "loginUser",
        method: "POST",
        body: { user_email: email, user_password: password },
      }),
    }),
  }),
});

export const { useAuthLoginMutation } = authApi;
