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
    createUser: build.mutation({
      query: (formData) => ({
        url: "createUser",
        method: "POST",
        body: formData,
      }),
    }),
    getUserByType: build.mutation({
      query: ({ userType }) => ({
        url: "getUserByType",
        method: "POST",
        body: { user_type: userType },
      }),
    }),
    deleteUserById: build.mutation({
      query: ({ id }) => ({
        url: "deleteUser",
        method: "DELETE",
        body: { _id: id },
      }),
    }),
    getUserById: build.mutation({
      query: ({ userId }) => ({
        url: "getUserById",
        method: "POST",
        body: { _id: userId },
      }),
    }),
  }),
});

export const {
  useAuthLoginMutation,
  useCreateUserMutation,
  useGetUserByTypeMutation,
  useDeleteUserByIdMutation,
  useGetUserByIdMutation,
} = authApi;
