import { Link, useLocation } from "react-router-dom";
import './style/beadcrum.css';

function BreadCrum() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  const breadcrumbRoutes = {
    "dashboard": " ",
    "admindashboard": "Dashboard",
    "leads": "Leads",
    "employees": "Employee",
    "settings": "Settings",
  };

  return (
    <nav className="breadcrumb-container">
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const name = breadcrumbRoutes[value] || value;

        const isLast = index === pathnames.length - 1;

        return (
          <span className="breadcrumb-item" key={to}>
            <Link to={to}>{name}</Link>{" "}
            {!isLast && (
              <svg
                width="6"
                height="11"
                viewBox="0 0 6 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="breadcrumb-icon"
              >
                <path
                  d="M3.78356 5.5L0.151855 1.85833L1.25716 0.75L5.99417 5.5L1.25716 10.25L0.151855 9.14167L3.78356 5.5Z"
                  fill="#979797"
                />
              </svg>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default BreadCrum;
