const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    senha: {
      type: String,
      required: true,
    },
    tipo: {
      type: Number,
      required: true,
    },
    deviceId: {
      type: String,
    },
    nome: {
      type: String,
      required: true,
    },
    dataNascimento: {
      type: Date,
      required: true,
    },
    nome: {
      type: String,
      required: true,
    },
    numeroViagens: {
      type: Number,
    },
    nota: {
      type: Number,
    },
    imagemUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (!this.deviceId) {
    this.deviceId = uuidv4(); // Gera um UUID se o deviceId não estiver definido
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
