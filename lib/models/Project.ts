import mongoose, { Schema, models, model } from "mongoose";

const ProjectSchema = new Schema(
  {
    name: { type: String, required: true },
    emoji: { type: String, default: "📁" },
  },
  { timestamps: true }
);

export default models.Project || model("Project", ProjectSchema);
