const express = require('express');
const app = express();
const path = require('path');
const PORT = 3008

//iniciar el motor de plantilla  elegido
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'views')))
const listaDeProductos = [{name: 'Rascador', price: 500},
                          {name: 'Letrina', price: 1000},
                          {name: 'palita', price: 100}]

//ruta basica

app.get('/', (req, res) => {
    const data = {
        title: 'Mi sitio web con EJS',
        message: 'Bienvenido!! este sitio fue generado a partir de un motor de plantillas.',
        productsURL: '/productos'
    };
    res.render('index', data);
});

app.get('/productos', (req, res) => {
    const data = {
        title: 'Sector productos',
        message: 'Bienvenido!! este sitio fue generado a partir de un motor de plantillas.',
        lista: listaDeProductos
    };
    res.render('productos', data);
});

//rutas inexistentes

app.use((req, res) => {
    res.status(404).json({error: '404', descripcion: 'request invalido'});
});

//iniciar servidor

app.listen(PORT, () => {
    console.log('Servidor iniciado en el puerto ${PORT}');
});