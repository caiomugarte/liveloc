const mongoose = require('mongoose');
const { Schema } = mongoose;

function generateNumeroLote(length) {
    const characters = '0123456789';
    const charactersLength = characters.length;
    let trackingCode = '';
    for (let i = 0; i < length; i++) {
        trackingCode += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return trackingCode;
}

const loteSchema = new Schema(
    {
        numeroLote: {
            type: String,
            default: generateNumeroLote(5),
            required: true,
            unique:true
        },
        deviceId: {
            type: String,
            default: null,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

loteSchema.pre('save', async function(next) {
    try {
        // Gera um novo número de lote
        let novoNumeroLote;
        do {
            novoNumeroLote = generateNumeroLote(5);
            // Verifica se o número do lote gerado já existe no banco de dados
            const loteExistente = await this.constructor.findOne({ numeroLote: novoNumeroLote });
            // Se o número do lote não existir, pode ser usado
        } while (loteExistente); // Se já existir, continua gerando um novo número de lote até encontrar um único
        this.numeroLote = novoNumeroLote;
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Lote', loteSchema);
