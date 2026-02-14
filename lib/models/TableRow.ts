import mongoose, { Schema, model, models } from "mongoose";

const DatabaseRowSchema = new Schema(
  {
    databaseId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Database",
    },

    // cells[columnId] = value
    cells: { type: Schema.Types.Mixed, default: {} },

    createdBy: { type: String, default: "system" },
    updatedBy: { type: String, default: "system" },
  },
  { timestamps: true }
);

export default models.DatabaseRow || model("DatabaseRow", DatabaseRowSchema);
