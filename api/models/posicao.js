const mongoose = require('mongoose');
const {Schema} = mongoose

const posicaoSchema = new Schema(
    {
        latitude: {
            type: Number,
            required: true
        }, 
        longitude: {
            type: Number, 
            required: true
        },
        deviceId: {
            type: String,
            default: null
        }
    },
    {
        timestamps:true,
    }
)

module.exports = mongoose.model('Posicao', posicaoSchema);