import Lead from "../models/lead.model.js";
import Employee from "../models/employee.model.js";
import fs from "fs";
import { startOfWeek, endOfWeek } from "date-fns";
import Activity from "../models/activity.model.js";

function processCSVData(data) {
  const lines = data.split("\n").filter((line) => line.trim() !== "");
  const headers = lines[0].split(",");
  return lines.slice(1).map((line) => {
    const values = line.split(",");
    const obj = {};
    headers.forEach((header, idx) => {
      obj[header.trim()] = values[idx] ? values[idx].trim() : null;
    });
    return obj;
  });
}

const parseDateTime = (dateStr, timeStr) => {
  const [day, month, year] = dateStr.split("/");
  let [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier && modifier.toUpperCase() === "PM" && hours < 12) {
    hours += 12;
  }
  if (modifier && modifier.toUpperCase() === "AM" && hours === 12) {
    hours = 0;
  }

  const hoursStr = hours.toString().padStart(2, "0");
  const minutesStr = minutes.toString().padStart(2, "0");

  const isoString = `${year}-${month.padStart(2, "0")}-${day.padStart(
    2,
    "0"
  )}T${hoursStr}:${minutesStr}:00`;
  return new Date(isoString);
};

const assignLeadsToEmployees = async () => {
  try {
    const unassignedLeads = await Lead.find({ assignedTo: null });
    if (unassignedLeads.length === 0) {
      return { message: "No unassigned leads found", assignedCount: 0 };
    }

    const employees = await Employee.find({ role: "employee" });
    if (employees.length === 0) {
      return { message: "No employees found", assignedCount: 0 };
    }

    const employeeLeadCounts = {};
    for (const emp of employees) {
      employeeLeadCounts[emp._id.toString()] = emp.assignedLeads.length;
    }

    let assignedCount = 0;
    const assignmentLogs = [];

    for (const lead of unassignedLeads) {
      if (lead.assignedTo) continue;

      const exactMatchEmployees = employees.filter(
        (emp) =>
          emp.language === lead.language && emp.location === lead.location
      );

      if (exactMatchEmployees.length > 0) {
        const selectedEmployee = exactMatchEmployees.reduce(
          (minEmp, currentEmp) => {
            const minCount = employeeLeadCounts[minEmp._id.toString()];
            const currentCount = employeeLeadCounts[currentEmp._id.toString()];
            return currentCount < minCount ? currentEmp : minEmp;
          }
        );

        await assignLeadToEmployee(lead._id, selectedEmployee._id);
        employeeLeadCounts[selectedEmployee._id.toString()]++;
        assignedCount++;
        assignmentLogs.push(
          `Lead ${lead.name} assigned to ${selectedEmployee.firstName} ${selectedEmployee.lastName} (exact match)`
        );
      }
    }
    const remainingLeads = await Lead.find({ assignedTo: null });

    for (const lead of remainingLeads) {
      const partialMatchEmployees = employees.filter(
        (emp) =>
          emp.language === lead.language || emp.location === lead.location
      );

      if (partialMatchEmployees.length > 0) {
        const selectedEmployee = partialMatchEmployees.reduce(
          (minEmp, currentEmp) => {
            const minCount = employeeLeadCounts[minEmp._id.toString()];
            const currentCount = employeeLeadCounts[currentEmp._id.toString()];
            return currentCount < minCount ? currentEmp : minEmp;
          }
        );

        await assignLeadToEmployee(lead._id, selectedEmployee._id);
        employeeLeadCounts[selectedEmployee._id.toString()]++;
        assignedCount++;
        assignmentLogs.push(
          `Lead ${lead.name} assigned to ${selectedEmployee.firstName} ${selectedEmployee.lastName} (partial match)`
        );
      }
    }

    const stillUnassignedLeads = await Lead.find({ assignedTo: null });

    for (const lead of stillUnassignedLeads) {
      const selectedEmployee = employees.reduce((minEmp, currentEmp) => {
        const minCount = employeeLeadCounts[minEmp._id.toString()];
        const currentCount = employeeLeadCounts[currentEmp._id.toString()];
        return currentCount < minCount ? currentEmp : minEmp;
      });

      await assignLeadToEmployee(lead._id, selectedEmployee._id);
      employeeLeadCounts[selectedEmployee._id.toString()]++;
      assignedCount++;
      assignmentLogs.push(
        `Lead ${lead.name} assigned to ${selectedEmployee.firstName} ${selectedEmployee.lastName} (equal distribution)`
      );
    }

    return {
      message: `Successfully assigned ${assignedCount} leads`,
      assignedCount,
      details: assignmentLogs,
    };
  } catch (error) {
    console.error("Error in assignLeadsToEmployees:", error);
    throw error;
  }
};

