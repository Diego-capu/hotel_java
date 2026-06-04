const BASE_URL = 'http://localhost:3030';

export const ApiService = {
    async login(email, password) {
        try {
            const response = await fetch(`${BASE_URL}/users?email=${email}&password=${password}`);
            if (!response.ok) throw new Error('Error en el servidor');
            const users = await response.json();
            return users.length > 0 ? users[0] : null;
        } catch (error) {
            console.error("Login Error:", error);
            throw error;
        }
    },

    async getRooms() {
        try {
            const response = await fetch(`${BASE_URL}/rooms`);
            if (!response.ok) throw new Error('No se cargaron las habitaciones');
            return await response.json();
        } catch (error) {
            console.error("Get Rooms Error:", error);
            return [];
        }
    },

    async createRoom(roomData) {
        try {
            const response = await fetch(`${BASE_URL}/rooms`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(roomData)
            });
            return await response.json();
        } catch (error) {
            console.error("Create Room Error:", error);
        }
    },

    async updateRoom(id, updateData) {
        try {
            const response = await fetch(`${BASE_URL}/rooms/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateData)
            });
            return await response.json();
        } catch (error) {
            console.error("Update Room Error:", error);
        }
    },

    async deleteRoom(id) {
        try {
            const response = await fetch(`${BASE_URL}/rooms/${id}`, { method: 'DELETE' });
            return response.ok;
        } catch (error) {
            console.error("Delete Room Error:", error);
            return false;
        }
    }
};