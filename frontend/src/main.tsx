import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.PROD ? '/TechWave-Modern-Laptop-E-commerce-Platform' : ''}>
      <App />
      <Toaster position="top-right" richColors closeButton />
    </BrowserRouter>
  </StrictMode>
);