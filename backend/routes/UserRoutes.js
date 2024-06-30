const express = require('express');
const router = express();

const { register_user, login_user } = require('../controllers/UserController');

router.get('/', (req, res) => {
    res.send("USERS API");
});


module.exports = router;