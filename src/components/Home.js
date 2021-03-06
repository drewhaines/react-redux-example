import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const styles = {
  header: {
    color: 'red',
    fontSize: 36
  }
}

export default class Home extends Component {

  render() {
    return (
      <div className='text-center'>
        <Container fluid={true}>
          <br/>
          <h1 style={styles.header}>Home</h1>
          <br/>
          <br/>
          <Row>
            <Col>
              <Link to='/books'>
                <Button color='primary'>Books</Button>
              </Link>
            </Col>
            <Col>
              <Link to='/users'>
                <Button color='success'>Users</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
