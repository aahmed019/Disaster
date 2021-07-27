import disasters from "./scripts/disasters"

document.addEventListener("DOMContentLoaded", () => {
    
    let playerScore = 1;
    let disasterScore = 1;

    let index = Math.floor(Math.random() * disasters.length)
    const disaster = disasters[index]
    disasters.splice(index, 1)

    let solutionCards = document.querySelectorAll('.card')
    let disasterCard = document.querySelector('.disaster-card')
    disasterCard.querySelector('.card-text').innerHTML= disaster.disaster.description
    let j = 0
    let cardIndexes= shuffle([0, 1, 2]);
    for(var i = 0; i < solutionCards.length; i++) {
        var card = solutionCards[i];
        card.querySelector('.card-text').innerHTML = disaster.solutions[cardIndexes[j]].description
        card.querySelector('.card-answer').innerHTML = disaster.solutions[cardIndexes[j]].answer
        j++
        card.addEventListener("click", function(e){
            answer(this)
        });
    }

    function answer(card){
        // card.classList.add("answer-card")
        // console.log(card.querySelector('.card-answer').innerHTML === 'true')
        if(card.querySelector('.card-answer').innerHTML === 'true') disasterScore -= 1
        else playerScore -= 1

        if(playerScore === 0) lost()
        else if(disasterScore === 0) won()

    }

    function won() {
        alert('win')
    }

    function lost() {
        alert('lost')
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
