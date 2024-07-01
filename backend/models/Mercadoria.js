const mongoose = require('mongoose');
const { collection } = require('./Notas');
const Schema = mongoose.Schema;

const MercadoriaSchema = new Schema(
    {
        nome: String,
        grupo: String,
        quantidade: Number,
    },
    {
        timestamps: true,
    },
    {
        collection: 'mercadorias'
    }
);

const Mercadoria = mongoose.model('Mercadoria', MercadoriaSchema);

module.exports = Mercadoria;