import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
require('es6-promise').polyfill();


const mountNode = document.querySelector('.container');

ReactDOM.render(<App />, mountNode);
