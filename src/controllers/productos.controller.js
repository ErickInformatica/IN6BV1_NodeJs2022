const Productos = require("../models/productos.model");

// OBTENER PRODUCTOS
function ObtenerProductos(req, res) {
  Productos.find({}, (err, productosEncontrados) => {
    return res.send({ productos: productosEncontrados });
  });
}

// AGREGAR PRODUCTOS
function AgregarProductos(req, res) {
  var parametros = req.body;
  var modeloProductos = new Productos();

  if (parametros.nombre && parametros.proveedor) {
    modeloProductos.nombre = parametros.nombre;
    modeloProductos.proveedor = parametros.proveedor;
    modeloProductos.sabores = [];

    modeloProductos.save((err, productoGuardado) => {
      if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
      if (!productoGuardado)
        return res
          .status(500)
          .send({ mensaje: "Error al agregar el Producto" });

      return res.status(200).send({ productos: productoGuardado });
    });
  } else {
    return res
      .status(500)
      .send({ mensaje: "Debe enviar los parametros obligatorios." });
  }
}

// EDITAR PRODUCTOS
function EditarProductos(req, res) {
  var idProd = req.params.idProducto;
  var parametros = req.body;

  Productos.findByIdAndUpdate(
    idProd,
    parametros,
    { new: true },
    (err, productoEditado) => {
      if (err)
        return res
          .status(500)
          .send({ mensaje: "Error en la peticion de Productos" });
      if (!productoEditado)
        return res.status(403).send({ mensaje: "Error al editar el producto" });

      return res.status(200).send({ producto: productoEditado });
    }
  );
}

// ELIMINAR PRODUCTOS
function EliminarProducto(req, res) {
  var idProd = req.params.idProducto;

  Productos.findByIdAndDelete(idProd, (err, productoEliminado) => {
    if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
    if (!productoEliminado)
      return res.status(500).send({ mensaje: "Error al eliminar el Producto" });

    return res.status(200).send({ producto: productoEliminado });
  });
}

module.exports = {
  ObtenerProductos,
  AgregarProductos,
  EditarProductos,
  EliminarProducto,
};
