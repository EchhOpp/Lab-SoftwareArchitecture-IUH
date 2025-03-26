public class Main {
    public static void main(String[] args) {
        Book a = new Book("a", 12, "a");
        Book b = new Book("b", 12, "a");

        Library library = Library.getInstance();

        library.addBook(a);
        library.addBook(b);

        for(Book book : library.getBooks()) {
            System.out.println(book);
        }
    }
}