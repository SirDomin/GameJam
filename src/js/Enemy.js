class Enemy
{
    constructor(positionX, positionY) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.score = 10;
        this.life = 1;
    }

    moveRight() {
        this.positionX++;
    }
}
