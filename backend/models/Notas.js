const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const NotasSchema = new Schema(
    {
        dataEntrada: String,
        fornecedor: String,
        valor: Number,
        parcelas: Number,
        dataVencimento: String,
        centroCusto: String,
    },
    {
        timestamps: true,
    }
);

const Notas = mongoose.model('Notas', NotasSchema);

module.exports = Notas;