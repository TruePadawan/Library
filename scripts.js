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

function addBookToLibrary(title, author, pages, readStatus)
{
    let bookNode = bkTemplate.content.firstElementChild.cloneNode(true);
    bookNode.querySelector('h4').textContent = title;
    bookNode.querySelector('.bk-author').textContent = author;
    bookNode.querySelector('.bk-pages').textContent = pages;
    bookNode.style.backgroundColor = readStatus === "yes" ? "lightgreen" : "lightcoral";

    bookNode.addEventListener('click', () => {
        if (getComputedStyle(bookNode).backgroundColor === 'rgb(240, 128, 128)')
        {
            bookNode.style.backgroundColor = 'lightgreen';
        }else
        {
            bookNode.style.backgroundColor = 'lightcoral';
        }
    });

    bkContainer.appendChild(bookNode);
}

////// VARIABLES //////
let myLib = [];
let addNewBookForm = document.querySelector('.new-book-container');
let bkContainer = document.querySelector('.bk-container');
let bkTemplate = document.getElementById('bk-template');

let showNewBookFormBtn = document.querySelector('.new-book-btn');
let newBookForm = document.querySelector('.new-book-form');
let closeFormBtn = document.querySelector('.close-form-btn');
// let bkButtons = document.querySelectorAll('.bk button');
///////////////

////// LOGIC ///////
showNewBookFormBtn.addEventListener('click', () => {
    if (getComputedStyle(addNewBookForm).display === "none")
    {
        addNewBookForm.style.display = 'flex';
    }
});

closeFormBtn.addEventListener('click', () => {
    addNewBookForm.style.display = 'none';
});

newBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let title = e.target.querySelector('input[name="bk-title"]').value;
    let author = e.target.querySelector('input[name="bk-author"]').value;
    let pages = e.target.querySelector('input[name="bk-pages"]').value;
    let readStatus = undefined;
    
    // FIND WHETHER THE BOOK HAS BEEN READ OR NOT
    let readStatusList = e.target.querySelectorAll('.bk-status input');
    readStatusList.forEach((item) => {
        if (item.checked) {
            readStatus = item.dataset.status;
        }
    });

    addBookToLibrary(title, author, pages, readStatus);
});
// bkButtons.forEach((btn) => {
//     btn.addEventListener('click', () => {
//         let bkInstance = btn.closest('.bk-instance');

//         if (getComputedStyle(bkInstance).backgroundColor === 'rgb(240, 128, 128)')
//         {
//             bkInstance.style.backgroundColor = 'lightgreen';
//         }else
//         {
//             bkInstance.style.backgroundColor = 'lightcoral';
//         }
//     });
// });

// bkContainer.appendChild(bkTemplate.content.firstElementChild.cloneNode(true));