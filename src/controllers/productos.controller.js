const Productos = require('../models/productos.model');
const Proveedor = require('../models/proveedor.model');


// OBTENER PRODUCTOS
function ObtenerProductos (req, res) {
    Productos.find({}, (err, productosEncontrados) => {

        return res.send({ productos: productosEncontrados })
    }).populate('provedores.idProveedor')
}

// AGREGAR PRODUCTOS
function AgregarProductos (req, res) {
    var parametros = req.body;
    var modeloProductos = new Productos();
    
    if( parametros.nombre && parametros.proveedor ){
        modeloProductos.nombre = parametros.nombre;
        modeloProductos.proveedor = parametros.proveedor;
        modeloProductos.sabores = [];

        modeloProductos.save((err, productoGuardado)=>{

            return res.send({ productos: productoGuardado});
        });
    } else {
        return res.send({ mensaje: "Debe enviar los parametros obligatorios."})
    }


}

function EditarProductos(req, res) {
    var idProd = req.params.idProducto;
    var parametros = req.body;

    Productos.findByIdAndUpdate(idProd, parametros, { new : true } ,(err, productoEditado)=>{
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!productoEditado) return res.status(404)
            .send({ mensaje: 'Error al Editar el Producto' });

        return res.status(200).send({ productos: productoEditado});
    })
}

function EliminarProductos(req, res) {
    var idProd = req.params.idProducto;

    Productos.findByIdAndDelete(idProd, (err, productoEliminado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!productoEliminado) return res.status(500)
            .send({ mensaje: 'Error al eliminar el producto' })

        return res.status(200).send({ producto: productoEliminado });
    })
}

function agregarProveedor(req, res) {
    const parametros = req.body;
    const modeloProveedor = new Proveedor();

    if(parametros.nombreProveedor && parametros.direccion){

        modeloProveedor.nombreProveedor = parametros.nombreProveedor;
        modeloProveedor.direccion = parametros.direccion;

        modeloProveedor.save((err, proveedorGuardado) => {
            if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
            if(!proveedorGuardado) return res.status(500).send({ mensaje: 'Error al guardar el proveedor'});

            return res.status(200).send({ proveedor: proveedorGuardado})
        })

    } else {
        return res.status(404).send({ mensaje: 'Debe enviar los parametros Obligatorios'});
    }


}

function agregarProvedorProducto(req, res) {
    var productoId = req.params.idProducto;
    var proveedorId = req.params.idProveedor;

    Productos.findByIdAndUpdate(productoId, { $push: {  provedores : { idProveedor: proveedorId } } }, {new : true}, 
        (err, proveedorAgregado) => {
            if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
            if(!proveedorAgregado) return res.status(500).send({ mensaje: 'Error al agregar el proveedor al producto'});

            return res.status(200).send({ product: proveedorAgregado });
        })
}

function buscarProductoXProveedor(req, res) {
    const proveedorId = req.params.idProveedor;

    Productos.find({ provedores : { $elemMatch: { _id: proveedorId } } }, (err, productosEncontrados)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
        if(!productosEncontrados) return res.status(500).send({ mensaje: 'Error al obtener los productos por proveedor'});

        return res.status(200).send({ productos: productosEncontrados })
    })
    
}

module.exports = {
    ObtenerProductos,
    AgregarProductos,
    EditarProductos,
    EliminarProductos,
    agregarProveedor,
    agregarProvedorProducto,
    buscarProductoXProveedor
}