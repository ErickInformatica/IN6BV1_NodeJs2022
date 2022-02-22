const express = require('express');
const controladorUsuario = require('../controllers/usuario.controller');

const md_autenticacion = require('../middlewares/autenticacion');


const api = express.Router();

api.post('/registrar', controladorUsuario.Registrar);
api.post('/login', controladorUsuario.Login);
api.get('/buscarNombre/:nombreUsuario', controladorUsuario.BusquedaNombre);
api.get('/buscarNombreRegex/:nombreUsuario', controladorUsuario.BusquedaNombreRegex);
api.get('/buscarNombreRegexBody', controladorUsuario.BusquedaNombreRegexBody);
api.get('/buscarNombreOApellido', controladorUsuario.BusquedaNombreOApellido);
api.get('/buscarNombreYApellido', controladorUsuario.BusquedaNombreYApellido);
api.put('/editarUsuario/:idUsuario', md_autenticacion.Auth, controladorUsuario.editarUsuario);

module.exports = api;