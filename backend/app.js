require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const API_PORT = process.env.API_PORT || 3000;
const connectDB = require('./config/db');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// conectar ao banco de dados
connectDB();

const router = require('./routes/Router');
app.use(router);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


