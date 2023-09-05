const express = require('express');
const productos = require('./productos');
const app = express();

const PORT = 3000

function getProductos() {
    return productos ? productos : {id: 'Error 404, no se encontro coincidencia.'}
}

app.get('/productos', (req, res) => {
    const ordenarPorNombre = () => {
        productos.sort((a, b) => {
            if(a.nombre > b.nombre) {
                return 1;
            }
            if(a.nombre < b.nombre) {
                return -1;
            }
            return 0;
        })
        console.log(productos)
        return productos
    }
    ordenarPorNombre()
    res.send(ordenarPorNombre())
});

app.get('/productos/codigo/:id', (req, res) => {
    let codigo = parseInt(req.params.id)
    if (typeof codigo === 'number') {
        let resultado = []
        for(let producto of productos) {
            if (producto.id === codigo) {
                resultado.push(producto)
                break
            }
        }
        resultado.length > 0 ? res.json(resultado) : 
        res.status(404).json({id: 'error 404, no se encontro la ruta.'})
    }
});

app.get('/productos/:nombre', (req, res) => {
    console.log(req.params);
    let nombreIng = req.params.nombre.trim().toLowerCase();
    const nombreEnc = productos.filter((producto) =>
    producto.nombre.trim().toLowerCase().includes(nombreIng));
    nombreEnc.length == 0
    ? res.json({id: "Error, no se encontraron coincidencias."})
    : res.json(nombreEnc);

});

app.get('*', (req, res) => {
    res.status(404).send('Lo siento pero no se encontraron rutas con ese nombre.')
});

app.listen(PORT, () => {
    console.log('Servidor iniciado en el puerto $PORT');
});