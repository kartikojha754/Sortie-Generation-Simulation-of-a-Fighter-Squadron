const mongoose = require("mongoose");

const SimulationHistorySchema = new mongoose.Schema(
  {
    simulationNumber: {
      type: Number,
      required: true,
      index: true,
    },

    source: {
      type: String,
      enum: ["sample", "custom"],
      default: "custom",
    },

    scenarioName: {
      type: String,
      default: "Unnamed Scenario",
    },

    requestPayload: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    summary: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    result: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("SimulationHistory", SimulationHistorySchema);
