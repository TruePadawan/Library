function loadBooks()
{
    let books = localStorage.getObj('bkLib');
    if (books.length > 0)
    {
        for (let i = 0; i < books.length; i++)
        {
            addBookToLibrary(books[i].title, books[i].author, books[i].pages, books[i].readStatus);
        }
    }
}

function addBookToLibrary(title, author, pages, readStatus)
{
    let bookNode = bkTemplate.content.firstElementChild.cloneNode(true);
    bookNode.querySelector('h4').textContent = title;
    bookNode.querySelector('.bk-author').textContent = author;
    bookNode.querySelector('.bk-pages').textContent = `${pages} pages`;
    bookNode.style.backgroundColor = readStatus === "yes" ? "lightgreen" : "lightcoral";

    // SET CLICK EVENT TO TRIGGER A CHANGE IN READ STATUS
    bookNode.querySelector('.bk button').addEventListener('click', () => {
        if (getComputedStyle(bookNode).backgroundColor === 'rgb(240, 128, 128)')
        {
            bookNode.style.backgroundColor = 'lightgreen';
        }else
        {
            bookNode.style.backgroundColor = 'lightcoral';
        }
    });

    // SET CLICK EVENT TO TRIGGER A REMOVAL OF THE BOOK ITEM FROM DOM AND LOCALSTORAGE
    bookNode.querySelector('.del-bk-instance').addEventListener('click', () => {
        bkContainer.removeChild(bookNode);
        myLib.splice(bookNode.dataset.index,1);

        localStorage.setObj('bkLib', myLib);
    });


    let bkItem = {
        title,
        author,
        pages: pages,
        readStatus,
        index: myLib.length
    }
    
    //ADD A DATA-ATTRIBUTE TO IT SO IT CAN BE REFERENCED IN MyLib ARRAY
    bookNode.dataset.index = myLib.length;

    myLib.push(bkItem);
    localStorage.setObj('bkLib', myLib);

    bkContainer.appendChild(bookNode);
}

/// INIT-Add way to put arrays or objects in localStorage ////
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}


////// VARIABLES //////
let myLib = [];

let addNewBookModal = document.querySelector('.new-book-container');
let bkContainer = document.querySelector('.bk-container');
let bkTemplate = document.getElementById('bk-template');

let showNewBookFormBtn = document.querySelector('.new-book-btn');
let newBookForm = document.querySelector('.new-book-form');
let closeFormBtn = document.querySelector('.close-form-btn');
///////////////

showNewBookFormBtn.addEventListener('click', () => {
    if (getComputedStyle(addNewBookModal).display === "none")
    {
        addNewBookModal.style.display = 'flex';
    }
});

closeFormBtn.addEventListener('click', () => {
    addNewBookModal.style.display = 'none';
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

/// FIND AND ADD BOOK ITEMS FROM LocalStorage IF ANY
loadBooks();