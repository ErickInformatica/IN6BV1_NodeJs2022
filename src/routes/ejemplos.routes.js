// IMPORTACIONES
const express = require('express');
const ejemplosController = require('../controllers/ejemplos.controller');

// MIDDLEWARES
const md_autenticacion = require('../middlewares/autenticacion');

// RUTAS
const api = express.Router();
api.get('/', md_autenticacion.Auth, ejemplosController.ejemplo);
api.get('/kinal/:idKinal', ejemplosController.EjemploParametrosObligatorios);
api.get('/opcional/:idOpcional?', ejemplosController.EjemploParametrosOpcionales);

module.exports = api;