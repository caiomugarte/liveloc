const mongoose = require('mongoose');
const {Schema} = mongoose
const { v4: uuidv4 } = require('uuid');


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
        },
        deviceId: {
            type:String,
        },
        nome: {
            type:String, 
            required:true
        }
    },
    {
        timestamps:true,
    }
)

userSchema.pre('save', function(next) {
    if (!this.deviceId) {
        this.deviceId = uuidv4(); // Gera um UUID se o deviceId não estiver definido
    }
    next();
});

module.exports = mongoose.model('User', userSchema);