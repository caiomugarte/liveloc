const express = require("express");
const router = express.Router();

const Posicao = require("../models/posicao");
const Produto = require("../models/produto");
const Lote = require("../models/lote");

router.get('/api/posicaoOfProduto', async(req, res) => {
    try {
        console.log(`req.body: ${req.query}`)
        const {codigoRastreio} = req.query
        console.log(`Peguei o numero do lote ${codigoRastreio}`)
    
        if(!(codigoRastreio)){
            return res.status(403).json('Latitude e Longitude não informados');
        }
        
        const produto = await Produto.findOne({codigoRastreio});
        const numeroLote = produto.numeroLote;
        const lote = await Lote.findOne({numeroLote});
        const localizacao = await Posicao.findOne({deviceId: lote.deviceId});

        return res.status(201).json({
            message:"Localização encontrada com sucesso",
            localizacao
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Ocorreu um erro"
        })
    }
})

module.exports = router;