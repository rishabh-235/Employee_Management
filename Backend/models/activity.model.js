import mongoose, {Schema} from "mongoose";

const activitySchema = new Schema({
    employeeId: {type: Schema.Types.ObjectId, ref: "Employee"},
    activityType: {type: String, enum: ["lead assigned", "lead closed", "lead added"], required: true},
},
{
    timestamps: true
})

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;