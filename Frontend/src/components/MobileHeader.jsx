import "./style/mobileheader.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/State/user.stateSlice";

function MobileHeader() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const hour = new Date().getHours();
  let greeting = "Good Evening";
  if (hour >= 6 && hour < 12) {
    greeting = "Good Morning";
  } else if (hour >= 12 && hour < 16) {
    greeting = "Good Afternoon";
  }

  return (
    <div className="mobile-header-container">
      <div className="mobile-header">
        <div className="mobile-header-logo">
          Canova<span>CRM</span>
        </div>

        <div className="mobile-header-title">
          <p>{greeting}</p>
          <h4>{user.isLoggedIn ? user.user.firstName : "Guest"}</h4>
        </div>
      </div>
      <svg
        width="350"
        height="126"
        viewBox="0 0 300 126"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mobile-header-svg"
      >
        <path
          d="M331.607 3.17487C321.2 52.9635 265.631 85.1133 207.49 74.9835C149.35 64.8538 110.654 16.2804 121.061 -33.5082C131.468 -83.2968 187.037 -115.447 245.178 -105.317C303.318 -95.1871 342.014 -46.6137 331.607 3.17487Z"
          fill="url(#paint0_linear_57_669)"
          fillOpacity="0.1"
        />
        <path
          d="M212.39 51.5445C201.983 101.333 146.414 133.483 88.273 123.353C30.1323 113.223 -8.56339 64.65 1.84369 14.8614C12.2508 -34.9272 67.8197 -67.077 125.96 -56.9473C184.101 -46.8175 222.797 1.75588 212.39 51.5445Z"
          fill="url(#paint1_linear_57_669)"
          fillOpacity="0.1"
        />
        <defs>
          <linearGradient
            id="paint0_linear_57_669"
            x1="125.96"
            y1="-56.9473"
            x2="94.3621"
            y2="124.414"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#2051E5" />
            <stop offset="1" stopColor="#DEE6FF" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_57_669"
            x1="125.96"
            y1="-56.9473"
            x2="94.3621"
            y2="124.414"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#2051E5" />
            <stop offset="1" stopColor="#DEE6FF" />
          </linearGradient>
        </defs>
      </svg>

      {user.isLoggedIn && (
        <button onClick={() => dispatch(logout())} className="logout-button">
          Logout
        </button>
      )}
    </div>
  );
}

export default MobileHeader;
