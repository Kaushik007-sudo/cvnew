import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import EdTechPage from './EdTechPage.jsx';
import LuxePage from './LuxePage.jsx';
import MyProjectsPage from './MyProjectsPage.jsx';
import './styles.css';
import './my-projects.css';

const currentPath = window.location.pathname.replace(/\/+$/, '');
const isLuxeHost = window.location.hostname === 'luxe.thekaushikdas.com';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isLuxeHost || currentPath === '/luxe'
      ? <LuxePage />
      : currentPath === '/edtech'
        ? <EdTechPage />
        : currentPath === '/my-projects'
          ? <MyProjectsPage />
          : <App />}
  </StrictMode>
);
