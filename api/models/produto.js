const mongoose = require('mongoose');
const {Schema} = mongoose

function generateTrackingCode(length) {
    const characters = '0123456789';
    const charactersLength = characters.length;
    let trackingCode = '';
    for (let i = 0; i < length; i++) {
        trackingCode += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return trackingCode;
}

const produtoSchema = new Schema(
    {
        codigoRastreio: {
            type: Number,
            default: generateTrackingCode(10),
            required: true
        },
        nome:{
            type: String,
            required: true
        },
        numeroLote: {
            type: String,
            ref: 'Lote', 
            required: true
        }
    },
    {
        timestamps:true,
    }
)

// Antes de salvar um documento de Produto
produtoSchema.pre('save', async function(next) {
    try {
        const Lote = mongoose.model('Lote');

        // Busca o documento do Lote utilizando o loteId
        const lote = await Lote.findOne({numeroLote:this.numeroLote});

        // Se o documento do Lote for encontrado
        if (lote) {
            this.numeroLote = lote.numeroLote;
        } else {
            throw new Error('Lote não encontrado');
        }

        next();
    } catch (error) {
        next(error);
    }
});


module.exports = mongoose.model('Produto', produtoSchema);