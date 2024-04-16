const express = require("express");
const jwt = require("jsonwebtoken")
const { v4: uuidv4 } = require('uuid'); // Import UUID generator

require('dotenv').config();

const router = express.Router();

const User = require("../models/user");

router.post('/api/login', async(req, res) => {
    try {
        console.log(`req.body: ${req.body}`)
        const {username, senha} = req.body
        console.log(`Peguei o username ${username} e a senha ${senha}`)
        const user = await User.findOne({username: username, senha: senha});

        if(user) {
            const secretKey = process.env.SECRET_KEY
            const token = jwt.sign({userId: user.id, username: user.username, deviceId: user.deviceId}, secretKey, {expiresIn: '1h'});
            return res.status(200).json({message: "Logado com sucesso", token, user})
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