package Bai02;

import java.util.ArrayList;

interface Observer {
    public void update(String message);
}

class Subcriber implements Observer {
    private String name;
    private Subject subject;

    public Subcriber(String name) {
        this.name = name;
    }

    @Override
    public void update(String message) {
        System.out.println(this.name + " : " + message);
    }
}

interface Subject {
    public void registerObsserver(Observer observer);
    public void unregisterObsserver(Observer observer);
    public void notifyObserver();
}

class MySubject implements Subject {
    private ArrayList<Observer> observers;
    private String message;

    public MySubject() {
        observers = new ArrayList<Observer>();
    }

    @Override
    public void registerObsserver(Observer observer) {
        observers.add(observer);
    }

    @Override
    public void unregisterObsserver(Observer observer) {
        observers.remove(observer);
    }

    @Override
    public void notifyObserver() {
        for (Observer observer : observers) {
            observer.update(message);
        }
    }

    public void postMessage(String message) {
        this.message = message;
        notifyObserver();
    }
}

public class Topic {
    public static void main(String[] args) {
        MySubject mySubject = new MySubject();

        Subcriber subcriber = new Subcriber("Subcriber");
        Subcriber subcriber2 = new Subcriber("Subcriber2");

        mySubject.registerObsserver(subcriber);
        mySubject.registerObsserver(subcriber2);

        mySubject.postMessage("thong bao moi");
    }
}
