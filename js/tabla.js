//declaracion de objetos
const txtId = document.getElementById('txtId');
const txtNombre = document.getElementById('txtNombre');
const txtEscuela = document.getElementById('txtEscuela');

const btnAgregar = document.getElementById('btnAgregar');
const tabla = document.getElementById('tabla');
const tbody = document.getElementById('tbody');

const pError = document.getElementById('pError');

// declaracion de funcion

function agregar(){
    //validar
    let id = txtId.value;
    let nombre = txtNombre.value;
    let escuela = txtEscuela.value;

    if(!id||!nombre||!escuela){
        mostrarError('Todos los campos son obligatorios', 5000);
        return;
    }

    //agregar tabla
    const fila = document.createElement('tr');

    const c1 = document.createElement('td');
          c1.textContent = id;
          fila.appendChild(c1);

    const c2 = document.createElement('td');
          c2.textContent = nombre;
          fila.appendChild(c2);

    const c3 = document.createElement('td');
          c3.textContent = escuela;
          fila.appendChild(c3);

        tbody.appendChild(fila);
        tabla.appendChild(tbody);

    //limpiar campos
    txtId.value = '';
    txtEscuela.value = '';
    txtNombre.value = '';
}

function mostrarError(mensaje, tiempo){
    pError.textContent = mensaje;

    //funcion que recibe otra funcion y un valor entero
    setTimeout(() => {
        pError.textContent = ''; //limpiar el mensaje despues del tiempo
    }, tiempo);
}

async function peticion(){
    let url = "../alumnos.json";
    try{
        const response = await fetch(url, { method: 'GET' });
        const data = await response.json();
        mostrarAlumnos(data);

    }catch(error){
        mostrarError(error, 5000);
    }
}

function mostrarAlumnos(data){
    data.forEach( alumno => {

        //agregar elementos a una tabla dinamicamente
        const fila = document.createElement('tr');

        const c1 = document.createElement('td');
              c1.textContent = alumno.id;
              fila.appendChild(c1);

        const c2 = document.createElement('td');
              c2.textContent = alumno.nombre;
              fila.appendChild(c2);

        const c3 = document.createElement('td');
              c3.textContent = alumno.escuela;
              fila.appendChild(c3);

        tbody.appendChild(fila);
    });
    tabla.appendChild(tbody);
}

function otraTarea(){
    mostrarError('Iniciando otra tarea', 5000);

    //agregar 40 filas a la tabla
    for(let con=0; con<=40; con++){
        const fila = document.createElement('tr');

        const c1 = document.createElement('td');
        c1.textContent = con;
        fila.appendChild(c1);
        tbody.appendChild(fila);
    }
    tabla.appendChild(tbody);
}

async function main(){
    await peticion(); //aqui se espera a que termine la peticion
    otraTarea(); //esta funcion se ejecuta despues de la peticion
}

//asignacion de eventos
btnAgregar.addEventListener('click', agregar);
document.addEventListener('DOMContentLoaded', main);