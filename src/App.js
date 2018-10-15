import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {Route} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import Home from './components/Home';
import Books from './containers/Books';
import Users from './containers/Users';
import Reducers from './reducers/Index';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// create the redux store
const store = createStore(
  Reducers,
  compose(
    applyMiddleware(thunk, logger),
    autoRehydrate()
  )
);

class App extends Component {
  componentWillMount() {
    // persist and reload redux store on browser refresh
    persistStore(store, {}, () => {});
  }

  render() {
    return (
      <Provider store={store} key="provider" >
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/books" component={Books} />
            <Route path="/users" component={Users} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
