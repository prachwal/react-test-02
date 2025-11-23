import { App } from './app';
import './styles/index.scss';
import { NotificationProvider } from './providers/NotificationProvider';
import { render } from 'preact';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

render(

    <NotificationProvider>
      <App />
    </NotificationProvider>
  ,
  rootElement
);
