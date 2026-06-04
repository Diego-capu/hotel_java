import { ApiService } from '../api.js';
import { Router } from '../router.js';

export const LoginView = {
    render(container) {
        container.innerHTML = `
            <div class="min-h-screen flex items-center justify-center px-4">
                <div class="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-slate-100">
                    <h2 class="text-3xl font-extrabold text-center text-slate-900 mb-2">Hotel Grand Horizon</h2>
                    <p class="text-sm text-slate-500 text-center mb-6">Inicia sesión para gestionar tus reservas</p>
                    <form id="login-form" class="space-y-5">
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
                            <input type="email" id="email" required class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
                            <input type="password" id="password" required class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none">
                        </div>
                        <div id="error-message" class="text-red-500 text-sm hidden bg-red-50 p-2 rounded border border-red-200"></div>
                        <button type="submit" class="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2.5 rounded-lg transition shadow-md">
                            Ingresar al Sistema
                        </button>
                    </form>
                </div>
            </div>
        `;
        this.initEvents();
    },

    initEvents() {
        const form = document.getElementById('login-form');
        const errorDiv = document.getElementById('error-message');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            try {
                const user = await ApiService.login(email, password);
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    Router.navigate('/dashboard');
                } else {
                    errorDiv.textContent = "Credenciales incorrectas.";
                    errorDiv.classList.remove('hidden');
                }
            } catch (err) {
                errorDiv.textContent = "Error de conexión con el servidor.";
                errorDiv.classList.remove('hidden');
            }
        });
    }
};