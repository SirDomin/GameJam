class Player {
    towers;

    constructor() {
        this.towers = [];
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
}
