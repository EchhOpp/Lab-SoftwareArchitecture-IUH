package Bai01;

interface Book {
    public void muonSach();
}

class BookBasic implements Book {
    @Override
    public void muonSach() {
        System.out.println("Muon Sach co ban");
    }
}

class BookDecorator implements Book {
    protected Book book;

    public BookDecorator(Book book) {
        this.book = book;
    }

    @Override
    public void muonSach() {
        book.muonSach();
    }
}

class giaHanSach extends BookDecorator {
    public giaHanSach(Book book) {
        super(book);
    }

    @Override
    public void muonSach() {
        book.muonSach();
        System.out.println("Co gia han them thoi gian");
    }
}

class muonSachDacBiet extends BookDecorator {
    public muonSachDacBiet(Book book) {
        super(book);
    }

    @Override
    public void muonSach() {
        book.muonSach();
        System.out.println("Co muon Sach dac biet");
    }
}

public class Library {
    public static void main(String[] args) {
        Book book = new BookBasic();

        BookDecorator giaHanSach = new giaHanSach(book);
        BookDecorator muonSachDacBiet = new muonSachDacBiet(giaHanSach);

        muonSachDacBiet.muonSach();
    }
}
