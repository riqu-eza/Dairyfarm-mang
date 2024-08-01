import mongoose from "mongoose";

const ProductionSchema = new mongoose.Schema({
  milkProductionKilos: {
    type: Number,
    required: true,
  },
  Timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Production = mongoose.model("Production", ProductionSchema);

export default Production;
