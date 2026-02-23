const myLibrary = [];

function book(title, author, pages, read, rating, notes) {
    if (!new.target) {
        throw Error('You must use the "new" operator to call the constructor');
    }
    // create ID
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.rating = rating;
    this.notes = notes;
    }


function addBookToLibrary() {
    //pull user input over
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const pages = document.getElementById('pages');
    const read = document.getElementById('read');
    const rating = document.getElementById('bookRating');
    const notes = document.getElementById('notes');
    // plug into constructor and push to array
    book.push(new book(title, author, pages, read, rating, notes));


}

myLibrary.push(new book('the hobbit', 'jrr tolkein', 500, 'yes', 5, 'no notes'));
myLibrary.push(new book('dune', 'frank herbert', 700, 'yes', 5, 'so many notes'));

console.log(myLibrary)

