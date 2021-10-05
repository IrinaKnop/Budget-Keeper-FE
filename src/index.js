import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configure_store';
import createRouter from './create_router';
import './index.css';
import App from './modules/App/App';

const router = createRouter();
const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App>
        {router}
      </App>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);