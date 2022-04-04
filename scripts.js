class Book {
    #title;
    #author;
    #pages;
    #readStatus;
    constructor(title,author,pages,readStatus) {
        this.#title = title;
        this.#author = author;
        this.#pages = pages;
        this.#readStatus = readStatus;
    }

    toggleReadStatus() {
        this.#readStatus = !this.#readStatus;
    }

    get title() {
        return this.#title;
    }

    get author() {
        return this.#author;
    }

    get pages() {
        return this.#pages;
    }

    get readStatus() {
        return this.#readStatus;
    }
}

/// INIT-Add way to put arrays or objects in localStorage ////
Storage.prototype.setObj = function (key, obj) {
  return this.setItem(key, JSON.stringify(obj));
};
Storage.prototype.getObj = function (key) {
  return JSON.parse(this.getItem(key));
};

////// VARIABLES //////
let myLib = [];

let addNewBookModal = document.querySelector(".new-book-container");
let bkContainer = document.querySelector(".bk-container");
let bkTemplate = document.getElementById("bk-template");

let showNewBookFormBtn = document.querySelector(".new-book-btn");
let newBookForm = document.querySelector(".new-book-form");
let closeFormBtn = document.querySelector(".close-form-btn");
///////////////

function buildBookItem(bookItemData) {
    const newBookItem = bkTemplate.content.firstElementChild.cloneNode(true);

    newBookItem.querySelector("h4").textContent = bookItemData.title;
    newBookItem.querySelector(".bk-author").textContent = bookItemData.author;
    newBookItem.querySelector(".bk-pages").textContent = `${bookItemData.pages} pages`;
    newBookItem.style.backgroundColor = bookItemData.readStatus === "yes" ? "lightgreen" : "lightcoral";


    // SET CLICK EVENT TO TRIGGER A CHANGE IN READ STATUS
    newBookItem.querySelector(".bk button").addEventListener("click", () => {
    let bookItems = localStorage.getObj("bkLib");

    if (getComputedStyle(newBookItem).backgroundColor === "rgb(240, 128, 128)") {
        newBookItem.style.backgroundColor = "lightgreen";
        bookItems[newBookItem.dataset.index].readStatus = "yes";
    }
    else {
        newBookItem.style.backgroundColor = "lightcoral";
      bookItems[newBookItem.dataset.index].readStatus = "no";
    }
    localStorage.setObj("bkLib", bookItems);
  });


  // SET CLICK EVENT TO TRIGGER A REMOVAL OF THE BOOK ITEM FROM DOM AND LOCALSTORAGE
  newBookItem.querySelector(".del-bk-instance").addEventListener("click", () => {
    myLib.splice(newBookItem.dataset.index, 1);

    localStorage.setObj("bkLib", myLib);
    bkContainer.removeChild(newBookItem);
  });

  return newBookItem;
}

function addBookToLibrary(book) {
    const bookDOMItem = buildBookItem(book);
    
    //ADD A DATA-ATTRIBUTE TO IT SO IT CAN BE REFERENCED IN MyLib ARRAY
    bookDOMItem.dataset.index = myLib.length;
    
    let bookItem = {
        title : book.title,
        author : book.author,
        pages: book.pages,
        readStatus : book.readStatus,
        index: myLib.length,
    };

    // STORE BOOK DATA
    myLib.push(bookItem);
    localStorage.setObj("bkLib", myLib);
    
    bkContainer.appendChild(bookDOMItem);
}


// MAIN EVENT LISTENERS
showNewBookFormBtn.addEventListener("click", () => {
  if (getComputedStyle(addNewBookModal).display === "none") {
    addNewBookModal.style.display = "flex";
  }
});

closeFormBtn.addEventListener("click", () => {
  addNewBookModal.style.display = "none";
});

newBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = e.target.querySelector('#bk-title').value;
  const author = e.target.querySelector("#bk-author").value;
  const pages = e.target.querySelector("#bk-pages").value;
  let readStatus;

  // FIND WHETHER THE BOOK HAS BEEN READ OR NOT
  let readStatusButtons = e.target.querySelectorAll(".bk-status input");
  
  readStatusButtons.forEach((button) => {
    if (button.checked) {
      readStatus = button.dataset.status;
    }
  });

  const newBook = new Book(title,author, pages, readStatus);

  addBookToLibrary(newBook);
});


function loadBooksFromStorage() {
    let books = localStorage.getObj("bkLib");
  
    if (books.length > 0) {
      for (let i = 0; i < books.length; i++) {
          const title = books[i].title;
          const author = books[i].author;
          const pages = books[i].pages;
          const readStatus = books[i].readStatus;
  
          const book = new Book(title, author, pages, readStatus);
          addBookToLibrary(book);
      }
    }
}

loadBooksFromStorage();