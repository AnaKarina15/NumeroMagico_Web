let numeroSecreto = 0;
let intentos = 0;
let numerosIngresados = [];
const numeroMaximo = 100;
const maximoIntentos = 10;

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    // Validación de entrada vacía o fuera de rango
    if (isNaN(numeroDeUsuario) || numeroDeUsuario < 1 || numeroDeUsuario > 100) {
        asignarTextoElemento('p', 'Por favor, ingresa un número válido entre 1 y 100.');
        return;
    }

    // Evitar números repetidos
    if (numerosIngresados.includes(numeroDeUsuario)) {
        asignarTextoElemento('p', 'Ya intentaste ese número. ¡Prueba otro!');
        limpiarCaja();
        return;
    }

    // Registrar el intento
    numerosIngresados.push(numeroDeUsuario);
    actualizarHistorial();

    if (numeroDeUsuario === numeroSecreto) {
        // EL JUGADOR ACERTÓ
        asignarTextoElemento('p', `¡Felicidades! Acertaste el número en ${intentos} ${intentos === 1 ? 'intento' : 'intentos'}.`);
        finalizarJuego();
    } else {
        // EL JUGADOR FALLÓ
        if (intentos >= maximoIntentos) {
            // Se agotaron los intentos
            asignarTextoElemento('p', `Game Over. Agotaste tus ${maximoIntentos} intentos. El número era ${numeroSecreto}.`);
            finalizarJuego();
        } else {
            // Aún le quedan intentos
            if (numeroDeUsuario > numeroSecreto) {
                asignarTextoElemento('p', `El número secreto es menor (Intento ${intentos} de ${maximoIntentos})`);
            } else {
                asignarTextoElemento('p', `El número secreto es mayor (Intento ${intentos} de ${maximoIntentos})`);
            }
            intentos++;
            limpiarCaja();
        }
    }
}

function finalizarJuego() {
    // Deshabilitar input y botón de intentar, habilitar reinicio
    document.getElementById('valorUsuario').setAttribute('disabled', 'true');
    document.getElementById('btnIntentar').setAttribute('disabled', 'true');
    document.getElementById('reiniciar').removeAttribute('disabled');
}

function actualizarHistorial() {
    const historialElem = document.getElementById('historial');
    historialElem.innerHTML = `Números ingresados: ${numerosIngresados.join(' - ')}`;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    return Math.floor(Math.random() * numeroMaximo) + 1;
}

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Número Mágico');
    asignarTextoElemento('p', `Adivina el número entre 1 y ${numeroMaximo} (Máximo ${maximoIntentos} intentos)`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    numerosIngresados = [];
    
    // Resetear interfaz
    document.getElementById('valorUsuario').removeAttribute('disabled');
    document.getElementById('btnIntentar').removeAttribute('disabled');
    document.getElementById('historial').innerHTML = 'Números ingresados: Ninguno todavía';
    limpiarCaja();
}

function reiniciarJuego() {
    condicionesIniciales();
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

// Inicializar el juego al cargar
condicionesIniciales();