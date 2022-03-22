class Bullet {
    constructor(x, y, r, tower) {
        this.x = x;
        this.y = y;
        this.radius = r;
        this.r = r;
        this.tower = tower;
        let enemy = findNearestEnemy(this.tower);
        this.velocity = {x: 1, y: 1};
        if (enemy) {
            this.velocity = getVelocityToObject(this.tower.position, enemy);
        }
    }

    render(ctx)
    {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
    }

    update(speed)
    {
        this.x += this.velocity.x * speed;
        this.y += this.velocity.y * speed;
    }
}
