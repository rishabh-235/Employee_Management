import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const employeeApiSlice = createApi({
  reducerPath: "employeeApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKENDURL}api/employees` }),
  endpoints: (builder) => ({
    getAllEmployees: builder.query({
      query: () => "/getallEmployees",
    }),
    getEmployee: builder.mutation({
      query: (employeeId) => ({
        url: "/getemployee",
        method: "POST",
        body: employeeId,
      }),
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

export const {
  useGetAllEmployeesQuery,
  useGetEmployeeMutation,
  useAddEmployeeMutation,
  useLoginEmployeeMutation,
} = employeeApiSlice;
