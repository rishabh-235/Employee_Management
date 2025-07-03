import express from "express";
const router = express.Router();
import { addLead, getListOfBulkUploadLeads } from "../controllers/lead.controller.js";

router.post("/addleads", addLead);
router.get("/getBulkUploadLeads", getListOfBulkUploadLeads);

export default router;
