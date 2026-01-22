//declaracion de objetos
const txtUser = document.getElementById('txtUser');
const txtId = document.getElementById('txtId');
const txtTitle = document.getElementById('txtTitle');
const txtCompleted = document.getElementById('txtCompleted');

const btnAdd = document.getElementById('btnAdd');
const userTable = document.getElementById('userTable');
const userTbody = document.getElementById('userTbody');

const pErrorUser = document.getElementById('pErrorUser');

//declaracion de funciones
function addUser(){
    //validar
    let userId = txtUser.value;
    let id = txtId.value;
    let title = txtTitle.value;
    let completed = txtCompleted.value;

    if(!userId || !id || !title || !completed){
        mandarError('Todos los campos son requeridos', 5000);
        return;
    }

    //agregar tabla
    const fila = document.createElement('tr');

    const col1 = document.createElement('td');
          col1.textContent = userId;
          fila.appendChild(col1);

    const col2 = document.createElement('td');
          col2.textContent = id;
          fila.appendChild(col2);
    
    const col3 = document.createElement('td');
          col3.textContent = title;
          fila.appendChild(col3);
    
    const col4 = document.createElement('td');
          col4.textContent = completed;
          fila.appendChild(col4);

    userTbody.appendChild(fila);
    userTable.appendChild(userTbody);

    //limpiar campos
    txtUser.value = '';
    txtId.value = '';
    txtTitle.value = '';
    txtCompleted.value = '';
}

function mandarError(mensaje, tiempo){
    pErrorUser.textContent = mensaje;
    setTimeout(() => {
        pErrorUser.textContent = '';
    }, tiempo);
}

function peticionUser(){
    let url = "https://jsonplaceholder.typicode.com/todos";
    fetch(url, { method: 'GET' })
    .then( response => response.json() )
    .then( data => {mostrarUsers(data)} )
    .catch( error => {mandarError(error, 5000)} );
}

function mostrarUsers(data){
    data.forEach( user => {
        const fila = document.createElement('tr');

        const col1 = document.createElement('td');
              col1.textContent = user.userId;
              fila.appendChild(col1);
        
        const col2 = document.createElement('td');
              col2.textContent = user.id;
              fila.appendChild(col2);

        const col3 = document.createElement('td');
              col3.textContent = user.title;
              fila.appendChild(col3);

        const col4 = document.createElement('td');
              col4.textContent = user.completed;
              fila.appendChild(col4);

        userTbody.appendChild(fila);
    });
    userTable.appendChild(userTbody);
}

//asignacion de eventos
btnAdd.addEventListener('click', addUser);
document.addEventListener('DOMContentLoaded', peticionUser);