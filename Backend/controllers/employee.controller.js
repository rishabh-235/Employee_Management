import Employee from "../models/employee.model.js";

const addEmployee = async (req, res) => {
  try {
    // for debugging purposes
    // console.log("Request body:", req.body);
    // res.status(200).json({ message: "Request received" });

    const { firstName, lastName, email, location, language } = req.body;
    const employeeId = `EMP-${Date.now()}`;
    const newEmployee = new Employee({
      employeeId,
      firstName,
      lastName,
      email,
      location,
      language,
      password: email,
    });
    await newEmployee.save();
    res
      .status(201)
      .json({ message: "Employee added successfully", employee: newEmployee });
  } catch (error) {
    res.status(500).json({ message: "Error adding employee", error });
  }
};

const getEmployee = async (req, res) => {
  try {
    const { employeeId } = req.body;
    const employee = await Employee.findOne({ employeeId }); // Use findOne instead of find

    if (!employee) {
      return res
        .status(404)
        .json({ message: "No employee found with this empId" });
    }

    res
      .status(200)
      .json({ message: "Successfully found the employee", employee });
  } catch (error) {
    res.status(500).json({ message: "Error fetching employee", error });
  }
};

const getAllEmployees = async (_, res) => {
  try {
    const employees = await Employee.find({ role: { $ne: "admin" } }, { password: 0 });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees", error });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { _id } = req.body;
    await Employee.findByIdAndDelete(_id);
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee", error });
  }
};

const getNumberActiveEmployees = async (_, res) => {
  try {
    const activeEmployeesCount = await Employee.countDocuments({
      status: "active",
      role: "employee",
    });
    res.status(200).json({ count: activeEmployeesCount });
  } catch (error) {
    res.status(500).json({ message: "Error fetching active employees", error });
  }
};

const loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ email, password });
    if (!employee) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (employee.currentBreak.start.time === "--:--") {
      employee.checkIn = currentTime;
      employee.status = "active";
      await employee.save();
      return res
        .status(200)
        .json({ message: "Login successful (first time)", employee });
    }

    // Calculate break duration and save to breaks array
    const currentDate = new Date();
    const breakStartTime = employee.currentBreak.start.time;
    const breakStartDate = new Date(employee.currentBreak.start.date);

    // Create proper Date objects for start and end times
    const breakStart = new Date(breakStartDate);
    const [startHour, startMinute] = breakStartTime.split(":");
    breakStart.setHours(parseInt(startHour), parseInt(startMinute), 0, 0);

    const breakEnd = new Date();
    const [endHour, endMinute] = currentTime.split(":");
    breakEnd.setHours(parseInt(endHour), parseInt(endMinute), 0, 0);

    // Handle breaks that span across different dates
    if (breakStartDate.toDateString() !== currentDate.toDateString()) {
      // First break: from start time to end of that day
      const firstBreakEnd = new Date(breakStartDate);
      firstBreakEnd.setHours(23, 59, 59, 999);

      const firstBreak = {
        start: breakStart,
        end: firstBreakEnd,
        date: breakStartDate.toISOString().split("T")[0],
      };
      employee.break.push(firstBreak);

      // Second break: from start of current day to current time
      const secondBreakStart = new Date(currentDate);
      secondBreakStart.setHours(0, 1, 0, 0);

      const secondBreak = {
        start: secondBreakStart,
        end: breakEnd,
        date: currentDate.toISOString().split("T")[0],
      };
      employee.break.push(secondBreak);
    } else {
      // Single break within the same day
      const pastBreak = {
        start: breakStart,
        end: breakEnd,
        date: breakStartDate.toISOString().split("T")[0],
      };
      employee.break.push(pastBreak);
    }

    // Reset current break and set check-in time
    employee.currentBreak.start.time = "--:--";
    employee.currentBreak.start.date = currentDate.toISOString().split("T")[0];
    employee.currentBreak.end = "--:--";
    employee.checkIn = currentTime;
    employee.status = "active";

    await employee.save();

    res.status(200).json({ message: "Login successful", employee });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ message: "Error logging in employee", error: error.message });
  }
};

const logoutEmployee = async (req, res) => {
  try {
    const { employeeId } = req.body; // Fixed typo: empoyeeId -> employeeId
    const employee = await Employee.findOne({ employeeId }); // Use findOne instead of find

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const currentDate = new Date();

    // Set current break start time and date
    employee.currentBreak.start.time = currentTime;
    employee.currentBreak.start.date = currentDate.toISOString().split("T")[0];
    employee.currentBreak.end = "--:--";
    employee.status = "inactive";

    await employee.save();

    res.status(200).json({ message: "Logged out successfully", employee }); // Changed from 400 to 200
  } catch (error) {
    console.error("Logout error:", error);
    res
      .status(500)
      .json({ message: "Error logging out employee", error: error.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { _id, ...updateData } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(_id, updateData, {
      new: true,
    });
    res.status(200).json({
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating employee", error });
  }
};

export {
  addEmployee,
  getEmployee,
  getAllEmployees,
  deleteEmployee,
  updateEmployee,
  getNumberActiveEmployees,
  loginEmployee,
  logoutEmployee,
};
