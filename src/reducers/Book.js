import * as actionTypes from '../actions/ActionTypes';

const initialState = {
  attributes: { name: '', author: '', genre: ''},
  form: {
    attributes: { name: '', author: '', genre: ''},
    errors: { name: '', author: '', genre: '' },
    genreOptions: [
      {id: 1, text: 'Fiction'},
      {id: 2, text: 'History'}
    ],
    loading: false,
  },
  books: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_BOOKS:
      return ({
        ...state,
        books: action.books,
        form: initialState.form
      });
    case actionTypes.BOOK_FORM_UPDATE:
      return ({
        ...state,
        form: {
          ...state.form,
          attributes: {
            ...state.form.attributes,
            [action.key]: action.value
          }
        },
      });
    default:
      return state;
  }
}
