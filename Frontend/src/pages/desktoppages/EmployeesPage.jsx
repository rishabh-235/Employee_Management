import React, { useState } from "react";
import "./styles/employeepage.css";
import avatar from "../../assets/Avatar.png";
import {
  useAddEmployeeMutation,
  useGetEmployeesQuery,
} from "../../redux/slices/API/employee.apiSlice";

function EmployeesPage() {
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [addEmployee] = useAddEmployeeMutation();
  const { data: employees } = useGetEmployeesQuery();

  const handleToggleShowEmployee = () => {
    setShowAddEmployee(!showAddEmployee);
  };

  const handleAddEmployee = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newEmployee = Object.fromEntries(formData);
    addEmployee(newEmployee)
      .unwrap()
      .then(() => {
        setShowAddEmployee(false);
        event.target.reset();
      })
      .catch((error) => {
        console.error("Failed to add employee:", error);
      });
  };

  return (
    <div className="employees-page-container">
      <button
        className="add-employee-button"
        onClick={handleToggleShowEmployee}
      >
        Add Employee
      </button>
      <div className="employee-list">
        <div className="employee-list-header">
          <div className="header-employee-name">Name</div>
          <div className="header-employee-id">Employee ID</div>
          <div className="header-assigned-leads">Assigned Leads</div>
          <div className="header-closed-leads">Closed Leads</div>
          <div className="header-status">Status</div>
        </div>

        <div className="employee-list-body">
          {employees?.map((employee, index) => (
            <div key={index} className="employee-table-row">
              <div className="employee-avatar">
                <div>
                  {employee.firstName.charAt(0).toUpperCase()}{employee.lastName.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="employee-name">
                {employee.firstName} {employee.lastName}{" "}
                <span className="employee-email">{employee.email}</span>{" "}
              </div>
              <div className="employee-id">{employee.employeeId}</div>
              <div className="assigned-leads">{employee.assignedLeads.length}</div>
              <div className="closed-leads">{employee.closedLeads}</div>
              <div className="status">
                <div className={`${employee.status === "active" ? "active-background" : "inactive-background"}`}>
                  <div>{""}</div>
                  {employee.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pagination-container">
        <button className="pagination-previous-button">Previous</button>
        <div className="page-numbers">
          <span className="page-number active-page">1</span>
          <span className="page-number">2</span>
          <span className="page-number">3</span>
          <span className="page-number">...</span>
          <span className="page-number">8</span>
          <span className="page-number">9</span>
          <span className="page-number">10</span>
        </div>
        <button className="pagination-next-button">Next</button>
      </div>

      {showAddEmployee && (
        <div className="add-employee-container">
          <div className="add-employee-card">
            <div className="add-employee-header">
              Add Employee
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ cursor: "pointer" }}
                onClick={handleToggleShowEmployee}
              >
                <path
                  d="M18.3002 5.70997C17.9102 5.31997 17.2802 5.31997 16.8902 5.70997L12.0002 10.59L7.11022 5.69997C6.72022 5.30997 6.09021 5.30997 5.70021 5.69997C5.31021 6.08997 5.31021 6.71997 5.70021 7.10997L10.5902 12L5.70021 16.89C5.31021 17.28 5.31021 17.91 5.70021 18.3C6.09021 18.69 6.72022 18.69 7.11022 18.3L12.0002 13.41L16.8902 18.3C17.2802 18.69 17.9102 18.69 18.3002 18.3C18.6902 17.91 18.6902 17.28 18.3002 16.89L13.4102 12L18.3002 7.10997C18.6802 6.72997 18.6802 6.08997 18.3002 5.70997Z"
                  fill="#0B0B0B"
                />
              </svg>
            </div>

            <div className="add-employee-form">
              <form onSubmit={handleAddEmployee}>
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" required />
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" required />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
                <label htmlFor="location">Location</label>
                <input type="text" id="location" name="location" required />
                <label htmlFor="language">Preferred Language</label>
                <input type="text" id="language" name="language" required />
                <button className="add-employee-save-button">Save</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeesPage;
