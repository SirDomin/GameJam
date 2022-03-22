class Enemy
{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 10;
        this.score = 10;
        this.life = 1;
        this.direction = 'right';
    }

    move(speed) {
        switch (this.direction) {
            case 'right': this.x+=speed; break;
            case 'left': this.x-=speed; break;
            case 'up': this.y-=speed; break;
            case 'down': this.y+=speed; break;
        }
    }
}
