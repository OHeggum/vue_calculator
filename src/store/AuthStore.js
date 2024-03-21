// authStore.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        isLoggedIn: false,
    }),
    actions: {
        async loginOrRegister(name, password) {
            try {
                const requestData = { name, password };
                const response = await fetch('http://localhost:8080/loginOrRegister', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                });

                if (!response.ok) {
                    throw new Error('Failed to login or register');
                }

                this.isLoggedIn = true;
                console.log('Login or registration successful');
            } catch (error) {
                console.error('Error logging in or registering:', error);
                throw new Error('Something went wrong, please try again.');
            }
        },
        logout() {
            this.isLoggedIn = false;
        },
    },
});
