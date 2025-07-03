import Activity from "../models/activity.model.js";

const addActivity = async (employeeId, activityType) => {
    try {
        const newActivity = new Activity({
            employeeId,
            activityType,
        });
        await newActivity.save();
        return { status: 201, message: "Activity added successfully", activity: newActivity };
    } catch (error) {
        return { status: 500, message: "Error adding activity", error };
    }
}

const getAllActivities = async (req, res) => {
    try {
        const activities = await Activity.find();
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ message: "Error fetching activities", error });
    }
}

export { addActivity, getAllActivities };