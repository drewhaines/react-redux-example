import * as actionTypes from '../actions/ActionTypes';
import {parseResponse} from '../utils/handle-fetch-response';
import fetch from '../utils/fetch';

export function updateBookForm(key, value) {
  return {type: actionTypes.BOOK_FORM_UPDATE, key, value};
}

export function setBooks(books) {
  return {type: actionTypes.SET_BOOKS, books};
}

export function submitBookForm(attributes) {
  return (dispatch, getState) => {
    let books = JSON.parse(JSON.stringify(getState().book.books));
    books.push(attributes);
    dispatch(setBooks(books));
  };
}

export function setBook(book) {
  return {type: actionTypes.SET_BOOK, book};
}

export function bookError(errors) {
  return {type: actionTypes.BOOK_ERRORS, errors};
}

export function getBook(bookId) {
  return (dispatch, getState) => {
    const apiUrl = 'http://localhost:3000/api/Book/' + bookId;

    fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'get',
    })
      .then(parseResponse)
      .then( (book) => {
        dispatch(setBook(book));
      })
      .catch((errors) => {
        dispatch(bookError(errors));
        throw errors;
      });
  };
}
