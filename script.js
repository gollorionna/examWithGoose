
// ---Логика отображения пиццы---
let countBasicsSauce = 1;
let countMeatIngredients = 0;
let countNonMeatIngredients = 0;
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
    countBasicsSauce++
    console.log(countBasicsSauce);
    
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
    countMeatIngredients+0.6
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
    countNonMeatIngredients+0.6
    
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
    countBasicsSauce++
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


// ------------------------------------   Goose Code  ----------------------------

const test1 = document.getElementsByClassName('box1')[0];
const test2 = document.getElementsByClassName('box2')[0];
const test3 = document.getElementsByClassName('box3')[0];
const test4 = document.getElementsByClassName('box4')[0];

let countMain = countBasicsSauce + Math.round(countMeatIngredients) + Math.round(countNonMeatIngredients);

switch (countMain) {
    case 1:
    test1.classList.add('activePizza'); 
    break;

    case 2:
    test1.classList.add('activePizza'); 
    test2.classList.add('activePizza'); 
    break;

    case 3:
    test1.classList.add('activePizza'); 
    test2.classList.add('activePizza'); 
    test3.classList.add('activePizza'); 
    break;

    case 4:
    test1.classList.add('activePizza'); 
    test2.classList.add('activePizza'); 
    test3.classList.add('activePizza'); 
    test4.classList.add('activePizza');
    pizzaBuyClick()
    break;
}
// ---Установка обработчика при отображении 4 кусков---
function pizzaBuyClick () {
    const buyButton = document.querySelector('.buyBlock');
    buyButton.style.color = 'black'
    buyButton.addEventListener('click', () => {
        buyButton.classList.add('buy');
        setTimeout(() => {
            buyButton.classList.remove('buy')
        }, 100);        
    })
}
// ---Константы продуктов и их цен---
const product = [
    {
        neaplesDough: 3,
        romeDought: 4,
        sizilianDough: 6,
        classicDough: 7
    }, {
        salami: 7,
        chicken: 5,
        bacon: 4,
        pork: 3
    },{
        tomato: 2,
        cheese : 3,
        truffle: 8,
        mushrooms: 4
    },{
        mayoSauce: 1,
        tomatoSauce: 2,
        chesseSauce: 3,
        bbqSauce: 5
    }];
// ---Итоговый набор продуктов---
const pizzaComposition = {
    dough: null,
    meat: [],
    toppings: [],
    sauce: null,
};
// ---Внесение продуктов в итоговый список---
function selectProduct(categoryName, productName) {
    const categories = ['dough', 'meat', 'toppings', 'sauce'];
    const categoryIndex = categories.indexOf(categoryName);
    
    const price = product[categoryIndex][productName];
    
    switch (categoryName) {
        case 'dough':
        case 'sauce':
            pizzaComposition[categoryName] = { name: productName, price: price };
        break;

        case 'meat':
        case 'toppings':
            const selectedItems = pizzaComposition[categoryName];
            if (selectedItems.length >= 2) {
                console.error(`Можно выбрать не более 2-х вариантов в категории "${categoryName}"!`);
                return false;
            }
            selectedItems.push({ name: productName, price: price });
            break;

        default:
            return false;
        }

return true;
}

// selectProduct('dough', 'classicDough');
// selectProduct('meat', 'bacon');
// selectProduct('meat', 'pork');
// selectProduct('toppings', 'truffle');
// selectProduct('toppings', 'tomato');
// selectProduct('toppings', 'cheese');
// selectProduct('sauce', 'bbqSauce');

// console.log(pizzaComposition);

// ---Логика отображения цены---
function calcTotalPrice () {
    let sumPrice = 0;
    
    if(pizzaComposition.dough) {
        sumPrice += pizzaComposition.dough.price
    }
    
    if(pizzaComposition.sauce) {
        sumPrice += pizzaComposition.sauce.price
    }
    
    pizzaComposition.meat.forEach((elem) => {
        sumPrice += elem.price
    })
    
    pizzaComposition.toppings.forEach((elem) => {
        sumPrice += elem.price
    })
    
    return sumPrice
}

// ---Создание сообщения о составе пиццы и её цены---
// const finalWindowWrapper = document.querySelector('.endMessageWrapper');
// const finalWindow = document.createElement('div');
// finalWindow.classList.add('endWindow');
// finalWindowWrapper.append(finalWindow);

// const finalMessage = document.createElement('span');
// finalMessage.textContent = 'Заказ успешно оформлен';
// finalWindow.append(finalMessage);

// createCloseButton();

// ---Кнопка закрытия сообщения---
// function createCloseButton() {
//     const closeBtn = document.createElement('button');
//     closeBtn.innerHTML = '&times;';
//     closeBtn.classList.add('close-btn');
//     closeBtn.addEventListener('click', closeWindow);
//     finalWindow.prepend(closeBtn);
// }

// function closeWindow() {
//     const wrapper = document.querySelector('.endMessageWrapper');
//     wrapper.style.backgroundColor = 'transparent';
//     document.querySelector('.endWindow').remove();
// }