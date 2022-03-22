class Tower
{
    constructor(position, image)
    {
        this.position = position;
        this.image = image;
    }

    draw(context) {
        this.image.draw(context, this.position);
    }
}