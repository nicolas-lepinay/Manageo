import React from 'react';
import { createRoot } from 'react-dom/client'; // For React 18
import './styles/styles.scss';
import App from './App/App';

const children = (
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

const container = document.getElementById('root');
createRoot(container as Element).render(children); // For React 18
