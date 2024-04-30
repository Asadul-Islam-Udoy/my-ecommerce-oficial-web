import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { transitions,positions,Provider as AlertProvider} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import store from './store';
import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById('root'));
const option = {
  timeout: 5000,
  transition:transitions.SCALE,
  position:positions.BOTTOM_CENTER
}
root.render(
  <AlertProvider  template={AlertTemplate} {...option}>
   <Provider store={store}>
      <App/>
   </Provider>
  </AlertProvider>
   

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

