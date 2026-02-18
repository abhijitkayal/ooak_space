import mongoose from "mongoose";

const DatabasePropertySchema = new mongoose.Schema(
  {
    databaseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    name: { type: String, required: true },
    type: { type: String, required: true }, // text, select, date
    options: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.DatabaseProperty ||
  mongoose.model("DatabaseProperty", DatabasePropertySchema);