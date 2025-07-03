import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const leadApiSlice = createApi({
  reducerPath: "leadApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://employee-management-0pu3.onrender.com/api/leads" }),
  endpoints: (builder) => ({
    getBulkUploadLeads: builder.query({
      query: () => "/getBulkUploadLeads",
    }),
    addLead: builder.mutation({
      query: (newLead) => ({
        url: "/addleads",
        method: "POST",
        body: newLead,
      }),
    }),
  }),
});

export const { useGetBulkUploadLeadsQuery, useAddLeadMutation } = leadApiSlice;
