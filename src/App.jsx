import React from 'react';
import { Provider } from 'react-redux';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import store from './stores/store.js';
import './styles/app.css';
import { Row } from 'react-bootstrap';

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <main className='app-main'>
        <Row className='app-main-container'>
          <HomeScreen />
        </Row>
      </main>
    </Provider>
  );
};

export default App;
