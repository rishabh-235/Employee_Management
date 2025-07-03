import { configureStore } from "@reduxjs/toolkit";
import { leadApiSlice } from "./slices/API/lead.apiSlice";
import { employeeApiSlice } from "./slices/API/employee.apiSlice";
import userReducer from "./slices/State/user.stateSlice";

export default configureStore({
  reducer: {
    [leadApiSlice.reducerPath]: leadApiSlice.reducer,
    [employeeApiSlice.reducerPath]: employeeApiSlice.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(leadApiSlice.middleware, employeeApiSlice.middleware),
});
