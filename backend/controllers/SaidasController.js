const Saida = require('../models/Saida');

const get_all = async(req, res) => {
    const saidas = await Saida.find();
    if(!saidas) {
        return res.status(400).json({ message: 'Nenhuma saída encontrada' });
    }
    res.status(200).json(saidas);
};

module.exports = {
    get_all,
};