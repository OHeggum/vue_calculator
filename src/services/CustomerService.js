import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

export default {
    async postCustomer(customer) {
        try {
            const response = await apiClient.post("/posts", customer);
            if (response.status === 200) {
                return { success: true, data: response.data };
            } else {
                return { success: false, message: "Failed to create customer"};
            }
        } catch (error) {
            return { success: false, message: error.message};
        }
    },
};