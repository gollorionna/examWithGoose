// Константы и переменные
const ingredients = document.getElementsByClassName('ing');
const column_1 = document.getElementById('column_1');
const column_2 = document.getElementById('column_2');
const column_3 = document.getElementById('column_3');
const column_4 = document.getElementById('column_4');
const ingWrapper = document.getElementById('ingredientBlock');
const test1 = document.querySelector('.box1');
const test2 = document.querySelector('.box2');
const test3 = document.querySelector('.box3');
const test4 = document.querySelector('.box4');
const totalPriceElement = document.querySelector('.totalPrice');
const buyButton = document.querySelector('.buyBlock');

let countBasicsSauce = 0;
let countMeatIngredients = 0;
let countNonMeatIngredients = 0;

const LIMITS = {
    basics: 1,
    meats: 2,
    nonMeats: 2,
    sauces: 1
};

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
        cheese: 3,
        truffle: 8,
        mushrooms: 4
    },{
        mayoSauce: 1,
        tomatoSauce: 2,
        chesseSauce: 3,
        bbqSauce: 5
    }
];

const pizzaComposition = {
    dough: null,
    meat: [],
    toppings: [],
    sauce: null,
};

// Инициализация событий
column_1.addEventListener('click', handleBasicIngredient);
column_2.addEventListener('click', handleMeatIngredient);
column_3.addEventListener('click', handleNonMeatIngredient);
column_4.addEventListener('click', handleSauceIngredient);

// Основные функции
function changeMainCount() {
    return countBasicsSauce + Math.round(countMeatIngredients) + Math.round(countNonMeatIngredients);
}

function countPizzaImgAmount(countMain) {
    // Сброс всех активных классов
    [test1, test2, test3, test4].forEach(box => box.classList.remove('activePizza'));

    // Если нет ингредиентов - полностью скрываем пиццу
    if (countMain === 0) return;

    // Показываем нужное количество кусочков
    if (countMain >= 1) test1.classList.add('activePizza');
    if (countMain >= 2) test2.classList.add('activePizza');
    if (countMain >= 3) test3.classList.add('activePizza');
    if (countMain >= 4) {
        test4.classList.add('activePizza');
        enableOrderButton();
    } else {
        buyButton.style.color = 'grey';
    }
}

function handleBasicIngredient(event) {
    if (!event.target.classList.contains('ing')) return;
    
    const selectedBasics = document.querySelectorAll('.choseBasics');
    if (selectedBasics.length >= LIMITS.basics) {
        alert(`Нельзя выбирать больше ${LIMITS.basics} основы`);
        return;
    }

    event.target.classList.add('choseBasics');
    event.target.style.color = 'red';
    countBasicsSauce++;
    
    addToOrder(event.target);
    updatePrice();
    countPizzaImgAmount(changeMainCount());
}

function handleMeatIngredient(event) {
    if (!event.target.classList.contains('ing')) return;
    
    const selectedMeat = document.querySelectorAll('.choseMeat');
    if (selectedMeat.length >= LIMITS.meats) {
        alert(`Нельзя выбирать больше ${LIMITS.meats} мясных ингредиентов`);
        return;
    }

    event.target.classList.add('choseMeat');
    event.target.style.color = 'red';
    addToOrder(event.target);
    countMeatIngredients += 0.6;
    updatePrice();
    countPizzaImgAmount(changeMainCount());
}

function handleNonMeatIngredient(event) {
    if (!event.target.classList.contains('ing')) return;
    
    const selectedNonMeats = document.querySelectorAll('.choseNonMeat');
    if (selectedNonMeats.length >= LIMITS.nonMeats) {
        alert(`Нельзя выбирать больше ${LIMITS.nonMeats} овощей/сыра`);
        return;
    }

    event.target.classList.add('choseNonMeat');
    event.target.style.color = 'red';
    addToOrder(event.target);
    countNonMeatIngredients += 0.6;
    updatePrice();
    countPizzaImgAmount(changeMainCount());
}

function handleSauceIngredient(event) {
    if (!event.target.classList.contains('ing')) return;
    
    const selectedSauce = document.querySelectorAll('.choseSauce');
    if (selectedSauce.length >= LIMITS.sauces) {
        alert(`Нельзя выбирать больше ${LIMITS.sauces} соуса`);
        return;
    }
    
    event.target.classList.add('choseSauce');
    event.target.style.color = 'red';
    addToOrder(event.target);
    countBasicsSauce++;
    updatePrice();
    countPizzaImgAmount(changeMainCount());
}

