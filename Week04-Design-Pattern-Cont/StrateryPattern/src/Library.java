
interface Search {
    public void search(String keyword);
}

class TimTheoTen implements Search {
    @Override
    public void search(String keyword) {
        System.out.println("Searching follow name: " + keyword);
    }
}

class TimTheoTacGia implements Search {
    @Override
    public void search(String keyword) {
        System.out.println("Searching follow author: " + keyword);
    }
}

class TimTheoTheLoai implements Search {
    @Override
    public void search(String keyword) {
        System.out.println("Searching for type: " + keyword);
    }
}

class BookContext {
    private Search search;

    public BookContext(Search search) {
        this.search = search;
    }

    public void search(String keyword) {
        search.search(keyword);
    }
}

public class Library {
    public static void main(String[] args) {
        Search search = new TimTheoTen();
        Search search2 = new TimTheoTacGia();
        Search search3 = new TimTheoTheLoai();

        BookContext context = new BookContext(search);
        context.search("Java");

        BookContext context1 = new BookContext(search2);
        context1.search("Java");
    }
}
