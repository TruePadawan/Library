function Book(title, author, pages, isRead)
{
    this.title = title;
    this.author = author;
    this.pages = +pages;
    this.read = isRead === true ? "has been read" : "not read yet";
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
}

let Test = new Book('Fablehaven', 'Brandon Mull', 400, true);
console.log(Test.info());