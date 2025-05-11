
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { setupCapacitor } from './utils/capacitor';

// Initialize Capacitor
setupCapacitor();

createRoot(document.getElementById("root")!).render(<App />);
