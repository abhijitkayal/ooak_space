import mongoose, { Schema, model, models } from "mongoose";

export type ColumnType =
  | "text"
  | "number"
  | "select"
  | "multi_select"
  | "status"
  | "date"
  | "person"
  | "checkbox"
  | "url"
  | "email"
  | "phone";

const DatabaseColumnSchema = new Schema(
  {
    databaseId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Database",
    },
    name: { type: String, required: true },
    type: {
      type: String,
      enum: [
        "text",
        "number",
        "select",
        "multi_select",
        "status",
        "date",
        "person",
        "checkbox",
        "url",
        "email",
        "phone",
      ],
      default: "text",
    },
    order: { type: Number, default: 0 },

    // for select / status / multi-select
    options: [
      {
        label: String,
        color: String,
      },
    ],
  },
  { timestamps: true }
);

export default models.DatabaseColumn ||
  model("DatabaseColumn", DatabaseColumnSchema);
