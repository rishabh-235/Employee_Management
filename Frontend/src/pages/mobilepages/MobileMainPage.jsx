import MobileHeader from "../../components/MobileHeader";
import MobileFooter from "../../components/MobileFooter";
import { Outlet } from "react-router-dom";
import MobileLoginPage from "./MobileLoginPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { login } from "../../redux/slices/State/user.stateSlice";
import { useLoginEmployeeMutation } from "../../redux/slices/API/employee.apiSlice";

function MobileMainPage() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const [loginEmployee] = useLoginEmployeeMutation();

  // useEffect(()=>{
  //  const tab = localStorage.getItem("tab");
  //  const email = localStorage.getItem("email");
  //  const password = localStorage.getItem("password");
  //  if(tab>0){
  //   loginEmployee()
  //   dispatch(login())
  //  }
  // }, [])

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
