import Lead from "../models/lead.model.js";
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

const addLead = async (req, res) => {
  try {
    const filePath = req.file.path;

    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return res
          .status(500)
          .json({ message: "Error reading file", error: err });
      }

      // Process the CSV data and create leads
      const leads = processCSVData(data);
      Lead.insertMany(leads)
        .then(() => {
          res.status(201).json({ message: "Leads added successfully" });
        })
        .catch((error) => {
          console.error("Error adding leads:", error);
          res.status(500).json({ message: "Error adding leads", error });
        });

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        }
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding lead", error });
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

export {
  addLead,
  getAllLeads,
  deleteLead,
  getNumberAllAssignedLeads,
  conversionRate,
  getListOfBulkUploadLeads,
};
