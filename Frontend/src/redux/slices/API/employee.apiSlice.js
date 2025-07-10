import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const employeeApiSlice = createApi({
  reducerPath: "employeeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKENDURL}api/employees`,
  }),
  endpoints: (builder) => ({
    getAllEmployees: builder.query({
      query: () => "/getallemployees",
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
        url: "/addemployee",
        method: "POST",
        body: newEmployee,
      }),
    }),
    updateEmployee: builder.mutation({
      query: (employeeData) => ({
        url: "/updateemployee",
        method: "POST",
        body: employeeData,
      }),
    }),
    loginEmployee: builder.mutation({
      query: (credentials) => ({
        url: "/loginemployee",
        method: "POST",
        body: credentials,
      }),
    }),
    logoutEmployee: builder.mutation({
      query: (employeeId) => ({
        url: "/logoutemployee",
        method: "POST",
        body: employeeId,
      }),
    }),
  }),
});

export const {
  useGetAllEmployeesQuery,
  useGetEmployeeMutation,
  useAddEmployeeMutation,
  useLoginEmployeeMutation,
  useLogoutEmployeeMutation,
  useUpdateEmployeeMutation
} = employeeApiSlice;
