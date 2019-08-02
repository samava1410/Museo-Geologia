const express = require('express');
const router = express.Router();

var mailController = require('../mailController');

const schemaMineral = require('../models/mineral');
const schemaUsuario = require('../models/usuario');

router.get('/', (req, res) => {
    res.render('index', { "mensaje": "" });
});

router.get('/login', async (req, res) => {
    if (req.session.mail) {
        res.redirect('minerales');
    }
    else {
        res.render('login', { "mensaje": "" });
    }
});

router.post('/login', async (req, res) => {
    const usuarios = await schemaUsuario.find();
    var flag = false;

    for (var i = 0; i < usuarios.length; i++) {

        if (usuarios[i].email == req.body.email && usuarios[i].contrasena == req.body.contrasena) {
            flag = true;
        }
    }

    if (flag) {
        req.session.mail = req.body.email;
        res.redirect('minerales');
    }
    else {
        res.render('login', { "mensaje": "Contrasena o usuario invalido" });
    }

});

router.get('/minerales', async (req, res) => {

    if (req.session.mail) {
        const minerales = await schemaMineral.find();
        res.render('minerales', { minerales, "mensaje": "" });
    }
    else {
        res.redirect('login');
    }

});

router.post('/minerales', (req, res) => {
    const minerales = new schemaMineral(req.body);
    minerales.save();
    res.redirect('minerales');
});

router.get('/eliminarMineral/:id', async (req, res) => {
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

router.get('/actualizarMineral/:id', async (req, res) => {
    const id = req.params.id;
    const mineral = await schemaMineral.findById(id);
    res.render('editar-minerales', { mineral });
});

router.post('/actualizarMineral/:id', async (req, res) => {
    const id = req.params.id;
    await schemaMineral.update({ _id: id }, req.body);
    res.redirect('/minerales');
});

router.get('/buscar', async (req, res) => {
    const minerales = await schemaMineral.find();
    res.render('minerales', { minerales, "mensaje": "" });
});

router.post('/buscar', async (req, res) => {

    const mineral = await schemaMineral.find();
    var flag = false;
    var mineralTemp;
    var position;

    for (var i = 0; i < mineral.length; i++) {

        if (req.body.nombreBuscar == mineral[i].nombre) {
            flag = true;
            position = i + 1;
            mineralTemp = mineral[i];
        }

    }

    if (flag) {
        res.render('minerales', { mineralTemp, "mensaje": "", position });
    }
    else {
        res.render('minerales', { "position": 1, "mensaje": "No se encontro ningun mineral con el nombre: " + req.body.nombreBuscar });
    }

});

module.exports = router;