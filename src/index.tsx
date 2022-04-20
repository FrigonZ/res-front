/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import 'antd/dist/antd.min.css';
import './index.less';

const consoleError = console.error.bind(console);

console.error = (errObj, ...args) => {
  if (args.includes('findDOMNode')) {
    return;
  }
  consoleError(errObj, ...args);
};

ConfigProvider.config({
  theme: {
    primaryColor: '#AD2102',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
