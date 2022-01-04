function Book(title, author, pages, isRead)
{
    this.title = title;
    this.author = author;
    this.pages = +pages;
    this.read = isRead.toUpperCase() === "Y" ? "has been read" : "not read yet";
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
}

function addBookToLibrary()
{
    let bkTitle = prompt('Title of the Book?');
    let bkAuthor = prompt('Author of the Book?');
    
    let bkPages = undefined;
    while(+bkPages == NaN || +bkPages < 0)
    {
        bkPages = prompt('Number of pages in the book?');
    }
    
    let bkRead = '';
    while(bkRead.toUpperCase() != 'Y' && bkRead.toUpperCase() != 'N')
    {
        bkRead = String(prompt('Has the book been read? (Y/N)'));
    }

    myLib.push(new Book(bkTitle, bkAuthor, bkPages, bkRead));
}

let myLib = [];
let addNewBook = document.querySelector('.new-book-btn');
let addNewBookForm = document.querySelector('.new-book-container');
let closeFormBtn = document.querySelector('.close-form-btn');

addNewBook.addEventListener('click', () => {
    if (getComputedStyle(addNewBookForm).display === "none")
    {
        addNewBookForm.style.display = 'flex';
    }
});

closeFormBtn.addEventListener('click', () => {
    addNewBookForm.style.display = 'none';
});