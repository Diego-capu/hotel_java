import { LoginView } from './views/loginView.js';
import { DashboardView } from './views/dashboardView.js';

export const Router = {
    routes: {
        '/login': LoginView,
        '/dashboard': DashboardView
    },

    init() {
        window.addEventListener('popstate', () => this.routeSync());
        this.routeSync();
    },

    navigate(path) {
        window.history.pushState({}, '', path);
        this.routeSync();
    },

    routeSync() {
        const path = window.location.pathname;
        const container = document.getElementById('app');
        const user = JSON.parse(localStorage.getItem('currentUser'));

        if (!user && path !== '/login') {
            window.history.pushState({}, '', '/login');
            LoginView.render(container);
            return;
        }

        if (user && (path === '/login' || path === '/')) {
            window.history.pushState({}, '', '/dashboard');
            DashboardView.render(container);
            return;
        }

        const view = this.routes[path] || LoginView;
        view.render(container);
    }
};