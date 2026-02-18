import mongoose from "mongoose";

const DatabaseItemSchema = new mongoose.Schema(
  {
    databaseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    values: { type: Object, default: {} },
  },
  { timestamps: true }
);

export default mongoose.models.Database_Item ||
  mongoose.model("Database_Item", DatabaseItemSchema);