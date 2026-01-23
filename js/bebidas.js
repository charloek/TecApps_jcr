//declarar variables
const pError = document.getElementById('pError');
const tablaBebidas = document.getElementById('tabla');
const tbodyBebidas = document.getElementById('tbody');
const pContador = document.getElementById('contador');

//declaracion de funciones
function mostrarError(mensaje, tiempo){
    pError.textContent = mensaje;

    //funcion que recibe otra funcion y un valor entero
    setTimeout(() => {
        pError.textContent = ''; //limpiar el mensaje despues del tiempo
    }, tiempo);
}

//funcion para hacer la peticion inicial
async function peticion(){
    try{
        const drinks = await obtenerBebidas("Non_Alcoholic");
        mostrarBebidas(drinks);
    }catch(error){
        mostrarError(error, 5000);
    }
}

//funcion para obtener las bebidas de la API
async function obtenerBebidas(tipoFiltro){
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${tipoFiltro}`;
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();
    return data.drinks;
}

//funcion para filtrar las bebidas
async function filtrarBebidas(tipo) {
    try {
        if (tipo === '2') {
            const bebidasAlcoholicas = await obtenerBebidas("Alcoholic");
            mostrarBebidas(bebidasAlcoholicas);
        } else if (tipo === '1') {
            const bebidasNoAlcoholicas = await obtenerBebidas("Non_Alcoholic");
            mostrarBebidas(bebidasNoAlcoholicas);
        } else {
            const bebidasAlcoholicas = await obtenerBebidas("Alcoholic");
            const bebidasNoAlcoholicas = await obtenerBebidas("Non_Alcoholic");
            const todas = [...(bebidasAlcoholicas || []), ...(bebidasNoAlcoholicas || [])]; // combinar ambas listas
            //la sintaxis ... se llama operador spread
            //spread operator permite expandir elementos iterables como arrays en lugares donde se esperan cero o más argumentos
            //se lee como [elemento1, elemento2, ..., elementoN]
            mostrarBebidas(todas);
        }
    } catch (error) {
        mostrarError('Error al cargar las bebidas', 5000);
    }
}

//funcion para mostrar las bebidas en la tabla
function mostrarBebidas(drinks){
    tbodyBebidas.innerHTML = '';
    if (drinks) {
        drinks.forEach( d =>  {
            const fila = document.createElement('tr');
            const tdi = document.createElement('td');
              tdi.textContent = d.idDrink;
              fila.appendChild(tdi);

            const tnombre = document.createElement('td');
              tnombre.textContent = d.strDrink;
              fila.appendChild(tnombre);

            const timagen = document.createElement('td');
            const img = document.createElement('img');
              img.src = d.strDrinkThumb;
              img.alt = d.strDrink;
              img.width = 100;
              timagen.appendChild(img);
              fila.appendChild(timagen);
              tbodyBebidas.appendChild(fila);
        });
        pContador.textContent = `Total: ${drinks.length}`;
    } else {
        mostrarError('No se encontraron bebidas', 3000);
        pContador.textContent = 'Total: 0';
    }
}

async function main(){
    await peticion(); //aqui se espera a que termine la peticion
    document.getElementById('btnSeleccionar').addEventListener('click', () => {
        const tipo = document.getElementById('tipo').value;
        filtrarBebidas(tipo);
    });
}

//asignacion de eventos
document.addEventListener('DOMContentLoaded', main);