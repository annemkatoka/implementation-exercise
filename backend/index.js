const express = require('express');
const routes = require('./routes');
const sequelize = require('sequelize');
const cors = require('cors');
const db    = require('./config/db');


db.sync().then(() => console.log('Conected')).catch((error) => console.log(error));


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//Cors
app.use(cors());
app.use('/', routes());
app.listen(5000);
