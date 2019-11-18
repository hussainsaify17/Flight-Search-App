import React from 'react';
import ReactDOM from 'react-dom';
import FlightSearchApp from './FlightSearchApp';
import { createStore, } from 'redux';
import { Provider } from 'react-redux';
import reducer from './FlightSearchApp/Reducers'
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const reduxStore = createStore(reducer)

ReactDOM.render(
    <Provider store={reduxStore}>
        <FlightSearchApp />
    </Provider>, document.getElementById('root'));