import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { NoteContextProvider } from './states/note-context';

ReactDOM.render(
  <React.StrictMode>
    <NoteContextProvider>
      <App />
    </NoteContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
