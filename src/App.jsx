import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import store from './stores/store.js';
import './styles/app.css';
import { Row } from 'react-bootstrap';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <main className='app-main'>
          <Row className='app-main-container'>
            <Switch>
              <Route component={HomeScreen} path='/' />
            </Switch>
          </Row>
        </main>
      </Router>
    </Provider>
  );
};

export default App;
