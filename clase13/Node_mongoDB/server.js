//SERVIDOR
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
//LLAMADO DE FUNCIONES
const {conectToMongodb, disconnectToMongodb} = require('./src/mongodb');
const { Collection } = require('mongodb');

//MIDDLEWARE
app.use((req, res, next) => {
    res.header('Content-Type', 'application/json; charset=utf-8');
    next();
});

//RAIZ
app.get('/', (req, res) => {
    res.status(200).end('Bienvenido a la API de Frutas');
});

//ENDPOINTS
app.get('/frutas', async (req, res) => {
    const client = await conectToMongodb();
    if(!client) {
        res.status(500).send('Error al conectarse a MongoDB.')
        return;
    }
    const db = client.db('Frutas')
    const Frutas = await db.collection('Frutas').find().toArray()
    await disconnectToMongodb()
    res.json(Frutas)
});

app.get('/frutas/:id', async (req, res) => {
    const frutasID = parseInt(req.params.id) || 0 //en caso de indefinido que devuelva 0
    const client = await conectToMongodb();
    if(!client) {
        res.status(500).send('Error al conectarse a MongoDB.')
        return;
    }
    const db = client.db('Frutas')
    const Fruta = await db.collection('Frutas').findOne({id: frutasID})
    await disconnectToMongodb()
    !Fruta ? res.status(404).send('No se encontro la fruta con el id: ' + frutasID) : res.json(Fruta)
});

app.get('/frutas/nombre/:nombre', async (req, res) => {
    const nombreFruta = req.params.nombre
    const client = await conectToMongodb();
    if(!client) {
        res.status(500).send('Error al conectarse a MongoDB.')
        return;
    }
    const regex = new RegExp(nombreFruta.toLowerCase(), 'i');
    const db = client.db('Frutas')
    const Frutas = await db.collection('Frutas').find({nombre: regex}).toArray()
    await disconnectToMongodb()
    Frutas.length == 0 ? res.status(404).send('No se encontro la fruta con el nombre: ' + nombreFruta) : res.json(Frutas);
});

app.get('/frutas/precio/:precio', async (req, res) => {
    const precioFruta = parseInt(req.params.precio) || 0 //en caso de indefinido que devuelva 0
    const client = await conectToMongodb();
    if(!client) {
        res.status(500).send('Error al conectarse a MongoDB.')
        return;
    }
    const db = client.db('Frutas')
    const Frutas = await db.collection('Frutas').find({importe: {$gte: precioFruta}}).toArray()
    await disconnectToMongodb()
    Frutas.length == 0 ? res.status(404).send('No se encontro la fruta con el nombre: ' + precioFruta) : res.json(Frutas);
});

//ENDPOINT QUE RESPONDE EN CASO DE ERROR
app.get('*', (req, res) => {
    res.json({ error: '404', message: 'No se encontro la ruta solicitada.' });
});

//INICIO DEL SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});