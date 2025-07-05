import Activity from "../models/activity.model.js";

const getAllActivitiesForAdminDashboard = async (_, res) => {
  try {
    const activities = await Activity.find().sort({ createdAt: -1 }).limit(10);
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching activities", error });
  }
};

const getAllActivitiesForEmployeeDashboard = async (req, res) => {
  try {
    const { employeeId } = req.body;
    const activities = await Activity.find({
      employeeId,
      activityType: { $in: ["lead assigned", "lead closed"] },
    })
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching activities", error });
  }
};

export {
  getAllActivitiesForAdminDashboard,
  getAllActivitiesForEmployeeDashboard,
};
