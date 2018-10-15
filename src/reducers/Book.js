import * as actionTypes from '../actions/ActionTypes';

const initialState = {
  attributes: {},
  form: {
    attributes: { name: '', author: '', genre: ''},
    errors: { name: '', author: '', genre: '' },
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
