import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const leadApiSlice = createApi({
  reducerPath: "leadApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKENDURL}api/leads`,
  }),
  endpoints: (builder) => ({
    getBulkUploadLeads: builder.query({
      query: () => "/getBulkUploadLeads",
    }),
    getLead: builder.mutation({
      query: (lead) => ({
        url: "/getLead",
        method: "POST",
        body: { lead },
      }),
    }),
    addLead: builder.mutation({
      query: (newLead) => ({
        url: "/addleads",
        method: "POST",
        body: newLead,
      }),
    }),
    changeType: builder.mutation({
      query: (lead) => ({
        url: "/changeType",
        method: "POST",
        body: lead,
      }),
    }),
    changeStatus: builder.mutation({
      query: (lead) => ({
        url: "/changestatus",
        method: "POST",
        body: lead,
      }),
    }),
    getScheduledLeads: builder.query({
      query: (lead) => ({
        url: "/getScheduledLeads",
        method: "POST",
        body: lead,
      }),
    }),
    scheduleLead: builder.mutation({
      query: (lead) => ({
        url: "/scheduleLeads",
        method: "POST",
        body: lead,
      }),
    }),
    getDashboardData: builder.query({
      query: () => "/getdashboarddata",
    }),
    getClosedLeads: builder.query({
      query: () => "/getclosedleads",
    }),
  }),
});

export const {
  useGetBulkUploadLeadsQuery,
  useAddLeadMutation,
  useGetLeadMutation,
  useChangeTypeMutation,
  useChangeStatusMutation,
  useGetScheduledLeadsQuery,
  useScheduleLeadMutation,
  useGetDashboardDataQuery,
  useGetClosedLeadsQuery,
} = leadApiSlice;
