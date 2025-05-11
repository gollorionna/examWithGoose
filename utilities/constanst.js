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

const pizzaComposition = {
    dough: null,
    meat: null,
    toppings: null,
    sauce: null,
};

function selectProduct(category, productName) {
    const categories = ['dough', 'meat', 'toppings', 'sauce'];
    const categoryIndex = categories.indexOf(category);
    
    // Проверка на несуществующую категорию
    if (categoryIndex === -1) {
        console.error(`Категория "${category}" не найдена!`);
        return false;
    }

    const price = products[categoryIndex][productName];
    
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
selectProduct('meat', 'bacon');
selectProduct('meat', 'pork');
selectProduct('toppings', 'truffle');
selectProduct('sauce', 'bbqSauce');


const sumPrice = 0;


