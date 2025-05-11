
import React from 'react'; // Explicitly import React
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { setupCapacitor } from './utils/capacitor';

// Initialize Capacitor
setupCapacitor();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
