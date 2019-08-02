const express = require('express');
const router = express.Router();

var mailController = require('../mailController');

const schemaMineral = require('../models/mineral');
const schemaUsuario = require('../models/usuario');

router.get('/', (req, res) => {
    res.render('index', { "mensaje": "" });
});

router.get('/login', (req, res) => {
    res.render('login', { "mensaje": "" });
});

router.post('/login', async (req, res) => {
    const usuarios = await schemaUsuario.find();
    var flag = false;

    console.log(req.body);

    for (var i = 0; i < usuarios.length; i++) {

        if (usuarios[i].email == req.body.email && usuarios[i].contrasena == req.body.contrasena) {
            flag = true;
        }
    }

    if (flag) {
        res.redirect('minerales');
    }
    else {
        res.render('login', { "mensaje": "Contrasena o usuario invalido" });
    }

});

router.get('/minerales', async (req, res) => {
    const minerales = await schemaMineral.find();
    res.render('minerales', { minerales });
});

router.post('/minerales', (req, res) => {
    const minerales = new schemaMineral(req.body);
    minerales.save();
    res.redirect('minerales');
});

router.get('/delete/:id', async (req, res) => {
    const id = req.params.id;
    await schemaMineral.deleteOne({ _id: id });
    res.redirect('/minerales');
});

router.post('/registrar', (req, res) => {
    const usuario = new schemaUsuario(req.body);
    usuario.save();
    res.redirect('minerales');
});

router.post('/contacto', (req, res) => {
    mailController.sendEmail(req, res);
});

module.exports = router;