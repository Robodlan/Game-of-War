let deckId
let userS = 0
let cpuS = 0
const cpuScore = document.getElementById('cpu-score')
const userScore = document.getElementById('user-score')
const carEl = document.getElementById('card')
const text = document.getElementById('text')
const remaining = document.getElementById('remaining')
const points = document.getElementById('points')
const newDeckBtn = document.getElementById('new-deck').addEventListener('click', getDeck)
const drawBtn = document.getElementById('draw-btn')


function getDeck() {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => res.json())
    .then(data => {
        let audio = new Audio("click.mp3");
        audio.play();
        remaining.textContent = `Remaining cards: ${data.remaining}`
        deckId = data.deck_id
    })
}

drawBtn.addEventListener('click', ()=> {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
     .then(res => res.json())
     .then(data => {
        let audio = new Audio("click.mp3");
        audio.play();
        const remainingCards = data.remaining
        remaining.textContent = `Remaining cards: ${remainingCards}`

        carEl.children[0].innerHTML = `
           <img src="${data.cards[0].image}" class="card" />
           `
        carEl.children[1].innerHTML = `
         <img src="${data.cards[1].image}" class="card" /> `
        const winnerText = cardsValue(data.cards[0], data.cards[1])
         text.innerHTML = winnerText

        if (remainingCards === 0 ){
            drawBtn.disabled = true
            if (cpuS > userS ) {
                text.textContent = "GAME OVER, CPU WIN!!!" 
            } else if (cpuS < userS ) {
                text.textContent = "GAME OVER, YOU WIN!!!" 
            } else {
                "It's A Tie Game!"
            }
         }
     })
}) 

function cardsValue(card1, card2) {
  const values = ["2", "3", "4", "5", "6", "7", "8", "9", 
  "10", "JACK", "QUEEN", "KING", "ACE"]
  const cardsValue1 = values.indexOf(card1.value)
  const cardsValue2 = values.indexOf(card2.value)

  if (cardsValue1 > cardsValue2) {
      cpuS++
      cpuScore.innerHTML = `CPU ${cpuS}`
      return "CPU WIN!"
      
  } else if (cardsValue1 < cardsValue2) {
      userS++
      userScore.innerHTML = `YOU ${userS}`
      return "YOU WIN!"
      
  } else {
      return "WAR!"
  }
}