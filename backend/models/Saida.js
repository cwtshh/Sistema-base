const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SaidaSchema = new Schema(
    {
        dataSaida: String,
        nomeProduto: String,
        quantidade: Number,
        funcionario: String,
        setor: String,
        autorizadoPor: String,
    },
    {
        timestamps: true,
    },
    {
        collection: 'saidas'
    }
);

const Saida = mongoose.model('Saida', SaidaSchema);

module.exports = Saida;