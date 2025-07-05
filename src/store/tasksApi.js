// src/store/tasksApi.js
import { apiSlice } from "./apiSlice";

export const tasksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/tasks",
      providesTags: (result) => {
        // Provide tags for the list and individual items
        return result
          ? [
              ...result.map(({ id }) => ({ type: "Task", id })),
              { type: "Task", id: "LIST" },
            ]
          : [{ type: "Task", id: "LIST" }];
      },
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
      invalidatesTags: [
        { type: "Task", id: "LIST" },
        { type: "Employee", id: "LIST" }, // Invalidate employees if task assignment affects workload
      ],
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
      invalidatesTags: (result, error, { id }) => [
        { type: "Task", id },
        { type: "Task", id: "LIST" }, // Always invalidate the list
        { type: "Employee", id: "LIST" }, // Invalidate employees since workload might change
      ],
      transformResponse: (response) => {
        return response.error ? null : response.payload;
      },
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Task", id },
        { type: "Task", id: "LIST" },
        { type: "Employee", id: "LIST" }, // Invalidate employees since workload changes
      ],
    }),
    assignTask: builder.mutation({
      query: ({ id, employeeId }) => ({
        url: `/tasks/${id}/assign`,
        method: "PUT",
        body: { employeeId },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Task", id },
        { type: "Task", id: "LIST" }, // Invalidate task list to show assignment changes
        { type: "Employee", id: "LIST" }, // Invalidate employees to update workload
      ],
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
