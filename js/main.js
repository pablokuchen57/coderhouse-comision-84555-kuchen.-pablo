let criptos = [];
let monedas = [];
let historial = JSON.parse(localStorage.getItem("historial")) || [];

// ======================
// CLASE
// ======================

class Criptomoneda {
    constructor(id, nombre, precioUSD) {
    this.id = id;
    this.nombre = nombre;
    this.precioUSD = precioUSD;
    }

    convertir(monto, monedaDestino) {
    const valorUSD = monto * this.precioUSD;
    return valorUSD * monedaDestino.cotizacion;
    }
}

// ======================
// DATOS
// ======================

async function cargarDatos() {
    const response = await fetch("./data/cryptoData.json");
    const data = await response.json();

    criptos = data.criptomonedas.map(
        c => new Criptomoneda(c.id, c.nombre, c.precioUSD)
    );

    monedas = data.monedas.map(
        m => new Criptomoneda(m.id, m.nombre, m.precioUSD)
    );

    renderizarOpciones();
    renderizarMenuCriptoRapido();
}
async function cargarDatos() {
    const response = await fetch("./data/cryptoData.json");
    const data = await response.json();

    criptos = data.criptomonedas.map(
        c => new Criptomoneda(c.id, c.nombre, c.precioUSD)
    );

    monedas = data.monedas.map(
        m => new Criptomoneda(m.id, m.nombre, m.precioUSD)
    );

    renderizarOpciones();
    renderizarMenuCriptoRapido();
}
async function cargarDatos() {
    const response = await fetch("./data/cryptoData.json");
    const data = await response.json();

    criptos = data.criptomonedas.map(
        c => new Criptomoneda(c.id, c.nombre, c.precioUSD)
    );

    monedas = data.monedas.map(
        m => new Criptomoneda(m.id, m.nombre, m.precioUSD)
    );

    renderizarOpciones();
    renderizarMenuCriptoRapido();
}
async function cargarDatos() {
    const response = await fetch("./data/cryptoData.json");
    const data = await response.json();

    criptos = data.criptomonedas.map(
        c => new Criptomoneda(c.id, c.nombre, c.precioUSD)
    );

    monedas = data.monedas.map(
        m => new Criptomoneda(m.id, m.nombre, m.precioUSD)
    );

    renderizarOpciones();
    renderizarMenuCriptoRapido();
}

function renderizarOpciones() {
    const criptoSelect = document.getElementById("criptoSelect");
    const monedaSelect = document.getElementById("monedaSelect");

    criptos.forEach(cripto => {
    const option = document.createElement("option");
    option.value = cripto.id;
    option.textContent = cripto.nombre;
    criptoSelect.appendChild(option);
    });

    monedas.forEach(moneda => {
    const option = document.createElement("option");
    option.value = moneda.codigo;
    option.textContent = moneda.codigo;
    monedaSelect.appendChild(option);
    });
    
}

// ======================
// CONVERSIÓN
// ======================

const form = document.getElementById("formConvertidor");
const criptoSelect = document.getElementById("criptoSelect");
const monedaSelect = document.getElementById("monedaSelect");
const montoInput = document.getElementById("montoInput");
const resultado = document.getElementById("resultado");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // evita que se recargue la página

    const criptoOrigen = criptoSelect.value;
    const criptoDestino = monedaSelect.value;
    const monto = parseFloat(montoInput.value);

    if (monto <= 0 || isNaN(monto)) {
    Swal.fire("Error", "Ingresa un monto válido", "error");
    return;
    }

  // Mapeo de nombres a IDs de CoinGecko
    const monedas = {
    Bitcoin: "bitcoin",
    Ethereum: "ethereum",
    USDT: "tether",
    "Peso Argentino": "ars"
    };

    try {
    const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${monedas[criptoOrigen]},${monedas[criptoDestino]}&vs_currencies=usd,ars`
    );

    const data = await response.json();

    let valorOrigen, valorDestino;

    if (criptoOrigen === "Peso Argentino") {
    valorOrigen = 1 / data.bitcoin.ars;
    } else {
        valorOrigen = data[monedas[criptoOrigen]].usd;
    }

    if (criptoDestino === "Peso Argentino") {
        valorDestino = data.bitcoin.ars;
    } else {
        valorDestino = data[monedas[criptoDestino]].usd;
    }

    const conversion = (monto * valorOrigen) / valorDestino;

    resultado.textContent = `${monto} ${criptoOrigen} ≈ ${conversion.toFixed(6)} ${criptoDestino}`;

} catch (error) {
    Swal.fire("Error", "No se pudo obtener el precio", "error");
}
});



// ======================
// HISTORIAL
// ======================

function guardarHistorial(monto, cripto, resultado, destino) {
    const conversion = {
    monto,
    cripto,
    resultado,
    destino,
    fecha: new Date().toLocaleString()
    };

    historial.push(conversion);
    localStorage.setItem("historial", JSON.stringify(historial));
    renderizarHistorial();
}

function renderizarHistorial() {
    const contenedor = document.getElementById("historial");
    contenedor.innerHTML = "";

    historial.forEach(item => {
    const div = document.createElement("div");
    div.className = "list-group-item list-group-item-dark";
    div.textContent =
    `${item.fecha} → ${item.monto} ${item.cripto} = ${item.resultado.toFixed(2)} ${item.destino}`;
    contenedor.appendChild(div);
    });
}

// ======================
// INICIALIZACIÓN
// ======================

document
    .getElementById("formConvertidor")
    .addEventListener("submit", procesarConversion);

renderizarHistorial();
cargarDatos();
