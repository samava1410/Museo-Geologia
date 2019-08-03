const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaVisita = new Schema({
    nombre: {
        type: String,
        required: "El nombre del encargado de la visita es obligatorio",
        match: [/^[a-zA-Z]+$/, "El nombre solo pueden tener caracteres alfabeticos"]
    },

    celular: {
        type: String,
        required: "El numero de contacto es obligatorio",
        match: [/^[0123456789]{10}$/, "El numero de celular no puede ser mayor a 10 digitos y deben ser numeros"]
    },

    email: {
        type: String,
        trim: true,
        unique: true,
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Por favor ingrese un correo electronico valido"],
        required: "El correo electronico es obligatorio"
    },

    fecha: {
        type: Date,
        required: "La fecha de la visita es obligatoria"
    },

    hora: {
        type: Date,
        required: "La hora de la visita es obligatoria"
    },

    visitantes: {
        type: Number,
        required: "El numero de visitantes es obligatorio",
        match: [/^[0123456789]{10}$/, "El numero de visitantes es obligatorio y deben ser numeros"]
    },

});

module.exports = mongoose.model('mineral', schemaMineral);