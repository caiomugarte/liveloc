const mongoose = require("mongoose");
const { Schema } = mongoose;

const simulacaoSchema = new Schema(
  {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Simulacao", simulacaoSchema);
