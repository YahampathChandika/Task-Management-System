// src/store/employeesApi.js
import { apiSlice } from "./apiSlice";

export const employeesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => "/employees",
      providesTags: ["Employee"],
      transformResponse: (response) => {
        // Handle the API response structure { error: boolean, payload: data }
        return response.error ? [] : response.payload;
      },
    }),
    getEmployee: builder.query({
      query: (id) => `/employees/${id}`,
      providesTags: (result, error, id) => [{ type: "Employee", id }],
      transformResponse: (response) => {
        return response.error ? null : response.payload;
      },
    }),
    createEmployee: builder.mutation({
      query: (newEmployee) => ({
        url: "/employees",
        method: "POST",
        body: newEmployee,
      }),
      invalidatesTags: ["Employee"],
      transformResponse: (response) => {
        return response.error ? null : response.payload;
      },
    }),
    updateEmployee: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/employees/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Employee", id }],
      transformResponse: (response) => {
        return response.error ? null : response.payload;
      },
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employee"],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeesApi;
