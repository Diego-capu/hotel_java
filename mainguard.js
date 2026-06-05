import { Router } from './router.js';

// Escuchar cuando el usuario usa las flechas del navegador (Atrás/Adelante)
window.addEventListener('popstate', () => {
    Router.resolve();
});

// Arrancar la SPA apenas cargue el DOM por primera vez
document.addEventListener('DOMContentLoaded', () => {
    // Si la ruta raíz es '/', redirigimos automáticamente a '/login'
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        window.history.pushState({}, "", '/login');
    }
    Router.resolve();
});
