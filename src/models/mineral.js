const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaMineral = new Schema({
    nombre: {
        type: String,
        required: "El nombre del mineral es obligatorio",
        match: [/^[a-zA-Z]+$/, "El nombre solo pueden tener caracteres alfabeticos"]
    },

    cantidad: {
        type: Number,
        required: "La cantidad de ejemplares es obligatoria",
        match: [/^[0123456789]+$/, "La cantidad debe ser numero"]
    },

    descripcion: String

});

module.exports = mongoose.model('mineral', schemaMineral);