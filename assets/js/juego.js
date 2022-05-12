/*
2C = Two of Clubs
2D = Two of Diamonds
2H = Two of Hearts
2S = Two of Spades
*/


let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
let especiales = ['A', 'J', 'Q', 'K'];

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
    console.log(deck)
    let carta = deck.pop()
    return carta

}

crearDeck();

for (i = 0; i<60 ; i++){
    pedirCarta()
}

