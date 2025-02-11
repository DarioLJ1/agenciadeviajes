import express from 'express';
import router from './Routers/index.js';
import db from './config/db.js';

const app = express();

// Habilitar lectura de datos de formularios
app.use(express.urlencoded({ extended: true }));

// Conectar a la base de datos
db.authenticate()
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.log(err));

const port = process.env.PORT || 4000;

// Configurar Pug como motor de vistas
app.set('view engine', 'pug');

// Middleware global para definir el año
app.use((req, res, next) => {
        res.locals.year = new Date().getFullYear();
        res.locals.nombreP = 'Agencia de Viajes';
        next();
});

// Definir la carpeta pública
app.use(express.static('public'));

// Usar el router
app.use('/', router);

// Iniciar el servidor
app.listen(port, () => {
        console.log('Servidor corriendo en el puerto ' + port);
});