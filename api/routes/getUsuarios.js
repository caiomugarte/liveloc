const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.get('/api/usuarios', async(req, res) => {
    try {
    
        const usuarios = await User.find();

        return res.status(201).json({
            message:"Usuários carregados com sucesso",
            usuarios: usuarios
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Ocorreu um erro"
        })
    }
})

module.exports = router;