const ingredients = document.getElementsByClassName('column');
console.log(ingredients);


document.body.addEventListener('click', function(event) {
    const ingWrapper = document.getElementById('ingredientBlock')
    const div = document.createElement('div');
    if (event.target.classList.contains('chose')) {
    event.target.classList.remove('chose');
    event.target.style.color = 'black';
        if(event.target.classList.contains('choseIng')){

        }
} else if (event.target.classList.contains('ing')) {
    event.target.classList.add('chose');
    event.target.style.color = 'red';
    div.textContent = event.target.textContent;
    div.classList.add('choseIng')
    ingWrapper.append(div)
    }
});





// ------------------------------------   CONSTANTS


const basics = {
    neaplesDough: 3,
    romeDought: 4,
    sizilianDough: 6,
    classicDough: 7
}

const meatIngredients = {
    salami: 7,
    chicken: 5,
    bacon: 4,
    pork: 3
}

const nonMeatIngredients = {
    tomato: 2,
    cheese : 3,
    truffle: 8,
    mushrooms: 4
}

const sauce = {
    mayoSauce: 1,
    tomatoSauce: 2,
    chesseSauce: 3,
    bbqSauce: 5
}




