import express from "express";
const router = express.Router();

import { addEmployee, getAllEmployees, getEmployee, loginEmployee, logoutEmployee, updateEmployee } from "../controllers/employee.controller.js";


router.get("/getallemployees", getAllEmployees);
router.post("/getemployee", getEmployee);
router.post("/addemployee", addEmployee);
router.post("/updateemployee", updateEmployee);
router.post("/loginemployee", loginEmployee);
router.post("/logoutemployee", logoutEmployee);

export default router;