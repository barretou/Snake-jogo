let canvas = document.getElementById("snake");
let context = canvas.getContext("2d"); //renderizando em 2D
let box = 32;//tamanho de um box (box = 32px)
let snake = [];
snake[0]= { //criando o array que contem a cobra
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
//gera numeros aleatórios com o math.ranom e o math.floor retira as casas decimais
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box

}

function criarBG(){ //criando background
    context.fillStyle = "lightgreen"; //estiliza o retangulo
    context.fillRect(0, 0, 16 * box, 16 * box); //desenha o retângulo
}
function criarCobrinha(){
    for(i=0; i<snake.length;i++){
        context.fillStyle = "green"; //cor da cobrinha
        context.fillRect(snake[i].x, snake[i].y, box, box);//tamanho que a cobrinha vai ter
    }
}
function drawFood(){
    context.fillStyle = "red"; //cor da comida
    context.fillRect(food.x, food.y, box, box);//tamanho e local da comida
}

document.addEventListener('keydown', update);//captura os comandos de tecla
    function update(event){//de acordo com o comando acionado, a cobrinha assume as seguintes direções

    //Define as direçoes da cobrinha

    if(event.keyCode == 37 && direction !="right") direction = "left";
    if(event.keyCode == 38 && direction !="down") direction = "up";
    if(event.keyCode == 39 && direction !="left") direction = "right";
    if(event.keyCode == 40 && direction !="up") direction = "down";
    }

function iniciarJogo(){
    //Define que a cobrinha pode passar os limites do retangulo e aparecer do outro lado
    if(snake[0].x > 15 * box && direction == "right")snake[0].x=0;
    if(snake[0].x < 0 && direction == "left")snake[0].x=16 * box;
    if(snake[0].y > 15 * box && direction == "down")snake[0].y=0;
    if(snake[0].y < 0 && direction == "up")snake[0].y=16 * box;

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("Fim de jogo :(");
        }
    }
    //chamando as funçoes
    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;//posição de inicialização em x
    let snakeY = snake[0].y;//posição de inicialização em y

    
    

    if(direction=="right")snakeX += box;
    if(direction=="left")snakeX -= box;
    if(direction=="up")snakeY -= box;
    if(direction=="down")snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();//retira o ultimo elemento da cobrinha
/*criando a cabeça da cobrinha na direção na qual ela se mover*/
    }
    else{food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }
//direciona a cabeça da cobra e adiciona o incremento
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo,100); //intervalo de 100ms para renovação do jogo