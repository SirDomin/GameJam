//prepare canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const zoom = 1.5;
const gameSpeed = 10;

//fps help counter
let start = 0;

// adjust canvas to fit entire screen and zoom to scale
canvas.width = 1440 / zoom;
canvas.height = 820 / zoom;

let towerToPlaceColor = null;

//load image
const map = new Image();
map.src = 'src/assets/map.png';

//mouse object
const mouse = {
    x: 0,
    y: 0,
    r: 1,
}

let score = new Score();

//create event listener
canvas.addEventListener('enemyDead', event => {
    score.increase();
})

canvas.addEventListener('enemyEscaped', event => {
    score.decrease();
})

//create event listener
canvas.addEventListener('click', event => {
    handleTowerButton();
})

//update mouse on every change
canvas.addEventListener('mousemove', event => {
    mouse.x = (event.clientX - canvas.offsetLeft) / zoom;
    mouse.y = (event.clientY - canvas.offsetTop) / zoom;
})

// TODO: refactor to something more sophisticated
function determineDirection(enemy) {
    if (isInPosition(enemy.positionX, 435) && isInPosition(enemy.positionY, 50)) {
        enemy.direction = 'down';
    }
    if (isInPosition(enemy.positionX, 435) && isInPosition(enemy.positionY, 296)) {
        enemy.direction = 'left';
    }
    if (isInPosition(enemy.positionX, 73 )&& isInPosition(enemy.positionY, 296)) {
        enemy.direction = 'down';
    }
    if (isInPosition(enemy.positionX, 73 )&& isInPosition(enemy.positionY, 296)) {
        enemy.direction = 'down';
    }
    if (isInPosition(enemy.positionX, 73 )&& isInPosition(enemy.positionY, 470)) {
        enemy.direction = 'right';
    }
    if (isInPosition(enemy.positionX, 837) && isInPosition(enemy.positionY, 470)) {
        enemy.direction = 'up';
    }
}

function isInPosition(enemyPosition, position) {
    return enemyPosition >= position-gameSpeed/2 && enemyPosition <= position+gameSpeed/2;
}

function renderEnemies(enemies) {
    enemies.forEach(function (enemy) {
        determineDirection(enemy);
        enemy.move(gameSpeed);
        ctx.beginPath();
        ctx.arc(enemy.positionX, enemy.positionY, 10, 0, Math.PI*2, true);
        ctx.fillStyle = 'black';
        ctx.fill();
    })
}

let enemies = [];
enemies.push(new Enemy(-15, 50));

const interval = setInterval(function () {
    enemies.push(new Enemy(-15, 50));
}, 2000/gameSpeed);

let player = new Player();

player.addTower(new Bomber(new Position(185, 115)));
player.addTower(new Shooter(new Position(115, 115)));
player.addTower(new Wizard(new Position(245, 115)));

function drawTowerButton(type, positionX, positionY) {
    let towerButton = new Image();
    towerButton.src = 'src/assets/tower_'+type+'.png';
    ctx.drawImage(towerButton, canvas.width - positionX, canvas.height - positionY);
}

main = function() {
    //calculate FPS
    let now = performance.now();
    let fps = Math.round(1000 / (now - start));
    start = now;

    //clear whole canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //draw map
    ctx.drawImage(map, 0, 0, canvas.width - 100, canvas.height);

    player.renderTowers(ctx);

    //write text on canvas
    ctx.fillStyle = 'white';
    ctx.font = 'bold 20px serif';
    ctx.fillText(`FPS: ${fps}`, 10, 20);
    ctx.fillText(`score: ${score.get}`, canvas.width - 90, 20);
    ctx.fillText(`speed: ${gameSpeed}`, canvas.width - 90, 50);

    drawTowerButton('green', 90, 70);
    drawTowerButton('red', 90, 130);
    drawTowerButton('blue', 90, 190);

    renderEnemies(enemies);

    //game loop
    requestAnimationFrame(main);
}


function isButtonClicked(xx, xy, yx, yy) {
    return mouse.x >= canvas.width - xx && mouse.x <= canvas.width - xy &&
        mouse.y >= canvas.height - yx && mouse.y <= canvas.height - yy
    ;
}

function handleTowerButton() {
    if (towerToPlaceColor !== null) {
        player.addTower(new Tower(new Position(mouse.x, mouse.y), new Fixture('src/assets/tower_'+towerToPlaceColor+'.png', 50, 50)));
        towerToPlaceColor = null;
    }

    if (isButtonClicked(90, 40, 70, 20)) towerToPlaceColor = 'green';
    if (isButtonClicked(90, 40, 130, 80)) towerToPlaceColor = 'red';
    if (isButtonClicked(90, 40, 190, 140)) towerToPlaceColor = 'blue';
}

//get random value between 2 numbers
getRandomBetween = (minValue, maxValue) => { return Math.random() * (maxValue - minValue) + minValue }
getDistanceBetweenObjects = (object1, object2) => { return Math.sqrt(Math.pow(object2.x - object1.x,2) + Math.pow(object2.y - object1.y,2)) }
getRotationToObject = (object1, object2) => { return -Math.atan2((object1.y + object1.r / 2) - object2.y, object2.x - (object1.x + object1.r / 2)) }
getVelocityToObject = (object1, object2) => {
    return {
        x: Math.cos(Math.atan2((object1.y + object1.r / 2) - (object2.y), object2.x - (object1.x + object1.r / 2))),
        y: -1 * Math.sin(Math.atan2((object1.y + object1.r / 2) - (object2.y), object2.x - (object1.x + object1.r / 2)))
    }
}

main();
