const express = require("express");
const router = express.Router();

const Lote = require("../models/lote");

router.get('/api/lotes', async(req, res) => {
    try {
    
        const lotes = await Lote.find({deviceId: null});

        return res.status(201).json({
            message:"Lotes carregados com sucesso",
            lotes: lotes
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Ocorreu um erro"
        })
    }
})

module.exports = router;