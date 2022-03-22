class TowerFactory
{
    static create(type, x, y)
    {
        if (type === TowerType.BOMBER) {
            return new Bomber(new Position(x, y));
        }

        if (type === TowerType.WIZARD) {
            return new Wizard(new Position(x, y));
        }

        return new Shooter(new Position(x, y));
    }
}
