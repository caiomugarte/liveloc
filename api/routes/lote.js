const express = require("express");
const router = express.Router();

const Lote = require("../models/lote");

router.post("/api/lote", async (req, res) => {
  try {
    const lote = new Lote();
    await lote.save();

    return res.status(201).json({
      message: "Lote salvo com sucesso",
      lote,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Ocorreu um erro",
    });
  }
});

router.post("/api/lote/vincular", async (req, res) => {
  try {
    const { loteId, deviceId } = req.body;
    const lote = await Lote.findById(loteId);
    if (!lote) {
      return res.status(404).json({ message: "Not Found" });
    }

    lote.deviceId = deviceId;

    await lote.save();

    res.status(200).json({ message: "OK" });
  } catch (error) {
    console.error(error);
  }
});

router.post("/api/lote/desvincular", async (req, res) => {
  try {
    const { loteId } = req.body;
    const lote = await Lote.findById(loteId);
    if (!lote) {
      return req.status(404).json({ message: "Not Found" });
    }

    lote.deviceId = null;

    await lote.save();

    res.status(200).json({ message: "Desvinculado com sucesso" });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
