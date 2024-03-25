const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.post('/post', async(req, res) => {
    try {
        console.log(`req.body: ${req.body}`)
        console.log("testando de verdade agora")
        const {name, password} = req.body
        console.log(`Peguei o nome ${name} e a password ${password}`)
        if(name === 'admin' && password === 'admin') {
            return res.status(200).json('Welcome to the admin page');
        }

        console.log('não é admin')
    
        if(!(name && password)){
            return res.status(200).json('Preencha os campos');
        }
    
        const checkUser = await User.findOne({name, password});
    
        if(checkUser) {
            return res.status(409).json({
                message: 'Usuário já existe',
            })
        }
        const user = new User({name, password})
        await user.save();
    
        return res.status(201).json({
            message:"Usuário criado com sucesso",
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Ocorreu um erro"
        })
    }
})

module.exports = router;