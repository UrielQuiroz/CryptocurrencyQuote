const criptoMonedasSelect = document.querySelector('#criptomonedas');
const monedaSelect = document.querySelector('#moneda');
const frm = document.querySelector('#formulario');

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


function constultarCriptoMonedas() {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

    fetch(url)
        .then(rpta => rpta.json() )
        .then(result => obtenerCriptomonedas(result.Data))
        .then( criptomonedas => selectCriptomonedas(criptomonedas))
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
}


function mostraralerta(msj) {
    console.log(msj);
}