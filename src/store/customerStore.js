import { defineStore } from 'pinia'

export const useCustomerStore = defineStore('customer', {
    state: () => ({
        name: '',
        email: ''
    }),
    actions: {
        saveCustomer(name, email) {
            this.name = name;
            this.email = email;
        }
    }
})
