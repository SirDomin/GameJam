class Bomber extends Tower
{
    constructor(position)
    {
        super(position, new Fixture(Fixture.BOMBER, 50, 50));
    }
}
