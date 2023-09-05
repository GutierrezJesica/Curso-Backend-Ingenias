const express = require('express');
const cursos = require('./cursos');
const app = express();
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT || 3000;

//rutas

app.get('/', (req, res) => {
    res.send('Bienvenido al servidor web con rutas dinamicas');
});

app.get('/cursos', (req, res) => {
    res.json(cursos);
});

//url params
app.get('/cursos/codigo/:id', (req, res) => {
    let codigo = parseInt(req.params.id)
    if (typeof codigo === 'number') {
        let resultado = []
        for(let curso of cursos) {
            if (curso.id === codigo) {
                resultado.push(curso)
                break
            }
        }
        resultado.length > 0 ? res.json(resultado) : 
        res.status(404).json({id: 'error 404, no se encontro la ruta.'})
    }
});



app.get('/cursos/nombre/:nombre', (req, res) => {
    let parametro = req.params.nombre.trim().toLowerCase()
    if(parametro !== '') {
        let resultado = []
        for(let curso of cursos) {
            if (curso.nombre.toLowerCase() === parametro) {
                resultado.push(curso)
            }
        }
        resultado.length > 0 ? res.json(resultado) : 
        res.status(404).json({id: 'error 404, no se encontro la ruta.'})
    }
});

//rutas inexistentes

app.get("*", (req, res) => {
    res.status(404).send("Pagina no encontrada.");
});

//inicio de servidor

app.listen(PORT, () => {
    console.log('Servidor iniciado en el puerto $PORT');
});

