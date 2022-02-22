
function ejemplo (req, res) {
    var parametro = req.body;
    if(req.user.rol = "ROL_MAESTRO" ){
        if(parametro.nombre){
            res.send('El email de la persona con este token es: ' + parametro.nombre);
        }else{
            return res.send({mensaje: 'Debes enviar los paraametros obligatorios.'})
        }
       
    } else {
        return res.send({ mensaje: 'Solo puede entrar el Maestro.' })
    }
    
}

function EjemploParametrosObligatorios (req, res) {
    var id = req.params.idKinal;
    res.send('Esta es una ruta para Kinalito y este es el valor del parametro en ruta:' + id);
}

function EjemploParametrosOpcionales (req, res) {
    var idOp = req.params.idOpcional;
    // idOp !== undefined
    if(idOp){
        res.send('Este es el valor del parametro en ruta OPCIONAL:' + idOp);
    } else {
        res.send('No hay ningun valor en la ruta.')
    }
}

module.exports = {
    ejemplo,
    EjemploParametrosOpcionales,
    EjemploParametrosObligatorios
}
