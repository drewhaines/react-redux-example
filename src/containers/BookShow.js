import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getBook} from '../actions/Book';

class BookShow extends Component {
  componentWillMount() {
    const bookId = 1;
    this.props.dispatch(getBook(bookId))
  }

  render() {
    const attributes = this.props.book.form.attributes;

    return (
      <div className='text-left'>
        <p>{attributes.name}</p>
        <p>{attributes.author}</p>
        <p>{attributes.genre}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    book: state.book,
  };
}

export default connect(mapStateToProps)(BookShow);
