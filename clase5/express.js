const express = require('express');
const app = express();
const PORT = 3050

//ruta basica

app.get('/', (req, res) => {
    res.send('Hola mundo!');
});

app.get('/cursos', (req, res) => {
    res.send('Bienvenido a cursos');
});

app.get('/contacto', (req, res) => {
    res.send('Bienvenido a contacto');
});

//rutas inexistentes

app.use((req, res) => {
    res.status(404).json({error: '404', descripcion: 'request invalido'});
});

//iniciar servidor

app.listen(PORT, () => {
    console.log('Servidor iniciado en el puerto ${PORT}');
});