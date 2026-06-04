import { ApiService } from '../api.js';
import { Router } from '../router.js';

let editingRoomId = null; // Controla si estamos creando o editando una habitación

export const DashboardView = {
    async render(container) {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (!user) return Router.navigate('/login');

        const rooms = await ApiService.getRooms();

        const isManager = user.role === 'manager';
        // El Cliente solo ve las habitaciones que tiene asignadas (reservadas)
        const userRooms = isManager ? rooms : rooms.filter(r => r.assignedTo === user.id);

        // Métricas de negocio del Hotel
        const totalRooms = userRooms.length;
        const availableCount = userRooms.filter(r => r.status === 'Available').length;
        const bookedCount = userRooms.filter(r => r.status === 'Booked').length;

        container.innerHTML = `
            <nav class="bg-white shadow-sm border-b border-slate-200 px-6 py-4 flex justify-between items-center">
                <div>
                    <h1 class="text-xl font-bold text-slate-950">Hotel Luxury System</h1>
                    <p class="text-sm text-slate-500">Sesión iniciada: <span class="font-semibold text-amber-600">${user.name} (${user.role.toUpperCase()})</span></p>
                </div>
                <button id="logout-btn" class="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-medium transition border border-red-200">
                    Cerrar Sesión
                </button>
            </nav>

            <main class="max-w-7xl mx-auto p-6 space-y-8">
                <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <p class="text-sm font-medium text-slate-500 uppercase">${isManager ? 'Total Habitaciones Hotel' : 'Mis Habitaciones Reservadas'}</p>
                        <p class="text-3xl font-bold text-slate-900 mt-2">${totalRooms}</p>
                    </div>
                    <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <p class="text-sm font-medium text-slate-500 uppercase">Disponibles</p>
                        <p class="text-3xl font-bold text-emerald-600 mt-2">${availableCount}</p>
                    </div>
                    <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <p class="text-sm font-medium text-slate-500 uppercase">Reservadas / Ocupadas</p>
                        <p class="text-3xl font-bold text-amber-600 mt-2">${bookedCount}</p>
                    </div>
                </section>

                ${isManager ? `
                <section class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 id="form-title" class="text-lg font-bold text-slate-900 mb-4">
                        ${editingRoomId ? 'Editar Habitación' : 'Añadir Nueva Habitación'}
                    </h3>
                    <form id="room-form" class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">Número de Habitación</label>
                            <input type="text" id="r-number" required class="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">Tipo de Habitación</label>
                            <input type="text" id="r-type" required class="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm" placeholder="Ej. Suite, Simple, Doble">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">Precio por Noche ($)</label>
                            <input type="number" id="r-price" required class="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm">
                        </div>
                        <div class="flex space-x-2">
                            <button type="submit" class="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 rounded-lg text-sm transition shadow-sm">
                                ${editingRoomId ? 'Actualizar' : 'Guardar'}
                            </button>
                            ${editingRoomId ? `
                                <button type="button" id="cancel-edit-btn" class="bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium py-2 px-3 rounded-lg text-sm transition">
                                    X
                                </button>
                            ` : ''}
                        </div>
                    </form>
                </section>
                ` : ''}

                <section class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div class="px-6 py-4 border-b border-slate-200">
                        <h3 class="text-lg font-bold text-slate-900">Inventario y Estado de Habitaciones</h3>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-slate-50 text-slate-600 text-xs uppercase font-semibold border-b border-slate-200">
                                    <th class="px-6 py-3">Número</th>
                                    <th class="px-6 py-3">Tipo</th>
                                    <th class="px-6 py-3">Precio por Noche</th>
                                    <th class="px-6 py-3">Huésped Asignado</th>
                                    <th class="px-6 py-3">Estado</th>
                                    <th class="px-6 py-3 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-200 text-sm">
                                ${userRooms.map(room => `
                                    <tr class="hover:bg-slate-50 transition">
                                        <td class="px-6 py-4 font-bold text-slate-900">#${room.number}</td>
                                        <td class="px-6 py-4 font-semibold">${room.type}</td>
                                        <td class="px-6 py-4 text-slate-600 font-mono">$${room.price} USD</td>
                                        <td class="px-6 py-4 text-slate-600">
                                            ${isManager ? `
                                                <select data-id="${room.id}" class="guest-select bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg px-2 py-1">
                                                    <option value="null" ${room.assignedTo === null ? 'selected' : ''}>Sin asignar (Libre)</option>
                                                    <option value="1" ${room.assignedTo === 1 ? 'selected' : ''}>Manager</option>
                                                    <option value="2" ${room.assignedTo === 2 ? 'selected' : ''}>Collaborator / Client</option>
                                                </select>
                                            ` : `
                                                <span class="font-medium text-amber-700">${room.assignedTo === 2 ? 'Asignada a Mí' : 'N/A'}</span>
                                            `}
                                        </td>
                                        <td class="px-6 py-4">
                                            <select data-id="${room.id}" class="status-select bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg px-2 py-1 focus:ring-amber-500 focus:border-amber-500">
                                                <option value="Available" ${room.status === 'Available' ? 'selected' : ''}>Available (Disponible)</option>
                                                <option value="Booked" ${room.status === 'Booked' ? 'selected' : ''}>Booked (Reservada)</option>
                                            </select>
                                        </td>
                                        <td class="px-6 py-4 text-right space-x-2">
                                            ${isManager ? `
                                                <button data-id="${room.id}" data-number="${room.number}" data-type="${room.type}" data-price="${room.price}" class="edit-btn text-indigo-600 hover:text-indigo-900 text-xs font-semibold bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200 transition">
                                                    Editar
                                                </button>
                                                <button data-id="${room.id}" class="delete-btn text-red-600 hover:text-red-900 text-xs font-semibold bg-red-50 px-2.5 py-1 rounded border border-red-200 transition">
                                                    Eliminar
                                                </button>
                                            ` : `
                                                <span class="text-xs text-slate-400 italic">Solo Modificar Estado</span>
                                            `}
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        `;
        this.initEvents(container, isManager);
    },

    initEvents(container, isManager) {
        document.getElementById('logout-btn').addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            Router.navigate('/login');
        });

        if (isManager) {
            const form = document.getElementById('room-form');

            // Envío del Formulario (Creación y Edición)
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const roomData = {
                    number: document.getElementById('r-number').value.trim(),
                    type: document.getElementById('r-type').value.trim(),
                    price: parseFloat(document.getElementById('r-price').value)
                };

                if (editingRoomId) {
                    await ApiService.updateRoom(editingRoomId, roomData);
                    editingRoomId = null;
                } else {
                    roomData.status = "Available";
                    roomData.assignedTo = null;
                    await ApiService.createRoom(roomData);
                }
                this.render(container);
            });

            // Escuchar clics en el botón Editar de la tabla
            container.querySelectorAll('.edit-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    editingRoomId = e.target.dataset.id;
                    this.render(container); // Re-renderizado para activar el formulario en modo edición

                    // Rellenar datos
                    document.getElementById('r-number').value = e.target.dataset.number;
                    document.getElementById('r-type').value = e.target.dataset.type;
                    document.getElementById('r-price').value = e.target.dataset.price;
                    document.getElementById('form-title').scrollIntoView({ behavior: 'smooth' });
                });
            });

            // Cancelar edición
            const cancelBtn = document.getElementById('cancel-edit-btn');
            if (cancelBtn) {
                cancelBtn.addEventListener('click', () => {
                    editingRoomId = null;
                    this.render(container);
                });
            }

            // Eliminar Habitación
            container.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    if (confirm('¿Eliminar esta habitación del inventario?')) {
                        await ApiService.deleteRoom(btn.dataset.id);
                        if (editingRoomId === btn.dataset.id) editingRoomId = null;
                        this.render(container);
                    }
                });
            });

            // Asignación de Huésped (Select controlado)
            container.querySelectorAll('.guest-select').forEach(select => {
                select.addEventListener('change', async (e) => {
                    const id = e.target.dataset.id;
                    const val = e.target.value;
                    const assignedTo = val === "null" ? null : parseInt(val);
                    await ApiService.updateRoom(id, { assignedTo });
                    this.render(container);
                });
            });
        }

        // Cambio de Estado (Disponible / Reservada) compartido por ambos roles
        container.querySelectorAll('.status-select').forEach(select => {
            select.addEventListener('change', async (e) => {
                const id = e.target.dataset.id;
                const newStatus = e.target.value;
                await ApiService.updateRoom(id, { status: newStatus });
                this.render(container);
            });
        });
    }
};