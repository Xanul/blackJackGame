const miModulo = (() => {
    "use strict";

    // Variables utilizadas en el programa
    let deck = [],
        puntosJugadores = [],
        nombresJugadores = [];

    const tipos = ["C", "D", "H", "S"],
          especiales = ["A", "J", "Q", "K"];

    // Referencias HTML
    const btnPedir = document.querySelector("#btnPedir");
    const btnDetener = document.querySelector("#btnDetener");
    const btnNuevo = document.querySelector("#btnNuevo");
    const nombreJugador = document.querySelector('#nombreJugador');
    const scoresJuego = document.querySelectorAll("small");
    const divCartasJugadores = document.querySelectorAll('.divCartas');
    const divLogos = document.querySelector('.sec')

    const inicializarJuego = (numJugadores = 2) => {

        if (nombresJugadores[0] === undefined){
            agregarNombre();
        }

        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        scoresJuego.forEach((element) => element.innerText = 0);

        divCartasJugadores.forEach((element) => element.innerHTML = "");

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    const crearDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos) {
            for (let especial of especiales) {
                deck.push(especial + tipo);
            }
        }
        return _.shuffle(deck);
    };



    const pedirCarta = () => {
        if (deck.length === 0) {
            throw "No hay cartas en el deck";
        }
        return deck.pop();
    };


    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);

        return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
    };

    // Turno 0 = primer jugador y ultimo es la computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] += valorCarta(carta);
        scoresJuego[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const agregarNombre = () => {
        nombresJugadores[0] = prompt('Ingresa tu nombre');
        nombreJugador.innerText = nombresJugadores[0]
    }

    const renderizarCarta = (carta, turno) => {
        const imgCarta = document.createElement("img");
        imgCarta.src = `./assets/cartas/${carta}.png`;
        imgCarta.classList.add("carta");

        divCartasJugadores[turno].append(imgCarta)

    }

    const determinarGanador = () => {

        const [puntosJugador, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            if (
                (puntosJugador < 22 && puntosJugador > puntosComputadora) ||
                puntosComputadora > 21
            ) {
                alert("Ganaste!!");
            } else if ((puntosComputadora < 22 && puntosJugador < puntosComputadora) || puntosJugador > 21) {
                alert("La computadora gano :(");
            } else if (puntosJugador === puntosComputadora) {
                alert("Empate");
            }
        }, 200);
    }

    const turnoComputadora = (puntosJugador) => {

        do {
            let carta = pedirCarta();

            acumularPuntos(carta, puntosJugadores.length - 1);

            renderizarCarta(carta, puntosJugadores.length - 1);


        } while (puntosJugadores[puntosJugadores.length - 1] < 17 && puntosJugador <= 21);

        determinarGanador();

    };

    // Eventos
    btnPedir.addEventListener("click", () => {

        let carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        renderizarCarta(carta, 0);

        if (puntosJugador > 21) {
            console.warn("Lo siento mucho, perdiste");
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn("BlackJack!");
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    btnDetener.addEventListener("click", () => {
        turnoComputadora(puntosJugadores[0]);
        btnPedir.disabled = true;
        btnDetener.disabled = true;
    });


    btnNuevo.addEventListener("click", () => {
        
        inicializarJuego();

    });

    divLogos.addEventListener("dblclick", ()=> {
        alert('Hola Amorcito!')
    });

    return {
        nuevoJuego: inicializarJuego
    };

})();
