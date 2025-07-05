// src/store/tasksApi.js
import { apiSlice } from "./apiSlice";

export const tasksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/tasks",
      providesTags: ["Task"],
      transformResponse: (response) => {
        return response.error ? [] : response.payload;
      },
    }),
    getTask: builder.query({
      query: (id) => `/tasks/${id}`,
      providesTags: (result, error, id) => [{ type: "Task", id }],
      transformResponse: (response) => {
        return response.error ? null : response.payload;
      },
    }),
    createTask: builder.mutation({
      query: (newTask) => ({
        url: "/tasks",
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: ["Task"],
      transformResponse: (response) => {
        return response.error ? null : response.payload;
      },
    }),
    updateTask: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/tasks/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Task", id }],
      transformResponse: (response) => {
        return response.error ? null : response.payload;
      },
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
    assignTask: builder.mutation({
      query: ({ id, employeeId }) => ({
        url: `/tasks/${id}/assign`,
        method: "PUT",
        body: { employeeId },
      }),
      invalidatesTags: ["Task", "Employee"],
      transformResponse: (response) => {
        return response.error ? null : response.payload;
      },
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useAssignTaskMutation,
} = tasksApi;
