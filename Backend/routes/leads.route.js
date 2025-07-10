import express from "express";
const router = express.Router();
import {
  addLead,
  getListOfBulkUploadLeads,
  assignLeads,
  getLead,
  changeType,
  changeStatus,
  getScheduledLeads,
  scheduleLead,
  getDashboardData,
  getClosedLeadsCount,
} from "../controllers/lead.controller.js";

router.post("/addleads", addLead);
router.post("/getLead", getLead)
router.get("/getBulkUploadLeads", getListOfBulkUploadLeads);
router.post("/assignLeads", assignLeads);
router.post("/changeType", changeType);
router.post("/changestatus", changeStatus);
router.post("/getScheduledLeads", getScheduledLeads);
router.post("/scheduleLeads", scheduleLead);
router.get("/getdashboarddata", getDashboardData);
router.get("/getclosedleads", getClosedLeadsCount);

export default router;
