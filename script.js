const ingredients = document.getElementsByClassName('ing');
const footerWrapper = document.getElementById('footerWrapper');
const column_1 = document.getElementById('column_1');
const column_2 = document.getElementById('column_2');
const column_3 = document.getElementById('column_3');
const column_4 = document.getElementById('column_4');
const ingWrapper = document.getElementById('ingredientBlock');

const LIMITS = {
    basics: 1,
    meats: 2,
    nonMeats: 2,
    sauces: 1
};

column_1.addEventListener('click', handleBasicIngredient);
column_2.addEventListener('click', handleMeatIngredient);
column_3.addEventListener('click', handleNonMeatIngredient);
column_4.addEventListener('click', handleSauceIngredient);


function handleBasicIngredient(event) {
    if (!event.target.classList.contains('ing')) return;
    
    const selectedBasics = document.querySelectorAll('.choseBasics');
    if (selectedBasics.length >= LIMITS.basics) {
        throw Error(`Нельзя выбирать больше ${LIMITS.basics} основы`);
    }

    // Добавляем новое выделение
    event.target.classList.add('choseBasics');
    event.target.style.color = 'red';
    addToOrder(event.target);
}

function handleMeatIngredient(event) {
    if (!event.target.classList.contains('ing')) return;
    
    const selectedMeat = document.querySelectorAll('.choseMeat');
    if (selectedMeat.length >= LIMITS.meats) {
        throw Error(`Нельзя выбирать больше ${LIMITS.meats} основы`);
    }

    // Добавляем новое выделение
    event.target.classList.add('choseMeat');
    event.target.style.color = 'red';
    addToOrder(event.target);
}

function handleNonMeatIngredient(event) {
    if (!event.target.classList.contains('ing')) return;
    
    const selectedNonMeats = document.querySelectorAll('.choseNonMeat');
    if (selectedNonMeats.length >= LIMITS.nonMeats) {
        throw Error(`Нельзя выбирать больше ${LIMITS.nonMeats} основы`);
    }

    // Добавляем новое выделение
    event.target.classList.add('choseNonMeat');
    event.target.style.color = 'red';
    addToOrder(event.target);

    
}

function handleSauceIngredient(event) {
    if (!event.target.classList.contains('ing')) return;
    
    const selectedSauce = document.querySelectorAll('.choseSauce');
    if (selectedSauce.length >= LIMITS.sauces) {
        throw Error(`Нельзя выбирать больше ${LIMITS.sauces} соуса`);
    }
    
    // Добавляем новое выделение
    event.target.classList.add('choseSauce');
    event.target.style.color = 'red';
    addToOrder(event.target);
}

function addToOrder(ingredientElement) {
    let add_ingredient = ingredientElement;
    let name_order = add_ingredient.textContent;

    // Определяем категорию
    let category;
    
    if (add_ingredient.classList.contains('choseBasics')) {
        category = 'basics';
    } 
    else if (add_ingredient.classList.contains('choseMeat')) {
        category = 'meats';
    }
    else if (add_ingredient.classList.contains('choseNonMeat')) {
        category = 'nonMeats';
    }
    else if (add_ingredient.classList.contains('choseSauce')) {
        category = 'sauces';
    }

    // Проверяем лимит для категории
    const currentCount = document.querySelectorAll(`.new_ingredient.${category}`).length;
    if (currentCount >= LIMITS[category]) {
        return;
    }
    
    let new_ingredient = document.createElement('div');
    new_ingredient.classList.add('new_ingredient', category);
    new_ingredient.innerHTML = `
        <span class="name">${name_order}</span>
        <button class="btn_remove">X</button>
    `;
    ingWrapper.appendChild(new_ingredient);

    new_ingredient.querySelector('.btn_remove').addEventListener('click', removeFromOrder)
}

function removeFromOrder(event){

    const btn_remove = event.target; // Кнопка удаления
    const btn_remove_parent = btn_remove.parentElement; // Родительский элемент (ингредиент в заказе)
    const name_order = btn_remove_parent.querySelector('.name').textContent;

    const allIngredients = document.querySelectorAll('.ing');
    allIngredients.forEach(ing => {
        if (ing.textContent === name_order) {
            ing.classList.remove('choseBasics', 'choseMeat', 'choseNonMeat', 'choseSauce');
            ing.style.color = 'black';
        }
    });
    btn_remove_parent.remove();

    // grandTotal();
}


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