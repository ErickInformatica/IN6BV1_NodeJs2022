// IMPORTACIONES
const express = require('express');
const productosControlador = require('../controllers/productos.controller');

// RUTAS
const api = express.Router();

api.get('/productos', productosControlador.ObtenerProductos);
api.post('/agregarProductos', productosControlador.AgregarProductos);
api.put('/editarProducto/:idProducto', productosControlador.EditarProductos);
api.delete('/eliminarProducto/:idProducto', productosControlador.EliminarProductos);

// PROVEEDOR
api.post('/agregarProveedor', productosControlador.agregarProveedor);
api.put('/agregarProveedorAProducto/:idProducto/:idProveedor', productosControlador.agregarProvedorProducto)
api.get('/buscarProductoXProveedor/:idProveedor', productosControlador.buscarProductoXProveedor)

module.exports = api;