import React from "react";
import "./style/employeetable.css";
import avatar from "../assets/Avatar.png";
import { useGetAllEmployeesQuery } from "../redux/slices/API/employee.apiSlice";

function EmployeeTable() {
  const { data: employees } = useGetAllEmployeesQuery();

  return (
    <div className="employee-table-container">
      <div className="employee-table-header">
        <div className="header-checkbox">
          <input type="checkbox" />
        </div>
        <div className="header-employee-name">Name</div>
        <div className="header-employee-id">Employee ID</div>
        <div className="header-assigned-leads">Assigned Leads</div>
        <div className="header-closed-leads">Closed Leads</div>
        <div className="header-status">Status</div>
      </div>
      <div className="employee-table-body">
        {employees?.map((employee, index) => (
          <div key={index} className="employee-table-row">
            <div className="checkbox">
              <input type="checkbox" />
            </div>
            <div className="avatar">
              <img src={avatar} alt="avatar" />
            </div>
            <div className="employee-name">
              {employee.firstName} {employee.lastName} <span className="employee-email">{employee.email}</span>{" "}
            </div>
            <div className="employee-id">{employee.employeeId}</div>
            <div className="assigned-leads">{employee.assignedLeads.length}</div>
            <div className="closed-leads">{employee.closedLeads}</div>
            <div className="status">
              <div className={employee.status === "active" ? "active-background" : "inactive-background"}>
                <div>{""}</div>
                {employee.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeeTable;
