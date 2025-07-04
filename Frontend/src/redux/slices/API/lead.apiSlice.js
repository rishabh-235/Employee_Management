import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const leadApiSlice = createApi({
  reducerPath: "leadApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/leads" }),
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
        body: lead
      })
    }),
    getScheduledLeads: builder.query({
      query: () => "/getScheduledLeads",
    }),
    scheduleLead: builder.mutation({
      query: (lead) => ({
        url: "/scheduleLeads",
        method: "POST",
        body: lead,
      }),
    }),
  }),
});

export const { useGetBulkUploadLeadsQuery, useAddLeadMutation, useGetLeadMutation, useChangeTypeMutation, useChangeStatusMutation, useGetScheduledLeadsQuery, useScheduleLeadMutation } = leadApiSlice;
