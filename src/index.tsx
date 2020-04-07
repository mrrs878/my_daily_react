import React from 'react';
import ReactDOM from 'react-dom';
import 'node-waves/dist/waves.min';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import RootStore from './store';
import MErrorBoundary from './components/MErrorBoundary';
import { Router } from './router';

ReactDOM.render(
  <MErrorBoundary>
    <RootStore>
      <Router>
        <App />
      </Router>
    </RootStore>
  </MErrorBoundary>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
