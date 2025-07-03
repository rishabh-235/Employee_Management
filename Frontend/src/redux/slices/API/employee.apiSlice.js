import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const employeeApiSlice = createApi({
  reducerPath: "employeeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://employee-management-0pu3.onrender.com/api/employees" }),
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => "/getallEmployees",
    }),
    addEmployee: builder.mutation({
      query: (newEmployee) => ({
        url: "/addEmployee",
        method: "POST",
        body: newEmployee,
      }),
    }),
    loginEmployee: builder.mutation({
      query: (credentials) => ({
        url: "/loginEmployee",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useGetEmployeesQuery, useAddEmployeeMutation, useLoginEmployeeMutation } = employeeApiSlice;
