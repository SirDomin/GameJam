class Enemy
{
    constructor(positionX, positionY) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.score = 10;
        this.life = 1;
        this.direction = 'right';
    }

    move(speed) {
        switch (this.direction) {
            case 'right': this.positionX+=speed; break;
            case 'left': this.positionX-=speed; break;
            case 'up': this.positionY-=speed; break;
            case 'down': this.positionY+=speed; break;
        }
    }
}
