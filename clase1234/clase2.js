const paises = ["Argentina", "Uruguay", "Brasil", "Chile", "Paraguay", "Bolivia", "Venezuela"]
const nombre = "Donna Clark";

function listarPaises(array){

    console.log("Listado de países contenidos en el array: ");
    console.table(array);
}

function cambiarNombre(){

    const tuNombre = "ingresa tu nombre de pila o nombre completo";

    try{
        tuNombre = nombre;
    }
    catch(err){
        console.error("Se ha producido un error al intentar cambiar el valor de una constante", err);
    }
    finally {
        console.log("El nombre de la constante tuNombre, es:", tuNombre);
    }
};

listarPaises(paises);
cambiarNombre();

