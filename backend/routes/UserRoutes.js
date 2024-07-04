const express = require('express');
const router = express();

const { 
    register_user, 
    login_user, 
    verify_token, 
    create_nota, 
    authenticateToken, 
    create_mercadoria, 
    create_saida, 
    edit_passowrd, 
    edit_email_name 
} = require('../controllers/UserController');

router.get('/', (req, res) => {
    res.send("USERS API");
});
// router.post('/register', register_user);
router.post('/login', login_user);
router.post('/verify-token', verify_token);
router.post('/register/nota', authenticateToken, create_nota);
router.post('/register/mercadoria', authenticateToken, create_mercadoria);
router.post('/register/saida', authenticateToken, create_saida);
router.post('/edit/password', authenticateToken, edit_passowrd);
router.post('/edit/name-email', authenticateToken, edit_email_name);

module.exports = router;