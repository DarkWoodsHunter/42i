import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localHost:3001"
    }),
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => "/Tasks",
            providesTags: ["Tasks"],
        }),
        getTaskByID: builder.query({
            query: (id) => `/Tasks/?id=${id}`
        }),
        createTask: builder.mutation({
            query: (newTask) => ({
                url: "/Tasks/AddTask",
                method: "POST",
                credentials: "include",
                body: newTask
            }),
            invalidatesTags: ["Tasks"],
        }),
        editTask: builder.mutation({
            query: (updateTask) => ({
                url: `/Tasks/edit/${updateTask.id}`,
                method: "PUT",
                body: updateTask,
            }),
            invalidatesTags: ["Tasks"]
        }),
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `/Tasks/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Tasks"]
        })
    })
})

export const {useGetTasksQuery, useGetTaskByIDQuery, useCreateTaskMutation, useEditTaskMutation, useDeleteTaskMutation} = apiSlice;