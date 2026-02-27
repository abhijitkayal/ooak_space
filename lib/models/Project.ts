import mongoose, { Schema, models, model } from "mongoose";

const ProjectSchema = new Schema(
  {
    name: { type: String, required: true },
    emoji: { type: String, default: "📁" },
    shareLinks: [
      {
        token: { type: String, required: true, unique: true },
        permission: { type: String, enum: ["view", "edit"], default: "view" },
        createdAt: { type: Date, default: Date.now },
        expiresAt: { type: Date, default: null }, // null = never expires
      }
    ],
  },
  { timestamps: true }
);

export default models.Project || model("Project", ProjectSchema);
