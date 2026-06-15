import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

const rootElement = document.getElementById('root');
if (!rootElement._pineappleRoot) {
  rootElement._pineappleRoot = createRoot(rootElement);
}

rootElement._pineappleRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
