const express = require("express");
const router = express.Router();
const Simulacao = require("../models/simulacao");

// Coordenadas de exemplo entre Curitiba e Blumenau
const coordenadas = [
  { latitude: -25.4284, longitude: -49.2733 }, // Curitiba
  { latitude: -25.428, longitude: -49.3725 },
  { latitude: -25.55, longitude: -49.45 },
  { latitude: -25.66, longitude: -49.54 },
  { latitude: -25.77, longitude: -49.63 },
  { latitude: -25.88, longitude: -49.72 },
  { latitude: -25.99, longitude: -49.81 },
  { latitude: -26.1, longitude: -49.9 },
  { latitude: -26.21, longitude: -49.99 },
  { latitude: -26.32, longitude: -50.08 },
  { latitude: -26.43, longitude: -50.17 },
  { latitude: -26.54, longitude: -50.26 },
  { latitude: -26.65, longitude: -50.35 },
  { latitude: -26.76, longitude: -50.44 },
  { latitude: -26.87, longitude: -50.53 },
  { latitude: -26.98, longitude: -50.62 },
  { latitude: -27.09, longitude: -50.71 },
  { latitude: -27.18, longitude: -50.8 },
  { latitude: -27.25, longitude: -50.89 },
  { latitude: -27.3, longitude: -50.98 },
  { latitude: -27.3, longitude: -49.06 }, // Blumenau
];

// Rota para adicionar simulações de entrega
router.post("/api/simulacao", async (req, res) => {
  try {
    const simulacoes = coordenadas.map((coord) => ({
      latitude: coord.latitude,
      longitude: coord.longitude,
    }));

    await Simulacao.insertMany(simulacoes);

    return res.status(201).json({
      message: "Simulações de entrega salvas com sucesso",
      simulacoes,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Ocorreu um erro",
    });
  }
});

module.exports = router;
