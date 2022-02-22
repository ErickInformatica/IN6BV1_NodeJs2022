const express = require('express');
const controladorEncuestas = require('../controllers/encuestas.controller');

const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/agregarEncuesta', md_autenticacion.Auth, controladorEncuestas.agregarEncuestas);
api.get('/obtenerEncuestas', md_autenticacion.Auth, controladorEncuestas.obtenerEncuestas);

module.exports = api;