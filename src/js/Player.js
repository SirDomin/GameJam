class Player {
    towers;
    life;

    constructor() {
        this.towers = [];
        this.life = 10;
    }

    addTower(tower) {
        this.towers.push(tower);
    }

    renderTowers(ctx) {
        this.towers.forEach(function (tower) {
            ctx.save();
            tower.draw(ctx);
            ctx.restore();
        });
    }

    decreaseLife(power) {
        this.life-=power;
    }

    isAlive() {
        return this.life > 0;
    }
}
