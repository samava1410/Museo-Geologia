const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaUsuario = new Schema({

    nombres: {
        type: String,
        match: [/^[a-zA-Z]+$/, "Los nombres solo pueden tener caracteres alfabeticos"],
        required: "El nombre es obligatorio",
    },
    
    email: {
        type: String,
        trim: true,
        unique: true,
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Por favor ingrese un correo electronico valido"],
        required: "El correo electronico es obligatorio"
    },

    contrasena: {
        type: String,
        trim: true,
        required: "La contrasena es obligatoria",
        validate: [
            function (input) {
                return input.length >= 6;
            },
            "La contraseña debe contener mas de 6 caracteres."
        ]
    }

});

module.exports = mongoose.model('usuario', schemaUsuario);