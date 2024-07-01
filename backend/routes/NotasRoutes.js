const express = require('express');
const router = express();

const { get_all } = require('../controllers/NotasController');

router.get('/', get_all);

module.exports = router;