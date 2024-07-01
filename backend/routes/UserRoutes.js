const express = require('express');
const router = express();

const { register_user, login_user, verify_token, create_nota } = require('../controllers/UserController');

router.get('/', (req, res) => {
    res.send("USERS API");
});
router.post('/register', register_user);
router.post('/login', login_user);
router.post('/verify-token', verify_token);
router.post('/register/nota', create_nota);


module.exports = router;