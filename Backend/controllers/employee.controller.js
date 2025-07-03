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
      password: email
    });
    await newEmployee.save();
    res
      .status(201)
      .json({ message: "Employee added successfully", employee: newEmployee });
  } catch (error) {
    res.status(500).json({ message: "Error adding employee", error });
  }
};

const getAllEmployees = async (_, res) => {
  try {
    const employees = await Employee.find({}, { password: 0 });
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
    const activeEmployeesCount = await Employee.countDocuments({ status: "active" });
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
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // employee.currentBreak.end = currentTime;
    // const pastbreak = {
    //   start : employee.currentBreak.start,
    //   end : employee.currentBreak.end
    // }
    // employee.break.push(pastbreak);
    // employee.checkIn = currentTime;
    // await employee.save();

    res.status(200).json({ message: "Login successful", employee });
  } catch (error) {
    res.status(500).json({ message: "Error logging in employee", error });
  }
}

const logoutEmployee = async (req, res)=>{
  try {
    const empId = req.body.empoyeeId;
    const employee = await Employee.find({employeeId: empId});

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    employee.currentBreak.start = currentTime;
    employee.currentBreak.end = "--:--";

    await employee.save();

    res.status(400).json({message: "Logged out successfully"});

  } catch (error) {
    res.status(500).json({message: "Error logging out employee", error})
  }
}

const updateEmployee = async (req, res) => {
  try {
    const { _id, ...updateData } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(_id, updateData, {
      new: true,
    });
    res
      .status(200)
      .json({
        message: "Employee updated successfully",
        employee: updatedEmployee,
      });
  } catch (error) {
    res.status(500).json({ message: "Error updating employee", error });
  }
};

export { addEmployee, getAllEmployees, deleteEmployee, updateEmployee, getNumberActiveEmployees, loginEmployee, logoutEmployee};
