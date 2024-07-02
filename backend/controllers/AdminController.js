const Admin = require('../models/Admin');
const User = require('../models/User');
const secret = process.env.ADMIN_JWT_SECRET;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');




const generate_token = (id) => {
    return jwt.sign({ id }, secret, {
        expiresIn: '7d',
    });
};

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

const register_admin = async(req, res) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
        return res.status(400).json({ message: 'Preencha todos os campos' });
    }
    if(await Admin.findOne({ email })) {
        return res.status(400).json({ message: 'Email já cadastrado' });
    }

    const salt = await bcrypt.genSalt();
    const pass_hash = await bcrypt.hash(password, salt);

    const new_admin = await Admin.create({
        name,
        email,
        password: pass_hash, 
    });

    if(!new_admin) {
        return res.status(400).json({ message: 'Erro ao cadastrar admin' });
    }

    res.status(201).json({ message: 'Admin cadastrado com sucesso' });
};

const login_admin = async(req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json({ message: 'Preencha todos os campos' });
    }
    
    const admin = await Admin.findOne({ email });

    if(!admin) {
        return res.status(400).json({ message: 'Email não cadastrado' });
    }

    const pass_match = await bcrypt.compare(password, admin.password);
    if(!pass_match) {
        return res.status(400).json({ message: 'Senha incorreta' });
    }

    res.status(200).json({
        message: 'Login efetuado com sucesso.',
        admin: {
            id: admin._id,
            name: admin.name,
            email: admin.email,
        },
        token: generate_token(admin._id),
    })
}

module.exports = {
    register_user,
    register_admin,
    login_admin,
    verify_token,
    authenticateToken
}