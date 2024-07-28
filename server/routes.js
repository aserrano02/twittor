// Routes.js - Módulo de rutas
var express = require('express');
var router = express.Router();
var push = require('./push');


const mensajes = [

  {
    _id: 'XXX',
    user: 'spiderman',
    mensaje: 'Hola Mundo'
  }

];


// Get mensajes
router.get('/', function (req, res) {
  // res.json('Obteniendo mensajes');
  res.json( mensajes );
});


// Post mensaje
router.post('/', function (req, res) {
  
  const mensaje = {
    mensaje: req.body.mensaje,
    user: req.body.user
  };

  mensajes.push( mensaje );

  console.log(mensajes);


  res.json({
    ok: true,
    mensaje
  });
});

// Almacenar la suscripción
router.post('/subscribe', function (req, res) {

  const suscripcion = req.body;
  push.addSubscription( suscripcion );

  res.json('suscribiendo');
});

// Obtener key público
router.get('/key', function (req, res) {
  const key = push.getKey();
  res.send(key);
});

// Enviar notificacion push
router.post('/push', function (req, res) {

  const post = {
    title: req.body.title,
    text: req.body.text,
    user: req.body.user
  };

  push.sendPush( post );

  res.json(post);
});



module.exports = router;