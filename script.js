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


// time to make the card for the book display
const cardstack = document.createElement('div');
cardstack.classList.add('cardstack');
//grab container for cardstack to go to
const container = document.getElementById('cardstack');
container.appendChild(cardstack);

// append children to create card.... in a function?
function createCard() {
    for (item of myLibrary) {
        // create card
        const card = document.createElement('div');
        card.classList.add('card');
        
        const deleteBtn = document.createElement('button');
        deleteBtn.id = 'deleteBtn';


        const title = document.createElement('p');
        title.classList.add('title');
        
        const author = document.createElement('p');
        author.classList.add('author');
        
        const pages = document.createElement('p');
        pages.classList.add('pages');
        
        const read = document.createElement('div');
        read.classList.add('read');
        
        const readIt = document.createElement('p');
        readIt.classList.add('readIt');
        
        const yesNo = document.createElement('p');
        yesNo.classList.add('yesNo');
        
        const rating = document.createElement('div')
        rating.classList.add('rating');
        
        const notes = document.createElement('p');
        notes.classList.add('notes');
        // append children-- append accepts multiple appendChild does not
        card.append(deleteBtn, title, author, pages, read, rating, notes);
        read.append(readIt, yesNo)
  
        //update text fields of card with array values
        title.textContent = item.title;
        author.textContent = `Author: ${item.author}`;
        pages.textContent = `Length: ${item.pages} pages`;
        readIt.textContent = 'Read it?';
        yesNo.textContent = `${item.yesNo}`
        rating.textContent = `${item.rating}`;
        notes.textContent = `${item.notes}`;
        //append card to cardstack
        cardstack.appendChild(card);
        console.log(pages.textContent);
};
};

createCard();

// i have a submit button. i need a button to add new book which prompts form. i need a button that deletes a book

// add event listeners to buttons to do the things

const newBook = document.createElement('button');
newBook.id = 'newBookBtn';


// hey dummy, i made the buttons for new book and delete book. delete books got moved onto the card creation so that it is above the title and whatnot.

// i need to format the cards to look nice and then make the butons do their jobs