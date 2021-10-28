//variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const maximo = document.querySelector('#maximo');
const minimo = document.querySelector('#minimo');
const puertas = document.querySelector('#puertas');
const color = document.querySelector('#color');
const transmision = document.querySelector('#transmision');

//contiene los resultados
const resultado = document.querySelector('#resultado');

const yearMax = new Date().getFullYear(); //trae el año en el que esta
const yearMin = yearMax - 10;


//objeto con toda la informacion del filtrado
const busqueda = {
    marca: '',
    year: '',
    maximo: '',
    minimo: '',
    puertas: '',
    color: '',
    transmision: '',
}


//eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos); //muestra los autos
    cargarSelect();//carga los datos de los años

    //eventlistener para cada select de cada dato de busqueda
    marca.addEventListener('change', e => { 
        busqueda.marca = e.target.value; //inserta el valor seleccionado en el objeto busqueda
        filtrarAuto();
    });

    year.addEventListener('change', e => { 
        busqueda.year = parseInt( e.target.value );
        filtrarAuto(); //se llama a la funcion que retorna los valores de cada funcion
    });

    maximo.addEventListener('change', e => {
        busqueda.maximo = e.target.value;
        filtrarAuto(); 
    });

    minimo.addEventListener('change', e => {
        busqueda.minimo = e.target.value;
        filtrarAuto(); 
    });

    puertas.addEventListener('change', e => {
        busqueda.puertas = parseInt( e.target.value );
        filtrarAuto(); 
    });

    color.addEventListener('change', e => {
        busqueda.color = e.target.value; 
        filtrarAuto(); 
    });

    transmision.addEventListener('change', e => {
        busqueda.transmision = e.target.value;
        filtrarAuto();  
    });

});




//funciones
function mostrarAutos(autos) {
    
    limpiarHTML();//elimnia el html previo y vuelve a recorrer

    autos.forEach( autos => {

        const autosHTML = document.createElement('p');
        
        //destructuring
        const { marca, modelo, year, precio, puertas, color, transmision } = autos;
        
        autosHTML.innerText = `
        ${marca} - ${modelo} Año: ${year} - Precio: ${precio} - Puertas: ${puertas} - Color: ${color} - ${transmision}`; 

        resultado.appendChild(autosHTML);
    });
}

function limpiarHTML() {
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild); //elimina el primer hijo
    }
}

function cargarSelect() {
    for (let i = yearMax; i >= yearMin; i--) {
        
        //crear otro option para el select
        const opciones = document.createElement('option');
        opciones.value = i; //agrega el valor
        opciones.textContent = i; //agrega contenido
        year.appendChild(opciones);
        
    }
}

function filtrarAuto() {
    //funcion de alto nivel, funcion que toma una funcion como parametro
    //(autos) es el objeto de el archivo db.js          //encadenamiento 
    const resultadoBusqueda = autos.filter( filtrarrMarca ).filter( filtrarYear ).filter( filtrarMin ).filter( 
        filtrarMax ).filter( filtrarPuertas ).filter( filtrarTrasmision ).filter( filtrarColor );
    
    //condicion en caso de que no haya resultado en su busqueda
    if(resultadoBusqueda.length ){//si el arreglo tiene algo
        mostrarAutos(resultadoBusqueda);
    }else {
        noResultado();
    }

}

function noResultado() {
    limpiarHTML();
    
    const noResult = document.createElement('div');
    noResult.classList.add('alerta', 'error');
    noResult.textContent = 'No hay resultados para su busqueda';

    resultado.appendChild(noResult);
}

function filtrarrMarca(auto) {

    //destructuring
    const { marca } = busqueda;

    if(marca){ //si el campo marca no esta vacio entra en la condicion
        return auto.marca === marca; //retorna los valores que sena iguales al que tiene el objeto busqueda
    } //si el campo esta vacio
        return auto; //retorna todos los autos 
    
}

function filtrarYear(auto) {

    //destructuring
    const { year } = busqueda;
    
    if( year ){ 
        return auto.year === year;
    }else { 
        return auto; 
    }  
}

function filtrarMin(auto) {

    const { minimo } = busqueda;
    
    if( minimo ){ 
        return auto.precio >= minimo;
    }else { 
        return auto; 
    } 
}

function filtrarMax(auto) {
    const { maximo } = busqueda;
    
    if( maximo ){ 
        return auto.precio <= maximo;
    }else { 
        return auto; 
    } 
}

function filtrarPuertas(auto) {
    const { puertas } = busqueda;
    
    if( puertas ){ 
        return auto.puertas === puertas;
    }else { 
        return auto; 
    } 
}

function filtrarTrasmision(auto) {
    const { transmision } = busqueda;
    
    if( transmision ){ 
        return auto.transmision === transmision;
    }else { 
        return auto; 
    } 
}

function filtrarColor(auto) {
    const { color } = busqueda;
    
    if( color ){ 
        return auto.color === color;
    }else { 
        return auto; 
    } 
}