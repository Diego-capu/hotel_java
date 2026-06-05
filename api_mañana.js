const BASE_URL = 'http://localhost:3000';

export const ApiService = {
    // READ: Obtener todas las habitaciones
    async getRooms() {
        try {
            const response = await fetch(`${BASE_URL}/rooms`);
            if (!response.ok) throw new Error('Error al traer las habitaciones');
            return await response.json();
        } catch (error) {
            console.error('API Error (getRooms):', error);
            return [];
        }
    },

    // CREATE: Guardar una nueva habitación
    async createRoom(roomData) {
        try {
            const response = await fetch(`${BASE_URL}/rooms`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(roomData)
            });
            if (!response.ok) throw new Error('Error al crear la habitación');
            return await response.json();
        } catch (error) {
            console.error('API Error (createRoom):', error);
        }
    },

    // UPDATE: Modificar datos parciales o completos de una habitación (Precio, Estado, Huésped)
    async updateRoom(id, roomData) {
        try {
            const response = await fetch(`${BASE_URL}/rooms/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(roomData)
            });
            if (!response.ok) throw new Error('Error al actualizar la habitación');
            return await response.json();
        } catch (error) {
            console.error('API Error (updateRoom):', error);
        }
    },

    // DELETE: Eliminar una habitación del inventario
    async deleteRoom(id) {
        try {
            const response = await fetch(`${BASE_URL}/rooms/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Error al eliminar la habitación');
            return true;
        } catch (error) {
            console.error('API Error (deleteRoom):', error);
            return false;
        }
    }
};
