//prepare canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const zoom = 1.5;
const gameSpeed = 2;

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
    player.decreaseLife(1);
    if (!player.isAlive()) {
        gameOver();
    }
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
    if (isInPosition(enemy.x, 435) && isInPosition(enemy.y, 50)) {
        enemy.direction = 'down';
    }
    if (isInPosition(enemy.x, 435) && isInPosition(enemy.y, 296)) {
        enemy.direction = 'left';
    }
    if (isInPosition(enemy.x, 73 )&& isInPosition(enemy.y, 296)) {
        enemy.direction = 'down';
    }
    if (isInPosition(enemy.x, 73 )&& isInPosition(enemy.y, 296)) {
        enemy.direction = 'down';
    }
    if (isInPosition(enemy.x, 73 )&& isInPosition(enemy.y, 470)) {
        enemy.direction = 'right';
    }
    if (isInPosition(enemy.x, 837) && isInPosition(enemy.y, 470)) {
        enemy.direction = 'up';
    }
}

function isInPosition(enemyPosition, position) {
    return enemyPosition >= position-gameSpeed/2 && enemyPosition <= position+gameSpeed/2;
}

function gameOver() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = 'bold 100px serif';
    ctx.fillText('GAME OVER', 10, 100);
}

function hitPlayer(enemy) {
    if (enemy.y < 0) {
        canvas.dispatchEvent(new Event('enemyEscaped'));
    }
}

function renderEnemies(enemies) {
    enemies.forEach(function (enemy) {
        determineDirection(enemy);
        hitPlayer(enemy);
        enemy.move(gameSpeed);
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, enemy.r, 0, Math.PI*2, true);
        ctx.fillStyle = 'black';
        ctx.fill();
    })
}

renderBullet = () => {
    setInterval(() => {
        player.towers.forEach((tower) => {
            bullets.push(new Bullet(tower.position.x, tower.position.y, 5, tower));
        })
    }, 1000 / gameSpeed)
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

let bullets = [];

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

    bullets.forEach((bullet, index) => {
        if (bullet.x > canvas.width || bullet.y > canvas.height || bullet.x < 0 || bullet.y < 0) {
            bullets.splice(index, 1);
        }
    })

    bullets.forEach((bullet) => {
        bullet.update(gameSpeed);
        bullet.render(ctx)
    })

    //write text on canvas
    ctx.fillStyle = 'white';
    ctx.font = 'bold 20px serif';
    ctx.fillText(`FPS: ${fps}`, 10, 20);
    ctx.fillText(`score: ${score.get}`, canvas.width - 90, 20);
    ctx.fillText(`speed: ${gameSpeed}`, canvas.width - 90, 50);
    ctx.fillText(`life: ${player.life}`, canvas.width - 90, 80);

    drawTowerButton(TowerType.BOMBER, 90, 70);
    drawTowerButton(TowerType.WIZARD, 90, 130);
    drawTowerButton(TowerType.SHOOTER, 90, 190);

    renderEnemies(enemies);

    if (player.isAlive()) {
        requestAnimationFrame(main);
    }
}


function isButtonClicked(xx, xy, yx, yy) {
    return mouse.x >= canvas.width - xx && mouse.x <= canvas.width - xy &&
        mouse.y >= canvas.height - yx && mouse.y <= canvas.height - yy
    ;
}

function handleTowerButton() {
    if (towerToPlaceColor !== null) {
        player.addTower(TowerFactory.create(towerToPlaceColor, mouse.x, mouse.y))
        towerToPlaceColor = null;
    }

    if (isButtonClicked(90, 40, 190, 140)) towerToPlaceColor = TowerType.SHOOTER;
    if (isButtonClicked(90, 40, 130, 80)) towerToPlaceColor = TowerType.WIZARD;
    if (isButtonClicked(90, 40, 70, 20)) towerToPlaceColor = TowerType.BOMBER;
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

findNearestEnemy = (tower) => {
    let closest = 1000;
    let closestEnemy = null;

    enemies.forEach((enemy) => {
        let distance = getDistanceBetweenObjects(tower.position, enemy);

        if (distance < closest) {
            closest = distance;
            closestEnemy = enemy;
        }
    })

    return closestEnemy;
}

main();
renderBullet();
