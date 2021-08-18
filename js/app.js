const criptoMonedasSelect = document.querySelector('#criptomonedas');
const monedaSelect = document.querySelector('#moneda');
const frm = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

//Objeto de busqueda
const objBusqueda = {
    moneda: '',
    criptomoneda: ''
}

//Crear un Promise
const obtenerCriptomonedas = criptomonedas => new Promise( resolve => {
    resolve(criptomonedas);
})

document.addEventListener('DOMContentLoaded', () => {
    constultarCriptoMonedas();
    frm.addEventListener('submit', submitFrm);
    criptoMonedasSelect.addEventListener('change', leerValor);
    monedaSelect.addEventListener('change', leerValor);
})


async function constultarCriptoMonedas() {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

    // fetch(url)
    //     .then(rpta => rpta.json() )
    //     .then(result => obtenerCriptomonedas(result.Data))
    //     .then( criptomonedas => selectCriptomonedas(criptomonedas))

    try {
        const rpta = await fetch(url);
        const result = await rpta.json();
        const criptomonedas = await obtenerCriptomonedas(result.Data);
        selectCriptomonedas(criptomonedas);
    } catch (error) {
        console.log(error);
    }
}

function selectCriptomonedas(criptomonedas) {
    criptomonedas.forEach(cripto => {
        const { FullName, Name } = cripto.CoinInfo;

        const option = document.createElement('option');
        option.value = Name;
        option.textContent = FullName;
        criptoMonedasSelect.appendChild(option);
    });
}


function leerValor(e) {
    objBusqueda[e.target.name] = e.target.value;
}


function submitFrm(e) {
    e.preventDefault();

    //Validar frm
    const { moneda, criptomoneda } = objBusqueda;

    if(moneda === '' || criptomoneda === '') {
        mostraralerta('Ambos campos son obligatorios');
        return;
    }

    //Consultar api con los resultados
    consultarApi();
}


function mostraralerta(msj) {
    const existeError = document.querySelector('.error');

    if(!existeError) {
        const divMsj = document.createElement('div');
        divMsj.classList.add('error');

        //Mensaje de error
        divMsj.textContent= msj;
        frm.appendChild(divMsj);

        setTimeout(() => {
            divMsj.remove();
        }, 3000);
    }
}


async function consultarApi() {
    const { moneda, criptomoneda } = objBusqueda;

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
    
    mostrarSpinner();

    // fetch(url)
    //     .then( rpta => rpta.json())
    //     .then( result => {
    //         mostrarCotizacionHTML(result.DISPLAY[criptomoneda] [moneda]);
    //     })
    
    try {
        const rpta = await fetch(url);
        const result = await rpta.json();
        mostrarCotizacionHTML(result.DISPLAY[criptomoneda] [moneda]);
    } catch (error) {
        console.log(error);
    }
}

function mostrarCotizacionHTML(cotizacion) {

    limparHTML();

    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = cotizacion;

    const precio = document.createElement('p');
    precio.classList.add('precio');
    precio.innerHTML = `El precio es: <span>${PRICE}</span>`;

    const precioAlto = document.createElement('p');
    precioAlto.innerHTML = `El precio más alto del día es: <span>${HIGHDAY}</span>`;

    const precioBajo = document.createElement('p');
    precioBajo.innerHTML = `El precio más bajo del día es: <span>${LOWDAY}</span>`;

    const ultimasHoras = document.createElement('p');
    ultimasHoras.innerHTML = `Variación ultimas 24 horas: <span>${CHANGEPCT24HOUR}</span>`;

    const ultimaActualizacion = document.createElement('p');
    ultimaActualizacion.innerHTML = `Última actualización: <span>${LASTUPDATE}</span>`;

    resultado.appendChild(precio);
    resultado.appendChild(precioAlto);
    resultado.appendChild(precioBajo);
    resultado.appendChild(ultimasHoras);
    resultado.appendChild(ultimaActualizacion);
}

function limparHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function mostrarSpinner() {
    limparHTML();

    const spinner = document.createElement('div');
    spinner.classList.add('spinner');

    spinner.innerHTML = `
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    `;

    resultado.appendChild(spinner);
}