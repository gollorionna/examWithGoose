// ---Логика отображения пиццы---
let countBasicsSauce = 2;
let countMeatIngredients = 0.6;
let countNonMeatIngredients = 0.6;

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
function selectProduct(category, productName) {
    const categories = ['dough', 'meat', 'toppings', 'sauce'];
    const categoryIndex = categories.indexOf(category);
    
    const price = product[categoryIndex][productName];
    
    switch (category) {
        case 'dough':
        case 'sauce':
            pizzaComposition[category] = { name: productName, price: price };
        break;

        case 'meat':
        case 'toppings':
            const selectedItems = pizzaComposition[category];
            if (selectedItems.length >= 2) {
                console.error(`Можно выбрать не более 2-х вариантов в категории "${category}"!`);
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
const finalWindow = document.createElement('div');
finalWindow.classList.add('endWindow');
const finalWindowWrapper = document.querySelector('.endMessageWrapper').append(finalWindow);

const finalMessage = document.createElement('span');
finalMessage.textContent = 'Заказ успешно оформлен';
finalWindow.append(finalMessage);

createCloseButton();

// ---Кнопка закрытия сообщения---
function createCloseButton() {
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;'; 
    closeBtn.classList.add('close-btn'); 
    closeBtn.addEventListener('click', closeWindow);
    finalWindow.prepend(closeBtn);
}

function closeWindow() {
    document.querySelector('.endWindow').remove('.endWindow');
    finalWindowWrapper.style.backgroundColor = 'none'; 
}






