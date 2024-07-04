const express = require('express');
const router = express();

const { register_admin, login_admin, register_user, verify_token, authenticateToken } = require('../controllers/AdminController');

router.get('/', (req, res) => {
    res.send("Admin");
});

router.post('/register', authenticateToken, register_admin);
router.post('/register/user', authenticateToken, register_user);
router.post('/verify_token', verify_token);
router.post('/login', login_admin);
router.post('/register/temp', register_admin); // rota temporaria para cadastro de admin



module.exports = router;
