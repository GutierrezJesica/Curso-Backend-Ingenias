const http = require('http');

const PORT = 3008

const server = http.createServer((request, response) => {
    if (request.url == '/') {
    response.writeHead (200, {'Content-Type': 'text/html'});
    response.end('<h1>Bienvenido al sitio</h1>');
} else if (request.url == '/cursos') {
    response.writeHead (200, {'Content-Type': 'text/html'});
    response.write ('<h1>Bienvenido a la seccion cursos</h1>');
    response.write ('<h3><li>Curso de desarrollo web</li><li>Curso de designer UX/UI</li><li>Curso de JavaScrip</li><li>Curso de Payton</li></h3>');
    response.end('<h4>Gracias por su visita</h4>');
} else if (request.url == '/contacto') {
    response.writeHead (200, {'Content-Type': 'text/html'});
    response.write ('<h1>Bienvenido a la seccion contacto</h1>');
    response.write ('<h3>Nombre y apellido</h3><input></input>');
    response.write ('<h3>Mensaje</h3><input></input>');
    response.write ('<h3>E-mail</h3><input></input>');
    response.write ('<br><br>');
    response.write ('<button>Enviar</button>');
    response.end ('<h4>Gracias por su visita</h4>')
} else {
    response.writeHead (404, {'Content-Type': 'text/html'});
    response.end('<h3>ERROR 404 - Request invalido</h3>');
}
})

server.listen(PORT, () => {
    console.log('Servidor ejecutandose en el puerto: ${PORT}');
})