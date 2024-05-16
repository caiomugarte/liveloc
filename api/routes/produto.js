const express = require("express");
const router = express.Router();

const Produto = require("../models/produto");

router.post('/api/produto', async(req, res) => {
    try {
        console.log(`req.body: ${req.body}`)
        const {numeroLote, nome, localEntrega} = req.body
        console.log(`Peguei o numero de lote ${numeroLote} e o nome ${nome}`)
    
        if(!(numeroLote && nome)){
            return res.status(403).json('Número de Lote não informado');
        }
    
        const produto = new Produto({numeroLote, nome, localEntrega})
        await produto.save();
    
        return res.status(201).json({
            message:"Produto salvo com sucesso",
            produto
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Ocorreu um erro"
        })
    }
})

module.exports = router;