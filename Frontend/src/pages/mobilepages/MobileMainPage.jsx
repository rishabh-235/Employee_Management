import MobileHeader from "../../components/MobileHeader";
import MobileFooter from "../../components/MobileFooter";
import { Outlet } from "react-router-dom";
import MobileLoginPage from "./MobileLoginPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { login } from "../../redux/slices/State/user.stateSlice";
import { useGetEmployeeMutation } from "../../redux/slices/API/employee.apiSlice";

function MobileMainPage() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const [getEmployee] = useGetEmployeeMutation();

  useEffect(() => {
    const tab = localStorage.getItem("tab");
    if (tab > 0) {
      const employeeId = localStorage.getItem("empID");
      getEmployee({ employeeId })
        .unwrap()
        .then((response) => {
          dispatch(login(response.employee));
          const count = localStorage.getItem("tab");
          localStorage.setItem("tab", count);
        })
        .catch((error) => {
          console.error("Error fetching employee:", error);
        });
    }
  }, []);

  return (
    <div>
      <MobileHeader />

      {isLoggedIn ? (
        <>
          <Outlet />
          <MobileFooter />
        </>
      ) : (
        <MobileLoginPage />
      )}
    </div>
  );
}

export default MobileMainPage;
