import express from "express";
const router = express.Router();
import {
  addLead,
  getListOfBulkUploadLeads,
  assignLeads,
  getLead,
  changeType,
  changeStatus,
} from "../controllers/lead.controller.js";

router.post("/addleads", addLead);
router.post("/getLead", getLead)
router.get("/getBulkUploadLeads", getListOfBulkUploadLeads);
router.post("/assignLeads", assignLeads);
router.post("/changeType", changeType);
router.post("/changestatus", changeStatus);

export default router;
