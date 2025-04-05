import javax.naming.Context;

interface OrderState {
    public void next();
    public void cancel();
    public void refund();
    public String getState();
}

class ContextOder {
    private OrderState state;

    public ContextOder() {
        this.state = new choXN(this);
    }

    public void setState(OrderState state) {
        this.state = state;
    }

    public void next() {
        this.state.next();
    }
    public void cancel() {
        this.state.cancel();
    }
    public void refund() {
        this.state.refund();
    }

    public String getState() {
        return this.state.getState();
    }
}

class choXN implements OrderState {
    private ContextOder context;

    public choXN(ContextOder context) {
        this.context = context;
    }

    @Override
    public void next() {
        context.setState(new ChoLay(context));
    }

    @Override
    public void cancel() {
        System.out.println("Khong the duoc luc nay");
    }

    @Override
    public void refund() {
        System.out.println("Khong the duoc luc nay");
    }

    @Override
    public String getState() {
        return "Cho xac nhan";
    }
}

class ChoLay implements OrderState {
    private ContextOder context;

    public ChoLay(ContextOder context) {
        this.context = context;
    }

    @Override
    public void next() {
        context.setState(new DangGiao(context));
    }

    @Override
    public void cancel() {
        context.setState(new DaHuy(context));
    }

    @Override
    public void refund() {
        System.out.println("Khong the duoc luc nay");
    }

    @Override
    public String getState() {
        return "Cho lay hang";
    }
}

class DaHuy implements OrderState {
    private ContextOder context;

    public DaHuy(ContextOder context) {
        this.context = context;
    }


    @Override
    public void next() {
        System.out.println("Khong the duoc luc nay");
    }

    @Override
    public void cancel() {
        System.out.println("Khong the duoc luc nay");
    }

    @Override
    public void refund() {
        System.out.println("Khong the duoc luc nay");
    }

    @Override
    public String getState() {
        return "Da huy";
    }
}

class DangGiao implements OrderState {
    private ContextOder context;

    public DangGiao(ContextOder context) {
        this.context = context;
    }

    @Override
    public void next() {
        context.setState(new DaGiao(context));
    }

    @Override
    public void cancel() {
        System.out.println("Khong the duoc luc nay");
    }

    @Override
    public void refund() {
        System.out.println("Khong the duoc luc nay");
    }

    @Override
    public String getState() {
        return "Trang thai giao hang";
    }
}

class DaGiao implements OrderState {
    private ContextOder context;

    public  DaGiao(ContextOder context) {
        this.context = context;
    }

    @Override
    public void next() {
        System.out.println("Khong the duoc luc nay");
    }

    @Override
    public void cancel() {
        System.out.println("Khong the duoc luc nay");
    }

    @Override
    public void refund() {
        context.setState(new HoanTien(context));
    }

    @Override
    public String getState() {
        return "Da giao";
    }
}

class HoanTien implements OrderState {
    private ContextOder context;

    public HoanTien(ContextOder context) {
        this.context = context;
    }


    @Override
    public void next() {
        System.out.println("Khong the duoc luc nay");
    }

    @Override
    public void cancel() {
        System.out.println("Khong the duoc luc nay");
    }

    @Override
    public void refund() {
        System.out.println("Khong the duoc luc nay");
    }

    @Override
    public String getState() {
        return "Hoa tien";
    }
}

public class Buy {
    public static void main(String[] args) {
        ContextOder contextOder = new ContextOder();

        System.out.println(contextOder.getState());
        contextOder.next();
        System.out.println(contextOder.getState());
        contextOder.next();
        System.out.println(contextOder.getState());
        contextOder.next();
        System.out.println(contextOder.getState());

    }
}
