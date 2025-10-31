let deckId;
let computerScore = 0;
let userScore = 0;
const cards = document.getElementById('cards');
const newDeckButton = document.getElementById("new-deck");
const drawCardsButton = document.getElementById("draw-cards");
const resultContainer = document.getElementById('result-container');
const remainingCards = document.getElementById('cards-remaining');
const computerScoreElement = document.getElementById('computer-score');
const userScoreElement = document.getElementById('user-score');
let numCardsRemaining;
let arrayOfCards = ['2','3','4','5','6','7','8','9','10','JACK','QUEEN','KING','ACE'];

function checkHighestValueCard(card1, card2) {
    const value1 = card1.value;
    const value2 = card2.value;
    const indexOfValue1 = arrayOfCards.indexOf(value1);
    const indexOfValue2 = arrayOfCards.indexOf(value2);

    if(indexOfValue1 === indexOfValue2) {
        return 'It\'s a War!'
    }
    else if(indexOfValue1 > indexOfValue2) {
        computerScore +=1
        computerScoreElement.textContent = `Computers Score : ${computerScore}`;
        return 'Computer Wins!'
    }
    else {
        userScore +=1;
        userScoreElement.textContent = `Your Score : ${userScore}`;
        return 'You Win!'
    }
}

async function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            deckId = data.deck_id
            numCardsRemaining = data.remaining
            remainingCards.textContent = `Remaining cards : ${numCardsRemaining}`;
        })
        cards.children[0].innerHTML = ""
        cards.children[1].innerHTML = ""
        resultContainer.textContent = "New deck added, click Draw" ;
}

newDeckButton.addEventListener("click", handleClick);

drawCardsButton.addEventListener("click", () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            cards.children[0].innerHTML = `<img src=${data.cards[0].image} alt="" class="card" />`
            cards.children[1].innerHTML = `<img src=${data.cards[1].image} alt="" class="card" />`
            const result = checkHighestValueCard(data.cards[0],data.cards[1]);
            resultContainer.textContent = result;
            remainingCards.textContent = `Remaining Cards : ${data.remaining}`
            if(data.remaining === 0) {
                drawCardsButton.disabled = true
                if(computerScore > userScore) {
                    resultContainer.textContent = "Computer won the game!"
                } else if(userScore > computerScore){
                    resultContainer.textContent = "Congratulations, you won the game!"
                }
                else {
                    resultContainer.textContent = "It's a tie game!"
                }
            }
            })
        })