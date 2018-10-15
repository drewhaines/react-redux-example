import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import {updateBookForm, submitBookForm} from '../actions/Book';

class BookForm extends Component {
  handleSubmit() {
    const attributes = this.props.book.form.attributes;
    this.props.dispatch(submitBookForm(attributes));
  }

  handleChange(key, event) {
    this.props.dispatch(updateBookForm(key, event.target.value));
  }

  render() {
    const attributes = this.props.book.form.attributes;

    return (
      <div className='text-left'>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input value={attributes.name} onChange={this.handleChange.bind(this, 'name')}/>
        </FormGroup>
        <FormGroup>
          <Label for="author">Author</Label>
          <Input value={attributes.author} onChange={this.handleChange.bind(this, 'author')} />
        </FormGroup>
        <FormGroup>
          <Label for="genre">Genre</Label>
          <Input value={attributes.genre} onChange={this.handleChange.bind(this, 'genre')} />
        </FormGroup>
        <Button color='success' disabled={!attributes.name} onClick={this.handleSubmit.bind(this)}>
          Submit
        </Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    book: state.book,
  };
}

export default connect(mapStateToProps)(BookForm);
