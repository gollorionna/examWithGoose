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

const sumPrice = 0;

const totalPrice = document.querySelector('.totalPrice')
totalPrice.textContent = sumPrice

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
    id: 'mayou',
    price: 1,
    id: 'tomato',
    price: 2,
    chesseSauce: 3,
    bbqSauce: 5
}];


const pizzaComposition = {
    dough: null,
    meat1: null,
    meat2: null,
    toppings1: null,
    toppings2: null,
    sauce: null,
};

function selectProduct(category, productName) {
    const categories = ['dough', 'meat1', 'meat2','toppings1','toppings2', 'sauce'];
    const categoryIndex = categories.indexOf(category);
    
    // Проверка на несуществующую категорию
    if (categoryIndex === -1) {
        console.error(`Категория "${category}" не найдена!`);
        return false;
    }

    const price = product[categoryIndex][productName];
    
    // Проверка на несуществующий продукт
    if (price === undefined) {
        console.error(`Продукт "${productName}" не найден в категории "${category}"!`);
        return false;
    }

    // Сохраняем продукт и его цену
    pizzaComposition[category] = {
        name: productName,
        price: price
    };

    return true;
}

selectProduct('dough', 'classicDough');
selectProduct('meat1', 'bacon');
selectProduct('meat2', 'pork');
selectProduct('toppings1', 'truffle');
selectProduct('sauce', 'bbqSauce');

console.log(pizzaComposition);