const assignLeadToEmployee = async (leadId, employeeId) => {
  try {
    await Lead.findByIdAndUpdate(leadId, {
      assignedTo: employeeId,
    });

    const employee = await Employee.findByIdAndUpdate(
      employeeId,
      {
        $push: {
          assignedLeads: {
            leadId: leadId,
            assignedDate: new Date(),
          },
        },
      },
      { new: true }
    );

    await Activity.create({
      employeeId: employeeId,
      employeeName: employee.firstName,
      activityType: "lead assigned",
    });
  } catch (error) {
    console.error("Error assigning lead to employee:", error);
    throw error;
  }
};

const addLead = async (req, res) => {
  try {
    const filePath = req.file.path;

    fs.readFile(filePath, "utf-8", async (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return res
          .status(500)
          .json({ message: "Error reading file", error: err });
      }

      try {
        const leads = processCSVData(data);
        const insertedLeads = await Lead.insertMany(leads);

        await Activity.create({
          _id: "6866461206610578a24fb1e7",
          activityType: "lead added",
        });

        const assignmentResult = await assignLeadsToEmployees();

        res.status(201).json({
          message: "Leads added and assigned successfully",
          leadsAdded: insertedLeads.length,
          leadsAssigned: assignmentResult.assignedCount,
          assignmentMessage: assignmentResult.message,
          assignmentDetails: assignmentResult.details,
        });
      } catch (error) {
        res.status(500).json({
          message: "Error adding or assigning leads",
          error: error.message,
        });
      }

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        }
      });
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding lead", error: error.message });
  }
};

const getLead = async (req, res) => {
  const lead = req.body.lead;
  try {
    const resl = await Lead.findById(lead.leadId);
    if (!resl) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.status(200).json(resl);
  } catch (error) {
    res.status(500).json({ message: "Error fetching lead", error });
  }
};

const getAllLeads = async (_, res) => {
  try {
    const leads = await Lead.find().sort({
      status: {
        $case: {
          open: 0,
          closed: 1,
        },
      },
    });
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leads", error });
  }
};

const getListOfBulkUploadLeads = async (_, res) => {
  try {
    const leads = await Lead.aggregate([
      {
        $addFields: {
          recievedDate: {
            $dateToString: { format: "%Y-%m-%d", date: "$recievedAt" },
          },
        },
      },
      { $sort: { recievedDate: -1 } },
      {
        $group: {
          _id: "$recievedDate",
          lead_count: { $sum: 1 },
          assigned_leads: {
            $sum: { $cond: [{ $ne: ["$assignedTo", null] }, 1, 0] },
          },
          unassigned_leads: {
            $sum: { $cond: [{ $eq: ["$assignedTo", null] }, 1, 0] },
          },
        },
      },
    ]);

    res.status(200).json(leads);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching bulk upload leads", error });
  }
};

const getNumberAllAssignedLeads = async (_, res) => {
  try {
    const assignedLeadsCount = await Lead.countDocuments({
      assignedTo: { $ne: null },
    });
    res.status(200).json({ count: assignedLeadsCount });
  } catch (error) {
    res.status(500).json({ message: "Error fetching assigned leads", error });
  }
};

const conversionRate = async () => {
  try {
    const totalLeads = await Lead.countDocuments();
    const closedLeads = await Lead.countDocuments({ status: "closed" });
    const rate = totalLeads ? (closedLeads / totalLeads) * 100 : 0;
    return rate.toFixed(2);
  } catch (error) {
    throw new Error("Error calculating conversion rate");
  }
};

const scheduleLead = async (req, res) => {
  try {
    const { _id, scheduledDate, scheduledTime } = req.body;
    const now = new Date();
    const inputDate = parseDateTime(scheduledDate, scheduledTime);

    if (isNaN(inputDate.getTime())) {
      return res.status(400).json({ message: "Invalid date or time format" });
    }

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const scheduled = new Date(
      inputDate.getFullYear(),
      inputDate.getMonth(),
      inputDate.getDate()
    );

    if (scheduled < today) {
      return res
        .status(400)
        .json({ message: "Scheduled date must be today or in the future" });
    }

    if (scheduled.getTime() === today.getTime()) {
      const [hours, minutes] = scheduledTime.split(":").map(Number);
      if (
        hours < now.getHours() ||
        (hours === now.getHours() && minutes <= now.getMinutes())
      ) {
        return res
          .status(400)
          .json({ message: "Scheduled time must be in the future" });
      }
    }
    const lead = await Lead.findByIdAndUpdate(_id, {
      scheduleAt: {
        date: scheduledDate,
        time: scheduledTime,
      },
    });
    res.status(200).json({ message: "Lead scheduled successfully", lead });
  } catch (error) {
    res.status(500).json({ message: "Error scheduling lead", error });
  }
};

