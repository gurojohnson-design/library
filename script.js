const myLibrary = [];

// constructor function
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

// tie to submit button
// adds new book to array
function addBookToLibrary() {
    //pull user input over
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').value;
    const rating = document.getElementById('bookRating').value;
    const notes = document.getElementById('notes').value;
    // plug into constructor and push to array
    myLibrary.push(new book(title, author, pages, read, rating, notes));
}

myLibrary.push(new book('the hobbit', 'jrr tolkein', 500, 'yes', 5, 'no notes'));
myLibrary.push(new book('dune', 'frank herbert', 700, 'yes', 5, 'so many notes'));

console.log(myLibrary)


// time to make the card for the book display
const cardstack = document.createElement('div');
cardstack.classList.add('cardstack');

//grab container for cardstack to go to
const container = document.getElementById('container');
container.appendChild(cardstack);

// append children to create card.... in a function?
//create card needs to be tied to submit button after constructor
function createCard() {
    cardstack.textContent = '';
    for (item of myLibrary) {
        // create card
        const card = document.createElement('div');
        card.classList.add('card');

        const uuid = document.createElement('div');
        uuid.classList.add('uuid');
        
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.id = 'deleteBtn'

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
        card.append(uuid, deleteBtn, title, author, pages, read, rating, notes);
        read.append(readIt, yesNo)
  
        //update text fields of card with array values
        uuid.textContent = item.id;
        title.textContent = item.title;
        author.textContent = `Author: ${item.author}`;
        pages.textContent = `Length: ${item.pages} pages`;
        readIt.textContent = 'Read it?';
        yesNo.textContent = `${item.yesNo}`
        rating.textContent = `${item.rating}`;
        notes.textContent = `${item.notes}`;
        //append card to cardstack
        cardstack.appendChild(card);
};
};

createCard();

// add event listeners to buttons to do the things


// add new book button presents hidden form to fill out
function showForm() {
    document.getElementById('myForm').style.display = 'block';
}

const newBookBtn = document.getElementById('newBook');

newBookBtn.addEventListener('click', showForm);


// make the buttons do their jobs

const deleteBtn = document.getElementById('deleteBtn');





// set all delete buttons to delete from array and card they're in
cardstack.addEventListener('click', (event) => {
    if (event.target.classList.contains('deleteBtn')) {
// find book with matching id of card that is being deleted
    const bookId = event.target.closest('.uuid');
    const bookToRemove = myLibrary.findIndex(item => item.id === bookId);
// remove it and for some reason needed to drop one off index?
    myLibrary.splice((bookToRemove - 1), 1);

    const deletedBook = event.target.closest('.card');
    deletedBook.remove();}
});


// need submit button to make new book
const form = document.getElementById('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    addBookToLibrary();
    createCard();
    form.reset();
})