import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { colorReducer, rectReducer } from './reducer';
import undoable from 'redux-undo';

const store = createStore(
  combineReducers({
    colorReducer: undoable(colorReducer),
    rectReducer: rectReducer
}));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
