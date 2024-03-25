const mongoose = require("mongoose");

//Vale ressaltar que toda vez que o docker builda, esse ip pode trocar.
const url = "mongodb://192.168.80.2:27017/docker-node-mongo?directConnection=true";

const connectDb= () => {
    return mongoose.connect(url)
    .then(() => {
        console.log("Conectado ao MongoDb");
    })
    .catch(err => {
        console.error("Ocorreu um erro ao conectar no Mongo ", err);
    })
}

module.exports = connectDb;