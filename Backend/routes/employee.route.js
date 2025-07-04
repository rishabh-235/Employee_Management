import express from "express";
const router = express.Router();

import { addEmployee, getAllEmployees, getEmployee, loginEmployee, logoutEmployee } from "../controllers/employee.controller.js";


router.get("/getallemployees", getAllEmployees);
router.post("/getemployee", getEmployee);
router.post("/addemployee", addEmployee);
router.post("/loginemployee", loginEmployee);
router.post("/logoutemployee", logoutEmployee);

export default router;