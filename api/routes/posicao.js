const express = require("express");
const router = express.Router();

const Posicao = require("../models/posicao");

router.post('/api/posicao', async(req, res) => {
    try {
        console.log(`req.body: ${req.body}`)
        const {latitude, longitude} = req.body
        console.log(`Peguei a latitude ${latitude} e a longitude ${longitude}`)
    
        if(!(latitude && longitude)){
            return res.status(403).json('Latitude e Longitude não informados');
        }
    
        const posicao = new Posicao({latitude, longitude})
        await posicao.save();
    
        return res.status(201).json({
            message:"Posição salva com sucesso",
            posicao
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Ocorreu um erro"
        })
    }
})

module.exports = router;