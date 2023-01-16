/* eslint-disable no-unused-vars */
import BookList from './modules/bookList.js';
import WebStatus from './modules/webStatus.js';
import Clock from './modules/clock.js';

const myList = new BookList();

const myWebStatus = new WebStatus({
    webSections: [
        'book-list-section',
        'add-book-section',
        'contact-section',
    ],
    
    defaultSection: 0
});

const myClock = new Clock('date');