import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { Toaster } from 'sonner';

// TODO: Update to React Router v7 when released
// These warnings are known and will be addressed in the v7 upgrade:
// - v7_startTransition: React Router will wrap state updates in React.startTransition
// - v7_relativeSplatPath: Changes to relative route resolution within Splat routes

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster position="top-right" richColors closeButton />
    </BrowserRouter>
  </StrictMode>
);