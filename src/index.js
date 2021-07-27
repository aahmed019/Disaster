import disasters from "./scripts/disasters"

document.addEventListener("DOMContentLoaded", () => {

    let playerScore = 1;
    let disasterScore = 1;
    let solutionCards = document.querySelectorAll('.card')
    let disasterCard = document.querySelector('.disaster-card')
    let playButton = document.getElementById('play-button')
    let resetButton = document.getElementById('reset-button')
    console.log(resetButton)

    for (let i = 0; i < solutionCards.length; i++) {
        solutionCards[i].addEventListener("click", function(e){
            answer(this)
        }, false);
    }
    
    document.getElementById('play-button').addEventListener("click", () => {
        playButton.style.display='none';
        play();

    })

    

    function play(){
        let index = Math.floor(Math.random() * disasters.length)
        // debugger
        const disaster = disasters[index]
        if(!disaster) console.log("no more cards")
        disasters.splice(index, 1)

        disasterCard.querySelector('.card-text').innerHTML= disaster.disaster.
        description

        disasterCard.classList.add('card-show')

        let j = 0
        let cardIndexes= shuffle([0, 1, 2]);
        for(let i = 0; i < solutionCards.length; i++) {
            let card = solutionCards[i];
            card.querySelector('.card-text').innerHTML = disaster.solutions[cardIndexes[j]].description
            card.querySelector('.card-answer').innerHTML = disaster.solutions[cardIndexes[j]].answer
            j++
            card.classList.add('card-show') 
        }
    }

    function answer(card){
        if(card.querySelector('.card-answer').innerHTML === 'true') disasterScore--
        else playerScore--

        // console.log('click')
        console.log(playerScore + 'player')
        console.log(disasterScore + 'disaster')

        if(playerScore === 0) return lost()
        else if(disasterScore === 0) return won()

        for(var i = 0; i < solutionCards.length; i++) {
            solutionCards[i].removeEventListener("click", function(e){
                answer(this)
            }, true);
        }

        // disasterCard.classList.remove('card-show')
        disasterCard.classList.remove('card-show')
        for(let i = 0; i < solutionCards.length; i++) {
            solutionCards[i].classList.remove('card-show')
        }
        setTimeout(function(){
            play()
        }, 1000);
    }

    function won() {
        disasterCard.classList.add('card-hide')
        for(var i = 0; i < solutionCards.length; i++) {
            solutionCards[i].classList.add('card-hide')
        }
        resetButton.style.display = 'block'
        console.log('win')
    }

    function lost() {
        disasterCard.classList.add('card-hide')
        for(var i = 0; i < solutionCards.length; i++) {
            solutionCards[i].classList.add('card-hide')
        }
        resetButton.style.display = 'block'
        console.log('lost')
    }

    function shuffle(array) {
        var currentIndex = array.length,  randomIndex;
    
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
        
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
    
        return array;
    }
    
})
