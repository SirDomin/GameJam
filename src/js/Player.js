class Player {
    constructor() {
        this.towerGreen = new Image();
        this.towerGreen.src = 'src/assets/tower_green.png';
    }

    radius = 25;
    towerGreen;

    renderTower(positionX, positionY) {
        ctx.save();
        ctx.translate(positionX, positionY);
        ctx.rotate(getRotationToObject({x: positionX, y: positionY, r: this.radius}, mouse));
        ctx.translate( -positionX, -positionY);
        ctx.drawImage(this.towerGreen, positionX - this.radius, positionY - this.radius, this.radius * 2, this.radius * 2);
        ctx.restore();
    }
}
