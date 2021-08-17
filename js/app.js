const criptoMonedasSelect = document.querySelector('#criptomonedas');

//Crear un Promise
const obtenerCriptomonedas = criptomonedas => new Promise( resolve => {
    resolve(criptomonedas);
})

document.addEventListener('DOMContentLoaded', () => {
    constultarCriptoMonedas();
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