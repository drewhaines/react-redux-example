import * as actionTypes from '../actions/ActionTypes';

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
