const express = require('express');
const controladorUsuario =  require('../controllers/usuario.controller');

const api = express.Router();

api.post('/registrar', controladorUsuario.Registrar);
api.post('/login', controladorUsuario.Login);

module.exports = api;