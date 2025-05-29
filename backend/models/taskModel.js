const mongoose = require("mongoose");
const getLocationName = require("../helpers/getLocationName");

const TaskSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    dueDate: Date,
    category: {
      type: String,
      enum: ["Business", "Personal", "Education"],
    },
    location: {
      lat: Number,
      lng: Number,
      name: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
    },
  },
  { timestamps: true }
);

TaskSchema.pre("save", async function (next) {
  const daysLeft = (new Date(this.dueDate) - new Date()) / (1000 * 3600 * 24);
  if (daysLeft < 3) this.priority = "High";
  else if (daysLeft <= 7) this.priority = "Medium";
  else this.priority = "Low";

  if (this.location?.lat && this.location?.lng) {
    try {
      const locationName = await getLocationName(
        this.location.lat,
        this.location.lng
      );
      this.location.name = locationName;
    } catch (err) {
      console.error("Error fetching location name:", err.message);
      this.location.name = "Unknown";
    }
  }

  next();
});

const userModel = mongoose.model("Task", TaskSchema);
module.exports = userModel;
