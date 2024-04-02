const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.post('/api/login', async(req, res) => {
    try {
        console.log(`req.body: ${req.body}`)
        const {name, password} = req.body
        console.log(`Peguei o nome ${name} e a password ${password}`)
        const user = await User.findOne({name, password});

        if(user) {
            return res.status(200).json({message: "Logado com sucesso", user})
        }else{
            return res.status(404).json({message: "User not found"});
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Ocorreu um erro"
        })
    }
})

module.exports = router;