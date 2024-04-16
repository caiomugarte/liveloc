const express = require("express");
const router = express.Router();

const Lote = require("../models/lote");

router.post('/api/lote', async(req, res) => {
    try {
    
        const lote = new Lote()
        await lote.save();
    
        return res.status(201).json({
            message:"Lote salvo com sucesso",
            lote
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Ocorreu um erro"
        })
    }
})

module.exports = router;