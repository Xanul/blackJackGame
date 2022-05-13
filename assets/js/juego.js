/*
2C = Two of Clubs
2D = Two of Diamonds
2H = Two of Hearts
2S = Two of Spades
*/


let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
let especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;
let puntosComputadora = 0;

// Referencias HTML
const btnPedir = document.querySelector('#btnPedir');
const scoresJuego = document.querySelectorAll('small');
const divJugadorCartas = document.querySelector('#jugador-cartas')



const crearDeck = () => {

    for(i = 2; i <= 10; i++){
        for(let tipo of tipos){
            deck.push(i+tipo);
        }
    }

    for(let tipo of tipos) {
        for (let especial of especiales){
            deck.push(especial+tipo)
        }
    }

    deck=_.shuffle(deck)
};

const pedirCarta= () => {

    if (deck.length === 0){
        throw 'No hay cartas en el deck'
    }
    let carta = deck.pop()
    return carta
    
}

const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1);
    
    return (isNaN(valor)) ? ((valor === 'A') ? 11 : 10) : valor * 1; 

}

crearDeck();

console.log(deck)


// Eventos
btnPedir.addEventListener('click', () => {
    
    let carta = pedirCarta();
    
    puntosJugador = puntosJugador + valorCarta(carta);
    scoresJuego[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `./assets/cartas/${carta}.png`
    imgCarta.classList.add('carta')
    divJugadorCartas.append(imgCarta);
    
    if( puntosJugador > 21 ) {
        console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled = true;
    } else if ( puntosJugador === 21 ) {
        console.warn('BlackJack!')
        btnPedir.disabled = true;
    }

   
});




