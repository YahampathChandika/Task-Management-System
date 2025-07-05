// src/store/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || "http://localhost:3000",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    headers.set("content-type", "application/json");
    return headers;
  },
});

// Enhanced base query with better error handling
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Handle 401 unauthorized - could add auto-logout here if needed
  if (result.error && result.error.status === 401) {
    // Could dispatch logout action here
    console.warn("Unauthorized request - token may be expired");
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Employee", "Task", "Auth"],
  // Keep data fresh with refetch on focus/reconnect
  refetchOnFocus: true,
  refetchOnReconnect: true,
  // Keep unused data for 60 seconds
  keepUnusedDataFor: 60,
  endpoints: (builder) => ({}),
});
