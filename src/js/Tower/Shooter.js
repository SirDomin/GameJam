class Shooter extends Tower
{
    constructor(position)
    {
        super(position, new Fixture(Fixture.SHOOTER, 50, 50));
    }
}
