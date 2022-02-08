const Usuario = require("../models/usuario.model");
const bcrypt = require('bcrypt-nodejs');

function Registrar(req, res) {
  var parametros = req.body;
  var modeloUsuario = new Usuario();

  Usuario.find({ email: parametros.email }, (err, usuarioEncontrado) => {
    if (usuarioEncontrado.length > 0) {
      return res.status(500)
        .send({ mensaje: "Este correo ya se encuentra utilizado." });
    } else {
        if(parametros.nombre && parametros.apellido && parametros.email 
            && parametros.password) {
            modeloUsuario.nombre = parametros.nombre;
            modeloUsuario.apellido = parametros.apellido;
            modeloUsuario.email = parametros.email;
            modeloUsuario.rol = 'USUARIO';
            modeloUsuario.imagen = null;

            bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                modeloUsuario.password = passwordEncriptada;

                modeloUsuario.save((err, usuarioGuardado) => {
                    if (err) return res.status(500).send({ mensaje: 'Error en la peticion'})
                    if (!usuarioGuardado) return res.status(500)
                        .send({ mensaje: 'Error al registrar usuario'});
                    
                    return res.status(200).send({ usuario: usuarioGuardado });
                });
            })
            
        } else {
            return res.status(500)
                .send({ mensaje: "Debe ingresar los parametros obligatorios"});
        }
    }
  });
}

function Login(req, res) {
    var parametros = req.body;
    // BUSCAMOS EL USUARIO POR EMAIL
    Usuario.findOne({ email : parametros.email }, (err, usuarioEncontrado) => {
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
        if (usuarioEncontrado){
            // COMPARAMOS CONTRASENAS SIN ENCRIPTAR CON ENCRIPTADA
            bcrypt.compare(parametros.password, usuarioEncontrado.password, 
                (err, passwordCorrecta)=>{//TRUE OR FALSE
                    if(passwordCorrecta){
                        return res.status(200)
                            .send({ mensaje: 'Usuario Logeado con Exito!!'})
                    } else {
                        return res.status(500).
                            send({ mensaje: 'Las contrasenas no coinciden.'})
                    }
            })

        } else {
            return res.status(500)
                .send({ mensaje: 'El usuario, no se ha podido identificar'})
        }
    })
}

module.exports = {
    Registrar,
    Login
}