import * as actionTypes from '../actions/ActionTypes';

const initialState = {
  attributes: {},
  form: {
    attributes: { name: '', age: '', email: ''},
    errors: { name: '', age: '', email: ''},
    loading: false,
  },
  users: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_USER_START:
      return ({
        ...state,
        form: {
          ...action.form,
          loading: true,
        }
      });
    case actionTypes.SET_USER:
      return ({
        ...state,
        form: {
          ...action.form,
          loading: false,
        },
        attributes: JSON.parse(JSON.stringify(action.form.attributes))
      });
    case actionTypes.USER_FORM_UPDATE:
      return ({
        ...state,
        form: {
          ...action.form,
          attributes: {
            ...action.form.attributes,
            [action.key]: action.value
          }
        },
      });
    default:
      return state;
  }
}
