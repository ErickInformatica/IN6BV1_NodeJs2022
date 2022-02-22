const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductosSchema = Schema({
    nombre: String,
    proveedor: String,
    sabores: [],
    provedores: [{
        idProveedor: { type: Schema.Types.ObjectId, ref: 'Proveedores'}
    }]
})

module.exports = mongoose.model('Productos', ProductosSchema)