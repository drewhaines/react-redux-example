import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import BookForm from './BookForm';

class Books extends Component {
  renderBooks(books) {
    let items = [];

    for (let index in books) {
      const book = books[index];
      items.push(
        <p>{book.name}</p>
      );
    }

    return items;
  }

  render() {
    const books = this.props.book.books;

    return (
      <div className='text-center'>
        <Container fluid={true}>
          <br/>
          <Row>
            <Col>
              <h1>Books</h1>
              <br/>
              <br/>
              { this.renderBooks(books) }
            </Col>
            <Col>
              <h1>New Book</h1>
              <br/>
              <br/>
              <BookForm />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    book: state.book,
  };
}

export default connect(mapStateToProps)(Books);
