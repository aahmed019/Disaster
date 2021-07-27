import disasters from "./scripts/disasters"

document.addEventListener("DOMContentLoaded", () => {
    const disaster = shuffle(disasters)[0]
    let solutionCards = document.querySelectorAll('.card')
    let disasterCard = document.querySelector('.disaster-card')
    disasterCard.innerHTML= disaster.disaster.description
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
        if(card.querySelector('.card-answer').innerHTML === 'true') alert("Correct")
        else alert("Incorrect")
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
