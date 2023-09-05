const fs = require('fs');
const frutas = require('./frutas.json');

function leerArchivo(nombre) {
    fs.readFile(nombre.trim(), 'utf-8', (error, data) => {
        if(error) {
            console.error(error);
            return;
        }
        console.log(data);
    });
}
leerArchivo('frutas.json');

// endpoint de la clase 8

app.get('/productos', (req, res) => {
    const ordenarPorNombre = () => {
        frutas.sort((a, b) => {
            if(a.nombre > b.nombre) {
                return 1;
            }
            if(a.nombre < b.nombre) {
                return -1;
            }
            return 0;
        })
        console.log(frutas)
        return frutas
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