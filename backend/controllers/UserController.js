const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const Notas = require('../models/Notas');
const Mercadoria = require('../models/Mercadoria');
const Saida = require('../models/Saida');

const generate_token = (id) => {
    return jwt.sign({ id }, secret, {
        expiresIn: '7d',
    });
};

const verify_token = async(req, res) => {
    const { token } = req.body;
    const verify = jwt.verify(token, secret, (err, decoded) => {
        if(err) {
            return false;
        }
        return true;
    })
    if(verify) {
        return res.status(200).json({ message: 'Token válido' });
    }
    return res.status(200).json({ message: 'Token inválido' });
}

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) return res.status(401).json({ message: 'Token não fornecido' });

    jwt.verify(token, secret, (err, user) => {
        if(err) return res.status(403).json({ message: 'Token inválido' });
        req.user = user;
        next();
    })
}


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

const create_nota = async(req, res) => {
    const { dataEntrada, fornecedor, valor, parcelas, dataVencimento, centroCusto } = req.body;
    if(!dataEntrada || !fornecedor || !valor || !parcelas || !dataVencimento || !centroCusto) {
        return res.status(400).json({ message: 'Preencha todos os campos' });
    }

    const new_nota = await Notas.create({
        dataEntrada,
        fornecedor,
        valor,
        parcelas,
        dataVencimento,
        centroCusto,
    });

    if(!new_nota) {
        return res.status(400).json({ message: 'Erro ao cadastrar nota' });
    }

    res.status(201).json({ message: 'Nota cadastrada com sucesso' });
};

const create_mercadoria = async(req, res) => {
    const { nome, grupo, quantidade } = req.body;
    if(!nome || !grupo || !quantidade) {
        return res.status(400).json({ message: 'Preencha todos os campos' });
    }

    const new_mercadoria = await Mercadoria.create({
        nome,
        grupo,
        quantidade,
    });

    if(!new_mercadoria) {
        return res.status(400).json({ message: 'Erro ao cadastrar mercadoria' });
    }

    res.status(201).json({ message: 'Mercadoria cadastrada com sucesso' });
};

const create_saida = async(req, res) => {
    const { dataSaida, nomeProduto, quantidade, funcionario, setor, autorizadoPor } = req.body;
    if(!dataSaida || !nomeProduto || !quantidade || !funcionario || !setor || !autorizadoPor) {
        return res.status(400).json({ message: 'Preencha todos os campos' });
    }

    const mercadoria = await Mercadoria.findOne({ nome: nomeProduto });
    if(!mercadoria) {
        return res.status(400).json({ message: 'Produto não encontrado' });
    }
    if(mercadoria.quantidade < quantidade) {
        return res.status(400).json({ message: 'Quantidade insuficiente' });
    }

    const new_saida = await Saida.create({
        dataSaida,
        nomeProduto,
        quantidade,
        funcionario,
        setor,
        autorizadoPor,
    });

    if(!new_saida) {
        return res.status(400).json({ message: 'Erro ao cadastrar saída' });
    }

    mercadoria.quantidade -= quantidade;

    await mercadoria.save();

    res.status(201).json({ message: 'Saída cadastrada com sucesso' });
};

module.exports = {
    register_user,
    login_user,
    verify_token,
    create_nota,
    authenticateToken,
    create_mercadoria,
    create_saida
}