function addToOrder(ingredientElement) {
    let name_order = ingredientElement.textContent;
    let category;
    let productName;
    
    if (ingredientElement.classList.contains('choseBasics')) {
        category = 'basics';
        productName = getProductName('dough', name_order);
        selectProduct('dough', productName);
    } 
    else if (ingredientElement.classList.contains('choseMeat')) {
        category = 'meats';
        productName = getProductName('meat', name_order);
        selectProduct('meat', productName);
    }
    else if (ingredientElement.classList.contains('choseNonMeat')) {
        category = 'nonMeats';
        productName = getProductName('toppings', name_order);
        selectProduct('toppings', productName);
    }
    else if (ingredientElement.classList.contains('choseSauce')) {
        category = 'sauces';
        productName = getProductName('sauce', name_order);
        selectProduct('sauce', productName);
    }

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

    new_ingredient.querySelector('.btn_remove').addEventListener('click', removeFromOrder);
}

function getProductName(category, displayName) {
    const mapping = {
        dough: {
            'Неапольская': 'neaplesDough',
            'Римская': 'romeDought',
            'Сицилийская': 'sizilianDough',
            'Классическая': 'classicDough'
        },
        meat: {
            'Салями': 'salami',
            'Курица': 'chicken',
            'Бекон': 'bacon',
            'Свинина': 'pork'
        },
        toppings: {
            'Помидоры': 'tomato',
            'Сыр пармезан': 'cheese',
            'Трюфель': 'truffle',
            'Грибы': 'mushrooms'
        },
        sauce: {
            'Майонез': 'mayoSauce',
            'Кетчуп': 'tomatoSauce',
            'Сырный': 'chesseSauce',
            'Барбекю': 'bbqSauce'
        }
    };
    
    return mapping[category][displayName];
}

function removeFromOrder(event) {
    const btn_remove = event.target;
    const btn_remove_parent = btn_remove.parentElement;
    const name_order = btn_remove_parent.querySelector('.name').textContent;

    const allIngredients = document.querySelectorAll('.ing');
    allIngredients.forEach(ing => {
        if (ing.textContent === name_order) {
            ing.classList.remove('choseBasics', 'choseMeat', 'choseNonMeat', 'choseSauce');
            ing.style.color = 'black';
            
            if (ing.classList.contains('choseBasics')) {
                countBasicsSauce--;
                pizzaComposition.dough = null;
            } else if (ing.classList.contains('choseMeat')) {
                countMeatIngredients = Math.max(0, countMeatIngredients - 0.6);
                const productName = getProductName('meat', name_order);
                pizzaComposition.meat = pizzaComposition.meat.filter(item => item.name !== productName);
            } else if (ing.classList.contains('choseNonMeat')) {
                countNonMeatIngredients = Math.max(0, countNonMeatIngredients - 0.6);
                const productName = getProductName('toppings', name_order);
                pizzaComposition.toppings = pizzaComposition.toppings.filter(item => item.name !== productName);
            } else if (ing.classList.contains('choseSauce')) {
                countBasicsSauce--;
                pizzaComposition.sauce = null;
            }
        }
    });
    
    btn_remove_parent.remove();
    updatePrice();
    countPizzaImgAmount(changeMainCount());
}

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

function updatePrice() {
    const totalPrice = calcTotalPrice();
    totalPriceElement.textContent = totalPrice || '0'; // Гарантированно показываем 0 если цена null/undefined
}

function calcTotalPrice() {
    let sumPrice = 0;
    
    if(pizzaComposition.dough) {
        sumPrice += pizzaComposition.dough.price;
    }
    
    if(pizzaComposition.sauce) {
        sumPrice += pizzaComposition.sauce.price;
    }
    
    pizzaComposition.meat.forEach((elem) => {
        sumPrice += elem.price;
    });
    
    pizzaComposition.toppings.forEach((elem) => {
        sumPrice += elem.price;
    });
    
    return sumPrice;
}

function enableOrderButton() {
    buyButton.style.color = 'black';
    buyButton.onclick = function() {
        buyButton.classList.add('buy');
        setTimeout(() => {
            buyButton.classList.remove('buy');
            alert(`Ваша пицца заказана, её цена составит: ${calcTotalPrice()}$. Спасибо что выбрали нас.`);
        }, 100);        
    };
}