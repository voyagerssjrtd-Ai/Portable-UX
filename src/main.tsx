import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import ChatUI from './components/Chat-UI/ChatUI';
import { LocalAdapter } from './adapters/LocalAdapter';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div className="h-screen bg-gray-50">
      <ChatUI backend={LocalAdapter} />
    </div>
  </React.StrictMode>
);
