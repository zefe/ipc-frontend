import React from 'react';
import ReactDOM from 'react-dom';
import { IpcApp } from './IpcApp';
import './assets/styles/style.scss';

ReactDOM.render(
  <React.StrictMode>
    <IpcApp />
  </React.StrictMode>,
  document.getElementById('root')
);

