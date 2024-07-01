const express = require('express');
const router = express();

const { register_admin, login_admin, register_user, verify_token } = require('../controllers/AdminController');

router.get('/', (req, res) => {
    res.send("Admin");
});

router.post('/register', register_admin);
router.post('/register/user', register_user);
router.post('/verify_token', verify_token);
router.post('/login', login_admin);



module.exports = router;
