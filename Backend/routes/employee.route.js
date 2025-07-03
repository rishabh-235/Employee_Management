import express from "express";
const router = express.Router();

import { addEmployee, getAllEmployees, loginEmployee, logoutEmployee } from "../controllers/employee.controller.js";


router.post("/addemployee", addEmployee);
router.get("/getallemployees", getAllEmployees);
router.post("/loginemployee", loginEmployee);
router.post("/logoutemployee", logoutEmployee);

export default router;