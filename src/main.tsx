import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';
import './styles/index.scss';
import { NotificationProvider } from './providers/NotificationProvider';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </React.StrictMode>
);
