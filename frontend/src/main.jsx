import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import EdTechPage from './EdTechPage.jsx';
import './styles.css';

const isEdTechPage = window.location.pathname.replace(/\/+$/, '') === '/edtech';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isEdTechPage ? <EdTechPage /> : <App />}
  </StrictMode>
);
