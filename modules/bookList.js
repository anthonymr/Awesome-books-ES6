import Book from './book.js';
import WebStatus from './webStatus.js';

export default class BookList {
  constructor() {
    this.bookList = [];
    this.domBookList = document.querySelector('#book-list');
    this.inputTitle = document.querySelector('#input-title');
    this.inputAuthor = document.querySelector('#input-author');
    this.buttonAdd = document.querySelector('#button-add');

    this.buttonAdd.addEventListener('click', (event) => {
      event.preventDefault();
      this.addBook(this.inputTitle.value, this.inputAuthor.value);

      this.inputTitle.value = '';
      this.inputAuthor.value = '';
    });

    this.#loadLocalStorage();
    this.drawBooks();
  }

  addBook = (title, author) => {
    const error = document.getElementById('errorMsg');
    if (!title || !author) {
      error.classList.remove('hidden');
      return;
    }
    error.classList.add('hidden');
    const myBook = new Book(title, author);
    this.bookList.unshift(myBook);
    this.drawBooks();
    this.#saveToLocalStorage();
    WebStatus.changeSection('book-list-section');
  }

  removeBook = (index) => {
    this.bookList.splice(index, 1);
    this.drawBooks();
    this.#saveToLocalStorage();
  }

  drawBooks = () => {
    this.domBookList.innerHTML = '';

    this.bookList.forEach((book, index) => {
      const newLi = document.createElement('li');
      newLi.innerHTML = `
            <li>
              <span>
                "${book.title}"
                <span>by ${book.author}</span>
              </span>
              <button id="remove_btn_${index}">Remove</button>
            </li>
            `;

      this.domBookList.appendChild(newLi);
      const removeBtn = document.querySelector(`#remove_btn_${index}`);
      removeBtn.addEventListener('click', () => {
        this.removeBook(index);
        this.drawBooks();
      });
    });
  }

  #saveToLocalStorage = () => {
    localStorage.setItem('bookList', JSON.stringify(this.bookList));
  }

  #loadLocalStorage = () => {
    const stringBookList = localStorage.getItem('bookList');

    if (stringBookList) {
      const parsedBookList = JSON.parse(stringBookList);
      if (Array.isArray(parsedBookList)) {
        this.bookList = parsedBookList;
      }
    }
  }
}