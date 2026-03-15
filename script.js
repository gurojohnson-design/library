const myLibrary = [];

// replace constructor function for class declaration
class Book {
    constructor(title, author, pages, read, rating, notes) {
        // Optional: Retain the new.target check if strict enforcement is desired,
        // though classes inherently require 'new' for instantiation.
        if (!new.target) {
            throw Error('You must use the "new" operator to call the constructor');
        }
        // Create ID
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.rating = rating;
        this.notes = notes;
    }
}

// Tie to submit button
// Adds new book to array
function addBookToLibrary() {
    // Pull user input over
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').value;
    const rating = document.getElementById('bookRating').value;
    const notes = document.getElementById('notes').value;
    // Plug into constructor and push to array
    myLibrary.push(new Book(title, author, pages, read, rating, notes));
}

myLibrary.push(new Book('the hobbit', 'jrr tolkein', 500, 'No', 5, 'no notes'));
myLibrary.push(new Book('dune', 'frank herbert', 700, 'yes', 5, 'so many notes'));

// Time to make the card for the book display
const cardstack = document.createElement('div');
cardstack.classList.add('cardstack');
// Grab container for cardstack to go to
const container = document.getElementById('container');
container.appendChild(cardstack);

// Append children to create card.... in a function?
// Create card needs to be tied to submit button after constructor
function createCard() {
    cardstack.textContent = '';
    for (const item of myLibrary) {
        // Create card
        const card = document.createElement('div');
        card.classList.add('card');
        const uuid = document.createElement('div');
        uuid.classList.add('uuid');
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('deleteBtn');
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
        const rating = document.createElement('div');
        rating.classList.add('rating');
        const notes = document.createElement('p');
        notes.classList.add('notes');
        // Append children-- append accepts multiple appendChild does not
        card.append(uuid, deleteBtn, title, author, pages, read, rating, notes);
        read.append(readIt, yesNo);
        
        function updateRead() {
            if (yesNo.textContent === 'No') {
                const updateReadBtn = document.createElement('button');
                updateReadBtn.id = 'updateRead';
                yesNo.append(updateReadBtn);
                updateReadBtn.textContent = 'Mark as read';
                updateReadBtn.addEventListener('click', () => {
                    yesNo.textContent = 'Yes';
                });
            }
        }
        
        // Update text fields of card with array values
        uuid.textContent = item.id;
        title.textContent = item.title;
        author.textContent = `Author: ${item.author}`;
        pages.textContent = `Length: ${item.pages} pages`;
        readIt.textContent = 'Read it?';
        yesNo.textContent = `${item.read}`;
        rating.textContent = `Rating: ${item.rating}/5`;
        notes.textContent = `${item.notes}`;
        deleteBtn.textContent = 'X';
        updateRead();
        
        // Append card to cardstack
        cardstack.appendChild(card);
    }
}

createCard();

// Add new book button presents hidden form to fill out
function showForm() {
    document.getElementById('myForm').style.display = 'block';
}

const newBookBtn = document.getElementById('newBook');
newBookBtn.addEventListener('click', showForm);

// Make the buttons do their jobs
const deleteBtn = document.getElementById('deleteBtn');
// Set all delete buttons to delete from array and card they're in
cardstack.addEventListener('click', (event) => {
    if (event.target.classList.contains('deleteBtn')) {
        // Find book with matching id of card that is being deleted
        const bookIdElement = event.target.closest('.card').querySelector('.uuid');
        const bookId = bookIdElement ? bookIdElement.textContent : null;
        const bookIndex = myLibrary.findIndex(item => item.id === bookId);
        if (bookIndex !== -1) {
            myLibrary.splice(bookIndex, 1);
            const deletedBook = event.target.closest('.card');
            deletedBook.remove();
        }
    }
});

// Need submit button to make new book
const form = document.getElementById('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    addBookToLibrary();
    createCard();
    form.reset();
});

const doneBtn = document.getElementById('done');
doneBtn.addEventListener('click', () => {
    document.getElementById('myForm').style.display = 'none';
});

// VALIDATE FORM INFO HERE

// once validated as 'invalid' the message doesnt clear, need to clear the error message at the begining on the check so that it 'resets' otherwise it will forever be false and never re assess
form.addEventListener('input', (e) => {
  const field = e.target;
  field.setCustomValidity('');

  if (!field.checkValidity()) {
    field.setCustomValidity('A good library would collect this information. You should too.');
  } else {
  }
});

form.addEventListener('invalid', (e) => {
  e.target.setCustomValidity('A good library would collect this information. You should too.');
}, true);


// trying the make this work for all inputs to display a custom error message. it works for the first field but wont move off of it when its supposed to be valid
