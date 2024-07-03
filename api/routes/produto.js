const express = require("express");
const router = express.Router();

const Produto = require("../models/produto");
const Lote = require("../models/lote");

router.post("/api/produto", async (req, res) => {
  try {
    console.log(`req.body: ${req.body}`);
    const { numeroLote, nome, localEntrega, nomeComprador, imagemUrl } =
      req.body;
    console.log(`Peguei o numero de lote ${numeroLote} e o nome ${nome}`);

    if (!(numeroLote && nome)) {
      return res.status(403).json("Número de Lote não informado");
    }

    const produto = new Produto({
      numeroLote,
      nome,
      localEntrega,
      nomeComprador,
      imagemUrl,
    });
    await produto.save();

    return res.status(201).json({
      message: "Produto salvo com sucesso",
      produto,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Ocorreu um erro",
    });
  }
});

router.get("/api/produtos", async (req, res) => {
  try {
    const produtos = await Produto.find();

    return res.status(201).json({
      message: "Produto salvo com sucesso",
      produtos,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Ocorreu um erro",
    });
  }
});

router.post("/api/produto/vincular", async (req, res) => {
  try {
    const { loteId, productId } = req.body;
    const lote = await Lote.findById(loteId);
    if (!lote) {
      return res.status(404).json({ message: "Lote não encontrado" });
    }

    const produto = await Produto.findById(productId);
    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    produto.numeroLote = lote.numeroLote;
    await produto.save();

    res.status(200).json({ message: "Lote vinculado ao produto com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao vincular lote" });
  }
});

router.post("/api/produto/desvincular", async (req, res) => {
  try {
    const { loteId } = req.body;
    const lote = await Lote.findById(loteId);
    if (!lote) {
      return res.status(404).json({ message: "Lote não encontrado" });
    }

    const produto = await Produto.findOne({ numeroLote: lote.numeroLote });
    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    produto.numeroLote = null;
    await produto.save();

    res
      .status(200)
      .json({ message: "Lote desvinculado do produto com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao desvincular lote" });
  }
});

module.exports = router;
