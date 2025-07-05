// src/store/authApi.js
import { apiSlice } from "./apiSlice";
import { setCredentials } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (!data.error && data.payload) {
            dispatch(setCredentials({ token: data.payload }));
          }
        } catch (err) {
          console.error("Login failed:", err);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
