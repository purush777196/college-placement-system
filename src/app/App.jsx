import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import AppProviders from './providers';
import '../styles/index.css';

export function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}

// Auto-mount when executed directly as entry script in browser
const rootEl = typeof document !== 'undefined' ? document.getElementById('root') : null;
if (rootEl && !rootEl.hasChildNodes()) {
  createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

export default App;
