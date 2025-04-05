package Bai01;

import java.util.ArrayList;
import java.util.List;

interface Observer {
    public void update(float price);
}
class nguoinhanthongbao implements Observer {
    private String name;

    public nguoinhanthongbao(String name) {
        this.name = name;
    }

    @Override
    public void update(float price) {
        System.out.println(name + " nhan duoc gia co phieu la: " + price);
    }
}

interface Subject {
    public void addObserver(Observer observer);
    public void deleteObserver(Observer observer);
    public void notifyObservers();
}

class nguoithongbao implements Subject {
    private List<Observer> observers;
    private float price;

    nguoithongbao() {
        observers = new ArrayList<Observer>();
    }

    @Override
    public void addObserver(Observer observer) {
        observers.add(observer);
    }

    @Override
    public void deleteObserver(Observer observer) {
        observers.remove(observer);
    }

    @Override
    public void notifyObservers() {
        for(Observer observer : observers) {
            observer.update(price);
        }
    }

    public void postMessage(float price) {
        this.price = price;
        notifyObservers();
    }
}

public class CoPhieu {
    public static void main(String[] args) {
        nguoithongbao subject = new nguoithongbao();

        Observer observer = new nguoinhanthongbao("ALuan");
        Observer observer1 = new nguoinhanthongbao("BLuan");

        subject.addObserver(observer);
        subject.addObserver(observer1);

        subject.postMessage(12);
    }
}