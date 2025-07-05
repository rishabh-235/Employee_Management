import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const activityApiSlice = createApi({
  reducerPath: "activityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKENDURL}api/activities`,
  }),
  endpoints: (builder) => ({
    getActivityAdmin: builder.query({
      query: () => "/getactivityadmin",
    }),
    getActivityEmployee: builder.mutation({
      query: (employeeId) => ({
        url: "/getactivityemployee",
        method: "POST",
        body: { employeeId },
      }),
    }),
  }),
});

export const { useGetActivityAdminQuery, useGetActivityEmployeeMutation } =
  activityApiSlice;
