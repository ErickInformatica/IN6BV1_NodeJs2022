const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EncuestaSchema = Schema({
    pregunta: String,
    comentarios: [{
        textoComentario: String,
        idUsuarioComentario: { type: Schema.Types.ObjectId, ref: 'Usuarios' }
    }],
    idCreadorEncuesta: { type: Schema.Types.ObjectId, ref: 'Usuarios'}
})

module.exports = mongoose.model('Encuestas', EncuestaSchema);