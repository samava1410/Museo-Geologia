const nodemailer = require('nodemailer');
// email sender function
exports.sendEmail = function (req, res) {

    // Definimos el transporter
    /*var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'samava1014@gmail.com',
            pass: 'GProgramador1410'
        }
    });*/

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'jarred.greenholt33@ethereal.email',
            pass: 'b13uaHrWZu43UhC1Ya'
        }
    });

    // Definimos el email
    var mailOptions = {
        from: req.body.email,
        to: 'samava1014@gmail.com',
        subject: req.body.asunto,
        text: req.body.mensaje
    };

    // Enviamos el email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send(500, error.message);
        } else {
            console.log("Email sent");
            res.render('index', { "mensaje": "Correo enviado, nos contactaremos pronto" });
        }
    });

};