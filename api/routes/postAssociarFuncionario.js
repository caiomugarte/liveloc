const express = require("express");
const router = express.Router();

const Lote = require("../models/lote");
const User = require("../models/user")
router.post('/api/associarFuncionario', async(req, res) => {
    try {
        console.log(`req.body: ${req.body}`)
        console.log("testando de verdade agora")
        const {funcionarioId, loteId} = req.body
        console.log(`Peguei o funcionarioId ${funcionarioId} e o loteId ${loteId}`)

        if(!(funcionarioId && loteId)){
            return res.status(200).json('Preencha os campos');
        }
    
        const loteFromDb = await Lote.findById(loteId);
        const funcionario = await User.findById(funcionarioId)

        loteFromDb.deviceId = funcionario.deviceId;

        await loteFromDb.save();
    
        return res.status(201).json({
            message:"Funcionário associado com sucesso",
            loteFromDb
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Ocorreu um erro"
        })
    }
})

module.exports = router;