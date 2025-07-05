// src/store/employeesApi.js
import { apiSlice } from "./apiSlice";

export const employeesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => "/employees",
      providesTags: (result) => {
        // Provide tags for the list and individual items
        return result
          ? [
              ...result.map(({ id }) => ({ type: "Employee", id })),
              { type: "Employee", id: "LIST" },
            ]
          : [{ type: "Employee", id: "LIST" }];
      },
      transformResponse: (response) => {
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
      invalidatesTags: [
        { type: "Employee", id: "LIST" },
        { type: "Task", id: "LIST" }, // Invalidate tasks too since they contain employee info
      ],
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
      invalidatesTags: (result, error, { id }) => [
        { type: "Employee", id },
        { type: "Employee", id: "LIST" },
        { type: "Task", id: "LIST" }, // Important: Invalidate tasks since tasks display employee info
      ],
      transformResponse: (response) => {
        return response.error ? null : response.payload;
      },
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Employee", id },
        { type: "Employee", id: "LIST" },
        { type: "Task", id: "LIST" }, // Invalidate tasks too
      ],
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
