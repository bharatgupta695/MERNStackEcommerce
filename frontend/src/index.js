import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { positions, transitions, Provider as AlertProvider   } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store = {store}>
    <AlertProvider template={AlertTemplate}  position={positions.BOTTOM_CENTER}  timeout={3000}  transition={transitions.SCALE}>
    <App />
    </AlertProvider>
  </Provider>
);

