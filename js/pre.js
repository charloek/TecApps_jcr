//declaracion de objetos
const inputId = document.getElementById('inputId');
const btnMostrar = document.getElementById('btnMostrar');
const pError = document.getElementById('pError');
const nombreValue = document.getElementById('nombreValue');
const usuarioValue = document.getElementById('usuarioValue');
const emailValue = document.getElementById('emailValue');
const calleValue = document.getElementById('calleValue');
const cpValue = document.getElementById('cpValue');
const ciudadValue = document.getElementById('ciudadValue');

//declaracion de funciones
function mandarError(mensaje, tiempo){
    pError.textContent = mensaje;
    setTimeout(() => {
        pError.textContent = '';
    }, tiempo);
}

function limpiarCampos(){
    nombreValue.value = '';
    usuarioValue.value = '';
    emailValue.value = '';
    calleValue.value = '';
    cpValue.value = '';
    ciudadValue.value = '';
}

function mostrarVendedor(data){
    nombreValue.value = data.name;
    usuarioValue.value = data.username;
    emailValue.value = data.email;
    calleValue.value = data.address.street;
    cpValue.value = data.address.zipcode;
    ciudadValue.value = data.address.city;
}

function peticionVendedor(){
    //validar
    let id = inputId.value;

    if(!id){
        mandarError('El ID es requerido', 5000);
        return;
    }

    //hacer peticion
    let url = "https://jsonplaceholder.typicode.com/users/" + id;
    fetch(url, { method: 'GET' })
    .then(response => {
        if (!response.ok) {
            throw new Error('Usuario no encontrado');
        }
        return response.json();
    })
    .then(data => {
        if (!data || !data.id) {
            throw new Error('Usuario no encontrado');
        }
        limpiarCampos();
        mostrarVendedor(data);
    })
    .catch(() => {
        limpiarCampos();
        mandarError('Error: Usuario no encontrado', 5000);
    });
}

//asignacion de eventos
btnMostrar.addEventListener('click', peticionVendedor);