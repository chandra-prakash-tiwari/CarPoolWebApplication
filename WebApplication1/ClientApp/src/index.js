import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import App from './App/App';
import registerServiceWorker from './registerServiceWorker';
import rideReducer from './reducer/rideReducer';
import carReducer from './reducer/carReducer';


const rootElement = document.getElementById('root');

const MasterReducer = combineReducers( {
    ride: rideReducer,
    car: carReducer
})

const store = createStore(MasterReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
  rootElement);

registerServiceWorker();

