import React from 'react';
import ReactDOM from 'react-dom/client';
import AuthProvider from './contexts/AuthContext';
import App from './App';
import GlobalStyle from './GlobalStyle';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <GlobalStyle />
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
);
