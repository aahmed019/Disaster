import disasters from "./scripts/disasters"

document.addEventListener("DOMContentLoaded", () => {

    let playerScore = 3;
    let disasterScore = 3;
    let currentRound = 0;
    let direction;
    let solutionCards = document.querySelectorAll('.card')
    let disasterCard = document.querySelector('.disaster-card')
    let playButton = document.getElementById('play-button')
    let resetButton = document.getElementById('reset-button')
    let leftSide = document.querySelector('.left')
    let rightSide = document.querySelector('.right')
    let femaIcon = document.getElementById('fema-link')
    let endmessage = document.getElementById('endgame-message')
    
    
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
        const disaster = disasters[index]
        if(!disaster) console.log("no more cards")
        disasters.splice(index, 1)
        disasterCard.querySelector('.card-text').innerHTML= disaster.disaster.
        description
        disasterCard.classList.remove('disaster-'+ direction)
        disasterCard.classList.add('card-show')
        
        rightSide.style.backgroundImage = disaster.disaster.picture
        femaIcon.href = disaster.disaster.femaLink

        let j = 0
        let cardIndexes= shuffle([0, 1, 2]);
        for(let i = 0; i < solutionCards.length; i++) {
            let card = solutionCards[i];
            card.querySelector('.card-text').innerHTML = disaster.solutions[cardIndexes[j]].description
            card.querySelector('.card-answer').innerHTML = disaster.solutions[cardIndexes[j]].answer
            j++
            card.classList.remove('card-'+direction)
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

        
        switch (currentRound % 2) {
            case 0:
                direction = 'left'
                break;
            default:
                direction = 'right'
                break;
        }
                currentRound++
        console.log(currentRound)

        disasterCard.classList.remove('card-show')
        disasterCard.classList.add('disaster-'+direction)
        for(let i = 0; i < solutionCards.length; i++) {
            solutionCards[i].classList.remove('card-show')
            solutionCards[i].classList.add('card-'+direction)
        }
        setTimeout(function(){
            play()
        }, 1000);
    }

    function won() {
        disasterCard.classList.add('card-hide')
        rightSide.style.backgroundImage = ''
        for(var i = 0; i < solutionCards.length; i++) {
            solutionCards[i].classList.add('card-hide')
        }
        resetButton.style.display = 'block'
        endmessage.innerHTML = 'You Win!'
        console.log('win')
    }

    function lost() {
        disasterCard.classList.add('card-hide')
        rightSide.style.backgroundImage = ''
        for(var i = 0; i < solutionCards.length; i++) {
            solutionCards[i].classList.add('card-hide')
        }
        resetButton.style.display = 'block'
        endmessage.innerHTML = 'You Lost!'
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
