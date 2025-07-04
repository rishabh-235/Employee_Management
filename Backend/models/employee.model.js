import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema({
  employeeId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dateOfJoining: { type: Date, default: Date.now },
  location: { type: String, required: true },
  language: { type: String, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "inactive" },
  closedLeads: { type: Number, default: 0 },
  assignedLeads: [
    {
      leadId: { type: Schema.Types.ObjectId, ref: "Lead" },
      assignedDate: { type: Date, default: Date.now },
    },
  ],
  break: [
    {
      start: { type: Date, required: true },
      end: { type: Date, required: true },
      date: { type: String, required: true },
    },
  ],
  currentBreak: {
    start: {
      time: { type: String, default: "--:--" },
      date: { type: String, default: new Date().toLocaleDateString() },
    },
    end: { type: String, default: "--:--" },
  },
  checkIn: {
    type: String,
    default: "--:--",
  },
  password: {
    type: String,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
