const Notas = require('../models/Notas');

const get_all = async(req, res) => {
    const notas = await Notas.find();
    if(!notas) {
        return res.status(400).json({ message: 'Erro ao buscar notas' });
    }
    return res.status(200).json(notas);
}

module.exports = {
    get_all,
}