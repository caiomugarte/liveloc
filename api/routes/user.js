const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.post('/post', async(req, res) => {
    try {
        console.log(`req.body: ${req.body}`)
        console.log("testando de verdade agora")
        const {name: username, password: senha, tipo} = req.body
        console.log(`Peguei o nome ${username} e a password ${senha} e o tipo ${tipo}`)

        if(!(username && senha && typeof tipo === "number")){
            return res.status(200).json('Preencha os campos');
        }
    
        const checkUser = await User.findOne({username, senha});
    
        if(checkUser) {
            return res.status(409).json({
                message: 'Usuário já existe',
            })
        }
        const usuario = new User({username, senha, tipo})
        await usuario.save();
    
        return res.status(201).json({
            message:"Usuário criado com sucesso",
            usuario
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Ocorreu um erro"
        })
    }
})

module.exports = router;