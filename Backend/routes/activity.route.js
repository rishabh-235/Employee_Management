import express from "express";
import { getAllActivitiesForAdminDashboard, getAllActivitiesForEmployeeDashboard } from "../controllers/activity.controller.js";

const router = express.Router();

router.get("/getactivityadmin", getAllActivitiesForAdminDashboard);
router.post("/getactivityemployee", getAllActivitiesForEmployeeDashboard);

export default router;