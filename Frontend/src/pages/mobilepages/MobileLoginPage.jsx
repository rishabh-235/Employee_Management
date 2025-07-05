import "./style/mobileloginpage.css";
import { useLoginEmployeeMutation } from "../../redux/slices/API/employee.apiSlice";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/State/user.stateSlice";

function MobileLoginPage() {
  const [loginEmployee] = useLoginEmployeeMutation();
  const dispatch = useDispatch();

  const handleUserLogin = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    loginEmployee({ email, password })
      .unwrap()
      .then((response) => {
        event.target.reset();
        dispatch(login(response.employee));
        localStorage.setItem("tab", "1");
        localStorage.setItem("empID", response.employee.employeeId);
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  return (
    <div className="mobile-login-page-container">
      <form onSubmit={handleUserLogin} className="login-form">
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>

        <button className="login-btn">Login</button>
      </form>
    </div>
  );
}

export default MobileLoginPage;
