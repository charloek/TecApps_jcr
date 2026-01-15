//declaracion de objetos
const txtId = document.getElementById('txtId');
const txtNombre = document.getElementById('txtNombre');
const txtEscuela = document.getElementById('txtEscuela');

const btnAgregar = document.getElementById('btnAgregar');
const tabla = document.getElementById('tabla');
const tbody = document.getElementById('tbody');

// declaracion de funcion

function agregar(){
    //validar
    let id = txtId.value;
    let nombre = txtNombre.value;
    let escuela = txtEscuela.value;

    if(!id||!nombre||!escuela){
        alert('Faltan datos por llenar');
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

btnAgregar.addEventListener('click', agregar);