const getScheduledLeads = async (req, res) => {
  try {
    const user = req.body.user;
    const leads = await Lead.find({
      assignedTo: user,
      scheduleAt: { $ne: null },
    });
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: "Error fetching scheduled leads", error });
  }
};

const changeType = async (req, res) => {
  try {
    const leadType = req.body.type;
    const leadData = req.body.leadData;
    const lead = await Lead.findOneAndUpdate(
      { _id: leadData._id },
      { $set: { type: leadType } },
      { new: true }
    );
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.status(200).json({ message: "Lead type updated successfully", lead });
  } catch (error) {
    res.status(500).json({ message: "Error changing lead type", error });
  }
};

const changeStatus = async (req, res) => {
  try {
    const leadStatus = req.body.status;
    const leadData = req.body.leadData;
    const lead = await Lead.findOneAndUpdate(
      { _id: leadData._id },
      { $set: { status: leadStatus } },
      { new: true }
    );
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    if (leadStatus === "closed") {
      await Activity.create({
        employeeId: lead.assignedTo,
        employeeName: lead.assignedTo
          ? (
              await Employee.findById(lead.assignedTo)
            ).firstName
          : undefined,
        activityType: "lead closed",
        leadId: lead._id,
        closedAt: new Date(),
      });
    }

    res.status(200).json({ message: "Lead status updated successfully", lead });
  } catch (error) {
    res.status(500).json({ message: "Error changing lead status", error });
  }
};

const assignLeads = async (_, res) => {
  try {
    const result = await assignLeadsToEmployees();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Error assigning leads",
      error: error.message,
    });
  }
};

const closeAllLeads = async (_, res) => {
  try {
    const now = new Date();

    const leadsToClose = await Lead.find({
      scheduleAt: { $ne: null },
      status: { $ne: "closed" },
    });

    let closedCount = 0;

    for (const lead of leadsToClose) {
      const { date, time } = lead.scheduleAt;
      if (!date || !time) continue;

      const scheduledDateTime = parseDateTime(date, time);

      if (scheduledDateTime <= now) {
        await Lead.findByIdAndUpdate(lead._id, {
          status: "closed",
          closedAt: scheduledDateTime,
          scheduleAt: {
            date: null,
            time: null,
          },
        });
        closedCount++;
      }

      await Activity.create({
        employeeId: lead.assignedTo,
        employeeName: lead.assignedTo
          ? (
              await Employee.findById(lead.assignedTo)
            ).firstName
          : undefined,
        activityType: "lead closed",
        leadId: lead._id,
        closedAt: scheduledDateTime,
      });
    }

    console.log(`Closed ${closedCount} leads successfully`);
  } catch (error) {
    console.error("Error closing leads:", error);
  }
};

const getDashboardData = async (_, res) => {
  try {
    const assignedLeadsThisWeek = await Lead.find({
      recievedAt: {
        $gte: startOfWeek(new Date()),
        $lt: endOfWeek(new Date()),
      },
    });
    const unassignedLeadsCount = await Lead.countDocuments({
      assignedTo: null,
    });
    const activeSalesEmployees = await Employee.countDocuments({
      status: "active",
      role: "employee",
    });
    const conversionRateValue = await conversionRate();

    res.status(200).json({
      assignedLeadsThisWeekCount: assignedLeadsThisWeek.length,
      unassignedLeadsCount,
      activeSalesEmployees,
      conversionRate: conversionRateValue,
    });
  } catch (error) {
    console.log("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Error fetching dashboard data", error });
  }
};

const getClosedLeadsCount = async (_, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 13);

    const closedLeadsPerDay = await Lead.aggregate([
      {
        $match: {
          status: "closed",
          closedAt: { $gte: startDate, $lte: today },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$closedAt" },
          },
          closedCount: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const closedMap = {};
    closedLeadsPerDay.forEach((item) => {
      closedMap[item._id] = item.closedCount;
    });

    const response = [];
    for (let i = 0; i < 14; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const dateStr = date.toISOString().slice(0, 10);
      const dayName = date
        .toLocaleDateString("en-US", { weekday: "short" })
        .toLowerCase();
      response.push({
        day: dayName,
        date: dateStr,
        closedCount: closedMap[dateStr] || 0,
      });
    }

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching closed leads count:", error);
    throw error;
  }
};

export {
  addLead,
  getLead,
  getAllLeads,
  getNumberAllAssignedLeads,
  conversionRate,
  getListOfBulkUploadLeads,
  assignLeads,
  changeType,
  changeStatus,
  getScheduledLeads,
  scheduleLead,
  closeAllLeads,
  getDashboardData,
  getClosedLeadsCount,
};
