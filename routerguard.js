import { LoginView } from './views/loginView.js';
import { DashboardView } from './views/dashboardView.js';

const routes = {
    '/login': LoginView,
    '/dashboard': DashboardView
};

export const Router = {
    async navigate(path) {
        // Actualizamos la URL del navegador sin recargar la página
        window.history.pushState({}, "", path);
        await this.resolve();
    },

    async resolve() {
        const path = window.location.pathname;
        const container = document.getElementById('app');
        
        // Buscamos si existe la ruta actual, si no, por defecto va al login
        const view = routes[path] || LoginView;

        // GUARDIA DE SEGURIDAD (State Persistence)
        const user = localStorage.getItem('currentUser');
        
        if (path === '/dashboard' && !user) {
            // Intenta entrar al dashboard sin estar logueado -> Al Login
            window.history.pushState({}, "", '/login');
            return LoginView.render(container);
        }

        if (path === '/login' && user) {
            // Ya está logueado e intenta ir al login -> Lo mandamos al Dashboard
            window.history.pushState({}, "", '/dashboard');
            return DashboardView.render(container);
        }

        // Si pasa los filtros, renderizamos la vista correspondiente
        await view.render(container);
    }
};
