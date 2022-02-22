const Encuesta = require('../models/encuestas.model');

function agregarEncuestas(req, res) {
    var parametros = req.body;
    var modeloEncuesta = new Encuesta();

    if( parametros.pregunta ){
        modeloEncuesta.pregunta = parametros.pregunta;
        modeloEncuesta.idCreadorEncuesta = req.user.sub; 

        modeloEncuesta.save((err, encuestaGuardada) => {
            if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
            if(!encuestaGuardada) return res.status(500).send({ mensaje: 'Error al agregar la Encuesta'})

            return res.status(200).send({ encuesta: encuestaGuardada });
        })

    } else {
        return res.status(500).send({ mensaje: 'Debe ingresar los parametros obligatorios' });
    }
}


function obtenerEncuestas(req, res) {
    Encuesta.find({}, (err, encuestasEncontradas)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la Peticion'});
        if(!encuestasEncontradas) return res.status(500).send({ mensaje: 'Error al obtener las encuestas'});

        return res.status(200).send({ encuestas: encuestasEncontradas })
    }).populate('idCreadorEncuesta', 'nombre email')
}


module.exports = {
    agregarEncuestas,
    obtenerEncuestas
}