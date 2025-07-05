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
          const count = parseInt(localStorage.getItem("tab"));
          const token = sessionStorage.getItem('auth_token');
          if (!token) {
            sessionStorage.setItem('auth_token', response.employee._id);
            localStorage.setItem("tab", count + 1);
          }
        })
        .catch((error) => {
          console.error("Error fetching employee:", error);
        });
    }
  }, []);

  window.addEventListener("beforeunload", () => {
    const count = parseInt(localStorage.getItem("tab"));
    if (count > 0) {
      localStorage.setItem("tab", count - 1);
      if (count === 1) {
        localStorage.removeItem("empID");
        localStorage.removeItem("tab");
      }
    }
  });

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
