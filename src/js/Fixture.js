class Fixture
{
    static WIZARD = 'src/assets/tower_wizard.png';
    static BOMBER = 'src/assets/tower_bomber.png';
    static SHOOTER = 'src/assets/tower_shooter.png';
    RADIUS = 25;

    constructor(src, width, height)
    {
        this.src = src;
        this.width = width;
        this.height = height;
    }

    draw(context, position)
    {
        const image = new Image();
        image.src = this.src;

        context.translate(position.x, position.y);
        context.rotate(getRotationToObject({x: position.x, y: position.y, r: this.RADIUS}, mouse));
        context.translate( -position.x, -position.y);
        context.drawImage(image, position.x - this.width/2, position.y - this.height/2, this.width, this.height);
    }
}
