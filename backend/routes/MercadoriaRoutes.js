const express = require('express');
const router = express();

const { get_all } = require('../controllers/MercadoriaController');

router.get('/get', get_all);

module.exports = router;