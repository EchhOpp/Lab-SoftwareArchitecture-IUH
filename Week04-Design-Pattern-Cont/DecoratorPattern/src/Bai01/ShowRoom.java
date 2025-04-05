package Bai01;

interface Car{
    public void assemble();
}

class CarBasic implements Car{
    public void assemble() {
        System.out.println("CarBasic assemble");
    }
}

class CarDecorator implements Car{
    protected Car car;

    public CarDecorator(Car car) {
        this.car = car;
    }

    @Override
    public void assemble() {
        this.car.assemble();
    }
}

class CarLuxury extends CarDecorator{
    public CarLuxury(Car car) {
        super(car);
    }
    @Override
    public void assemble() {
        super.assemble();
        System.out.println("CarLuxury assemble");
    }
}

class CarSport extends CarDecorator{
    public CarSport(Car car) {
        super(car);
    }
    @Override
    public void assemble() {
        super.assemble();
        System.out.println("CarSport assemble");
    }
}

public class ShowRoom {
    public static void main(String[] args) {
        Car car = new CarBasic();

        CarSport carSport = new CarSport(car);

        CarLuxury carLuxury = new CarLuxury(carSport);
        carLuxury.assemble();
    }
}
