const Mercadoria = require('../models/Mercadoria');


const get_all = async(req, res) => {
    const mercadorias = await Mercadoria.find();
    return res.status(200).json(mercadorias);
};

module.exports = {
    get_all,
}