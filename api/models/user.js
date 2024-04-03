const mongoose = require('mongoose');
const {Schema} = mongoose

const userSchema = new Schema(
    {
        username: {
            type: String, 
            required: true
        },
        senha: {
            type: String,
            required:true
        },
        tipo: {
            type: Number,
            required:true
        }
    },
    {
        timestamps:true,
    }
)

module.exports = mongoose.model('User', userSchema);