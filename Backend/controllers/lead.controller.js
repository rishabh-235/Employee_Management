import Lead from "../models/lead.model.js";
import Employee from "../models/employee.model.js";
import fs from "fs";

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

const assignLeadsToEmployees = async () => {
  try {
    console.log("Starting lead assignment process...");

    // Get all unassigned leads
    const unassignedLeads = await Lead.find({ assignedTo: null });
    console.log(`Found ${unassignedLeads.length} unassigned leads`);

    if (unassignedLeads.length === 0) {
      return { message: "No unassigned leads found", assignedCount: 0 };
    }

    // Get all employees with their current lead counts
    const employees = await Employee.find({});
    console.log(`Found ${employees.length} employees`);

    if (employees.length === 0) {
      return { message: "No employees found", assignedCount: 0 };
    }

    // Calculate current lead counts for each employee
    const employeeLeadCounts = {};
    for (const emp of employees) {
      employeeLeadCounts[emp._id.toString()] = emp.assignedLeads.length;
    }

    let assignedCount = 0;
    const assignmentLogs = [];

    // Priority 1: Language AND Location Match
    console.log(
      "Phase 1: Assigning leads with both language and location match..."
    );
    for (const lead of unassignedLeads) {
      if (lead.assignedTo) continue; // Skip if already assigned

      const exactMatchEmployees = employees.filter(
        (emp) =>
          emp.language === lead.language && emp.location === lead.location
      );

      if (exactMatchEmployees.length > 0) {
        // Find employee with least leads among exact matches
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

    // Priority 2: Language OR Location Match
    console.log(
      "Phase 2: Assigning leads with either language or location match..."
    );
    const remainingLeads = await Lead.find({ assignedTo: null });

    for (const lead of remainingLeads) {
      const partialMatchEmployees = employees.filter(
        (emp) =>
          emp.language === lead.language || emp.location === lead.location
      );

      if (partialMatchEmployees.length > 0) {
        // Find employee with least leads among partial matches
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

    // Priority 3: Assign remaining leads equally among all employees
    console.log(
      "Phase 3: Assigning remaining leads equally among all employees..."
    );
    const stillUnassignedLeads = await Lead.find({ assignedTo: null });

    for (const lead of stillUnassignedLeads) {
      // Find employee with least leads overall
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

    console.log("Assignment complete:", assignmentLogs);
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
    // Update the lead with assigned employee
    await Lead.findByIdAndUpdate(leadId, {
      assignedTo: employeeId,
    });

    // Add lead to employee's assignedLeads array
    await Employee.findByIdAndUpdate(employeeId, {
      $push: {
        assignedLeads: {
          leadId: leadId,
          assignedDate: new Date(),
        },
      },
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
        // Process the CSV data and create leads
        const leads = processCSVData(data);
        console.log(`Processing ${leads.length} leads from CSV`);

        // Insert leads into database
        const insertedLeads = await Lead.insertMany(leads);
        console.log(`${insertedLeads.length} leads inserted successfully`);

        // Automatically assign leads to employees
        const assignmentResult = await assignLeadsToEmployees();
        console.log("Assignment result:", assignmentResult);

        res.status(201).json({
          message: "Leads added and assigned successfully",
          leadsAdded: insertedLeads.length,
          leadsAssigned: assignmentResult.assignedCount,
          assignmentMessage: assignmentResult.message,
          assignmentDetails: assignmentResult.details,
        });
      } catch (error) {
        console.error("Error adding or assigning leads:", error);
        res.status(500).json({
          message: "Error adding or assigning leads",
          error: error.message,
        });
      }

      // Clean up uploaded file
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

const getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
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

const conversionRate = async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const closedLeads = await Lead.countDocuments({ status: "closed" });
    const rate = totalLeads ? (closedLeads / totalLeads) * 100 : 0;
    res.status(200).json({ conversionRate: rate.toFixed(2) });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error calculating conversion rate", error });
  }
};

const deleteLead = async (req, res) => {
  try {
    const { _id } = req.body;
    await Lead.findByIdAndDelete(_id);
    res.status(200).json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting lead", error });
  }
};

const scheduleLead = async (req, res) => {};

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
    res.status(200).json({ message: "Lead type updated successfully", lead });
  } catch (error) {
    res.status(500).json({ message: "Error changing lead type", error });
  }
}

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

export {
  addLead,
  getLead,
  getAllLeads,
  deleteLead,
  getNumberAllAssignedLeads,
  conversionRate,
  getListOfBulkUploadLeads,
  assignLeads,
  changeType,
  changeStatus
};
