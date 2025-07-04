import mongoose, { Schema } from "mongoose";

const leadSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  phone: { type: String, default: null },
  recievedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["Open", "Closed"], default: "Open" },
  language: { type: String, required: true },
  location: { type: String, required: true },
  assignedTo: { type: Schema.Types.ObjectId, ref: "Employee", default: null },
  type: {
    type: String,
    enum: ["Hot", "Warm", "Cold"],
    default: "Warm",
  },
  scheduleAt: {
    date: { type: String, default: null },
    time: { type: String, default: null }
  },
});

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;
