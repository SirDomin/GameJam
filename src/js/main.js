//prepare canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const zoom = 1.5;

//fps help counter
let start = 0;

// adjust canvas to fit entire screen and zoom to scale
canvas.width = 1440 / zoom;
canvas.height = 820 / zoom;

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
    score.add();
})

//create event listener
canvas.addEventListener('click', event => {
})

//update mouse on every change
canvas.addEventListener('mousemove', event => {
    mouse.x = (event.clientX - canvas.offsetLeft) / zoom;
    mouse.y = (event.clientY - canvas.offsetTop) / zoom;
})

// TODO: refactor to something more sophisticated
function determineDirection(enemy) {
    if (enemy.positionX === 435 && enemy.positionY === 50) {
        enemy.direction = 'down';
    }
    if (enemy.positionX === 435 && enemy.positionY === 296) {
        enemy.direction = 'left';
    }
    if (enemy.positionX === 73 && enemy.positionY === 296) {
        enemy.direction = 'down';
    }
    if (enemy.positionX === 73 && enemy.positionY === 296) {
        enemy.direction = 'down';
    }
    if (enemy.positionX === 73 && enemy.positionY === 470) {
        enemy.direction = 'right';
    }
    if (enemy.positionX === 837 && enemy.positionY === 470) {
        enemy.direction = 'up';
    }
}

function renderEnemies(enemies) {
    enemies.forEach(function (enemy) {
        determineDirection(enemy);
        enemy.move(1);
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
}, 2000);

let player = new Player();

main = function() {
    //calculate FPS
    let now = performance.now();
    let fps = Math.round(1000 / (now - start));
    start = now;

    //clear whole canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //draw map
    ctx.drawImage(map, 0, 0, canvas.width - 100, canvas.height);

    player.addTower(new Bomber(new Position(185, 115)));
    player.addTower(new Shooter(new Position(115, 115)));
    player.addTower(new Wizard(new Position(245, 115)));

    player.renderTowers(ctx);

    //write text on canvas
    ctx.fillStyle = 'white';
    ctx.font = 'bold 20px serif';
    ctx.fillText(`FPS: ${fps}`, 10, 20);
    ctx.fillText(`score: ${score.get}`, canvas.width - 90, 20);

    renderEnemies(enemies);

    //game loop
    requestAnimationFrame(main);
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
