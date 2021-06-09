let canvas = document.getElementById("snake"); // importando o canvas
let context = canvas.getContext("2d"); // serve para criar o background
let box = 32;
let snake = []; // criar cobrinha como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos

// tamanho da snake
snake[0] ={
    x: 8 * box,
    y: 8 * box
}
let direction = "right"; // direção da snake

// array da comida 
let food ={

    // Math.floor retira a parte flutuante do Math.random
    // Math.random retorna um número aleatório até 1
    // vai gerar números aleatórios tirando a vírgula até o que setamos
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG(){
    context.fillStyle = "pink"; // cor do background
    context.fillRect(0, 0, 16*box, 16*box); // desenha o retângulo usando x e y e a largura e altura setadas
}

function criarCobrinha (){
    for(i = 0; i < snake.length; i++){ // se 0 for menor que o tamanho da snake vai aumentar o tamanho dela de 1 em 1
        context.fillStyle = "blue"; // cor da snake
        context.fillRect(snake[i].x, snake[i].y, box, box); // tamanho da snake
    }
}

function drawFood (){
    context.fillStyle = "#B5D50B"; // cor da fruta
    context.fillRect(food.x, food.y, box, box); // cordenadas da fruta
}

// quando um evento acontece, detecta e chama uma função
document.addEventListener('keydown', update);

function update(event){

    // se o número do código for tal e a diração for diferente de tal a snake vai para tal direção
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo(){    

    // se a cabeça da snake na posição x for maior que 15 e a direção for para direita ela vai receber o valor de 0 e vai aparecer do lado de 0 
    if(snake[0].x > 15*box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;

    // se a snake ultrapassar 15 e 0 de ponto negativo ela sumiria da tela
    if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;
    
    // se a cabeça se chocar com o corpo, o jogo vai acabar e vai dizer que é o fim do jogo
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over :(');
        }
    }

    // chamando as funções
    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x; // array na posição 0, x
    let snakeY = snake[0].y; // array na posiçao 0, y

    // se a snake tiver em tal posição vai adicionar um quadrado a ela ou diminuir
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    // caso a posição de snakeX seja diferente de food.x e a posição de snakeY for diferente de food.y
    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); // pop tira o último elemento da lista
    }else{ // caso contrário ela vai continuar aumentando e gerar números aleatórios
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
    }
    
    let newHead ={
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); // método unshift adiciona como primeiro quadradinho da cobrinha
}

let jogo = setInterval(iniciarJogo, 100); // a cada 100 milisegundos a função vai ser renovada