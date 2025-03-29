import java.util.ArrayList;

interface Subject {
    public void register(Observer observer);
    public void unregister(Observer observer);
    public void notifyObservers();
    public Object getUpdate();
}

interface Observer {
    public void update();
    public void setSubject(Subject subject);
}

class ThiTruong implements Subject {
    private ArrayList<Observer> observers;
    private String update;
    private boolean changed;

    public ThiTruong() {
        observers = new ArrayList<>();
    }

    @Override
    public void register(Observer observer) {
        observers.add(observer);
    }

    @Override
    public void unregister(Observer observer) {
        observers.remove(observer);
    }

    @Override
    public void notifyObservers() {
        if(!changed){
            System.out.println("Chua co thay doi");
            return;
        }
        for(Observer observer : observers){
            observer.update();
        }
        changed = false;
    }

    @Override
    public Object getUpdate() {
        return this.update;
    }

    public void post(String update) {
        this.update = update;
        changed = true;
        notifyObservers();
    }
}

class NguoiMua implements Observer {
    private Subject subject;
    private String name;

    public NguoiMua(String name) {
        this.name = name;
    };

    @Override
    public void update() {
        String mess =(String) subject.getUpdate();
        if(mess != null){
            System.out.println(mess);
        } else {
            System.out.println("Khong thay doi");
        }

    }

    @Override
    public void setSubject(Subject subject) {
        this.subject = subject;
    }
}

public class NewsPublisher {
    public static void main(String[] args) {
        ThiTruong subject = new ThiTruong();

        NguoiMua mua1 = new NguoiMua("A");
        NguoiMua mua2 = new NguoiMua("B");

        subject.register(mua1);
        subject.register(mua2);

        mua1.setSubject(subject);
        mua2.setSubject(subject);

        subject.post("Gia thay doi");
    }
}