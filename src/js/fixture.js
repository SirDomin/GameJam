class Fixture
{
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

        context.drawImage(image, position.x, position.y, this.width, this.height);
    }
}