const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const generate_token = (id) => {
    return jwt.sign({ id }, secret, {
        expiresIn: '7d',
    });
};


const register_user = async(req, res) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
        return res.status(400).json({ message: 'Preencha todos os campos' });
    }
    if(await User.findOne({ email })) {
        return res.status(400).json({ message: 'Email já cadastrado' });
    }

    const salt = await bcrypt.genSalt();
    const pass_hash = await bcrypt.hash(password, salt);
    const new_user = await User.create({
        name,
        email,
        password: pass_hash, 
    });
    if(!new_user) {
        return res.status(400).json({ message: 'Erro ao cadastrar usuário' });
    }

    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
};

const login_user = async(req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json({ message: 'Preencha todos os campos' });
    }
    
    const user = await User.findOne({ email });
    if(!user) {
        return res.status(400).json({ message: 'Email não cadastrado' });
    }

    const pass_match = await bcrypt.compare(password, user.password);
    if(!pass_match) {
        return res.status(400).json({ message: 'Senha incorreta' });
    }

    res.status(200).json({
        message: 'Login efetuado com sucesso.',
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
        token: generate_token(user._id),
    })
};

module.exports = {
    register_user,
    login_user,
}