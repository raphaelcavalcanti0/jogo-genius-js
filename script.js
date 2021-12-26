let order = [];
let clickedOrder = [];
let score = 0;

// 0 = green
// 1 = red
// 2 = yellow
// 3 = blue

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const green = document.querySelector('.green');

// Cria ordem aleatória de cores.
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = []

    for (let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, +i + 1);
    }
 
}

// Acende a próxima cor.
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);
    setTimeout(() => {
        element.classList.remove('selected');
    });
}

// Verifica se os botões clicados são os mesmos gerados aleatoriamente.
let checkOrder = () => {
    for (let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if (clickedOrder.length == order.length) {
        alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`)
        nextLevel();
    }
}

// Click do jogador
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    if (!createColorElement(color).classList.contains('selected')) {
        createColorElement(color).classList.add('selected');
        checkOrder();
    }

    setTimeout(() => {
        if (createColorElement(color).classList.contains('selected')) {
            createColorElement(color).classList.remove('selected');
        }
        checkOrder();
    }, 150);
}

let createColorElement = (color) => {
    if (color == 0) {
        return green;
    } else if (color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

let gameOver = () => {
    alert(`Pontuação: ${score}\nVocê perdeu o jogo! Clique em OK para iniciar outro jogo!`)
    order = [];
    clickedOrder = [];
    playGame();
}

let nextLevel = () => {
    score++;
    shuffleOrder();
}

let playGame = () => {
    alert(`Bem vindo ao Genius! Iniciando novo jogo!`)
    score = 0;
    nextLevel();
}

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

playGame();
