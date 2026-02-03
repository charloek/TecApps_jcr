//declaracion de objetos
const comboBreeds = document.getElementById('breeds');
const imagesDiv = document.getElementById('images');
const pError = document.getElementById('pError');
const btnVerImagen = document.getElementById('verImagenBtn');
const btnLimpiar = document.getElementById('limpiarBtn');

//declaracion de funciones
function mostrarError(mensaje, tiempo){
    pError.textContent = mensaje;

    setTimeout(() => {
        pError.textContent = '*';
    }, tiempo);
}

async function peticion(){
    const url = "https://dog.ceo/api/breeds/list/all";

    try{
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'success') {
            llenarCombo(data.message);
        }else{
            mostrarError('Error al cargar las razas', 5000);
        }
    }catch(error){
        console.log(error);
        mostrarError('Error al cargar las razas', 5000);
    }
}

function llenarCombo(razas){
    for(let raza in razas){
        const subrazas = razas[raza];

        if(subrazas.length > 0){
            subrazas.forEach(subraza => {
                const option = document.createElement('option');
                option.value = raza + "/" + subraza;
                option.textContent = raza + " - " + subraza;
                comboBreeds.appendChild(option);
            });
        }else{
            const option = document.createElement('option');
            option.value = raza;
            option.textContent = raza;
            comboBreeds.appendChild(option);
        }
    }
}

async function verImagen(){
    let razaSeleccionada = comboBreeds.value;

    if(!razaSeleccionada){
        mostrarError('Por favor selecciona una raza', 5000);
        return;
    }

    const urlInicio = "https://dog.ceo/api/breed/";
    const urlFinal = "/images/random";
    const url = urlInicio + razaSeleccionada + urlFinal;

    try{
        const response = await fetch(url);
        const data = await response.json();

        if(data.status === 'success'){
            imagesDiv.innerHTML = '<img src="' + data.message + '">'; // en data.message tenemos la URL de la imagen
            pError.textContent = '*';
        }else{
            mostrarError('No se encontro la imagen', 5000);
        }
    }catch(error){
        console.log(error);
        mostrarError('Error al obtener la imagen', 5000);
    }
}

function limpiar(){
    comboBreeds.value = "";
    imagesDiv.innerHTML = '<p style="padding: 150px; font-size: 50px; font-style: italic;">DOG API</p>';
    pError.textContent = '*';
    console.log("Imagen limpiada");
}

async function main(){
    imagesDiv.innerHTML = '<p style="padding: 150px; font-size: 50px; font-style: italic;">DOG API</p>';
    await peticion();
}

//asignacion de eventos
btnVerImagen.addEventListener('click', verImagen);
btnLimpiar.addEventListener('click', limpiar);
document.addEventListener('DOMContentLoaded', main);