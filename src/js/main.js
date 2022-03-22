//prepare canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const zoom = 1.5;

//fps help counter
let start = 0;

// adjust canvas to fit entire screen and zoom to scale
canvas.width = window.innerWidth / zoom
canvas.height = window.innerHeight / zoom;

//load image
const map = new Image();
map.src = 'src/assets/map.png';

const towerGreen = new Image();
towerGreen.src = 'src/assets/tower_green.png';

//mouse object
const mouse = {
    x: 0,
    y: 0,
    r: 1,
}

//create event listener
canvas.addEventListener('click', event => {

})

//update mouse on every change
canvas.addEventListener('mousemove', event => {
    mouse.x = (event.clientX - canvas.offsetLeft) / zoom;
    mouse.y = (event.clientY - canvas.offsetTop) / zoom;
})

function renderEnemies(enemies) {
    enemies.forEach(function (enemy) {
        enemy.moveRight();
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

main = function() {
    //calculate FPS
    let now = performance.now();
    let fps = Math.round(1000 / (now - start));
    start = now;

    //clear whole canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //draw map
    ctx.drawImage(map, 0, 0, canvas.width - 100, canvas.height);

    //rotate object to face other object
    ctx.save();
    ctx.translate(100, 100);
    ctx.rotate(getRotationToObject({x: 100, y: 100, r: 25}, mouse));
    ctx.translate( -100, -100);
    ctx.drawImage(towerGreen, 75,75,50,50);
    ctx.restore();

    //write text on canvas
    ctx.fillStyle = 'white';
    ctx.font = 'bold 20px serif';
    ctx.fillText(`FPS: ${fps}`, 10, 20);

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
