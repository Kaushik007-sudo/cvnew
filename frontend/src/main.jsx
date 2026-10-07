import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import EdTechPage from './EdTechPage.jsx';
import MyProjectsPage from './MyProjectsPage.jsx';
import './styles.css';
import './my-projects.css';

const currentPath = window.location.pathname.replace(/\/+$/, '');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {currentPath === '/edtech'
      ? <EdTechPage />
      : currentPath === '/my-projects'
        ? <MyProjectsPage />
        : <App />}
  </StrictMode>
);
