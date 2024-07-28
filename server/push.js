const fs = require('fs')
var vapid = require('./vapid.json');
const webpush = require('web-push');
webpush.setVapidDetails(
    'mailto:asn.sei@gmail.com',
    vapid.publicKey,
    vapid.privateKey
  );
const urlsafeBase64 = require('urlsafe-base64');

const suscriptiones = require('./subs-db.json');

module.exports.getKey = () => {
    return urlsafeBase64.decode(vapid.publicKey);
    }

module.exports.addSubscription = (suscripcion) => {
    suscriptiones.push( suscripcion );
    console.log(suscriptiones);

    fs.writeFileSync(`${__dirname}/subs-db.json`, JSON.stringify(suscriptiones));

    }

module.exports.sendPush = (post) => {
    console.log('Mandando PUSHES');

    suscriptiones.forEach( (suscripcion, i) => {
        console.log(i)
        try {
            webpush.sendNotification(suscripcion, JSON.stringify(post))
            .then(console.log('Notificacion enviada'))
            .catch( err => {
                console.log('Notificacion fallida');
                if (err.statusCode === 410) {
                    console.log('Notificacion fallida');
                    suscriptiones[i].borrar = true; 
                }     
            });
            
        } catch (error) {
            console.log('Not Found')
        }

    });

};