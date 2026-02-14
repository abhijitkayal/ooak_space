import mongoose, { Schema, models, model } from "mongoose";

const DatabaseSchema = new Schema(
  {
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    name: { type: String, required: true },
    icon: { type: String, default: "📄" },
    viewType: {
      type: String,
      enum: ["timeline", "table", "board", "gallery"],
      default: "table",
    },
  },
  { timestamps: true }
);

export default models.Database || model("Database", DatabaseSchema);
