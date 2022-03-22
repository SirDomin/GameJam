class Bullet {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.radius = r;
        this.velocity = getVelocityToObject({x: x, y: y, r: r}, mouse);
    }

    render(ctx)
    {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
    }

    update()
    {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}
