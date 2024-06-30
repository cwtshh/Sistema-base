const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const NotasSchema = new Schema(
    {
        data: String,
        fornecedor: String,
        valor: Number,
        parcelas: Number,
        vencimento: String,
        centro_custo: String,
        mercadorias: Array,
    },
    {
        timestamps: true
    },
    {
        collection: 'notas',
    }
);

const Notas = mongoose.model('Notas', NotasSchema);