console.log("Iniciando .....")

const nombres = ["jose", "manuel", "francisco", "Maria", "Ruby", "Fernanda", "Alexis", "Kevin"];

console.log("For simple");

for(let con=0; con < nombres.length; con++){
    console.log("Nombre:", nombres[con]);
}

console.log("Foreach Para recorrer arreglos u objetos");
nombres.forEach(a => {
    console.log(a);
});

console.log("Foreach Para obtener un objeto o su posicion");

for(let nom of nombres){
    console.log(nom);
}
for(let nom in nombres){
    console.log(nom);
}
//Declarar objeto que contiene un array
const alumnos = {
    "matricula": "2023030457",
    "nombre": "Juan Perez",
    "materias": ["Ingles", "Español", "Matematicas"]
};

console.log("leer el objeto");
console.log("Matricula: " + alumnos.matricula + " Nombre: " + alumnos.nombre + " Materias: " + alumnos.materias);

alumnos.materias.forEach(m => {

    console.log(m);
});

//leer un objeto que tiene valores pero arreglos sin Nombre.

const data = {
    animales: {
        "gatos": ["siames", "persa", "escoses"],
        "perros": ["pastor", "labrador", "bulldog"],
        "caballos": ["azteca", "arabe", "apaloosa"]
    }
}

//leer  el objeto
for(let tipo in data.animales){

    console.log(tipo);
    data.animales[tipo].forEach(raza => {
        
        console.log(raza);
    });
}

async function peticion(){

    const url = "https://dog.ceo/api/breeds/list/all";

    try{
        const response = await fetch(url); //en response tenemos toda la informacion de la peticion
        const data = await response.json(); //en data tenemos la informacion en formato JSON
        mostrarRaza(data); //llamar a la funcion para mostrar la informacion
    }catch(error) {
        console.log(error);
    }

    function mostrarRaza(data){
        const urlInicio = "https://dog.ceo/api/breed/";
        const urlFinal = "/images/random";
        let urlImg = "";

        for(let perro in data.message){
            raza = data.message[perro];
            if(raza.length > 0){
                raza.forEach(raza => {
                    urlImg = urlInicio + perro + "/" + raza + urlFinal;
                    peticionUrl(urlImg);
                });
            }else {
                urlImg = urlInicio + perro + urlFinal;
                peticionUrl(urlImg);
            }
        }
    }
}

async function main(){
    await peticion();
}

async function peticionUrl(url){

    try{
        const response = await fetch(url); //en response tenemos toda la informacion de la peticion
        const data = await response.json(); //en data tenemos la informacion en formato JSON
        mostrarUrl(data.message); //llamar a la funcion para mostrar la informacion
    }catch(error){console.log(error);}

}

function mostrarUrl(urlImg){
    console.log("Url Imagen: " + urlImg); //mostrar la url de la imagen
}
main();