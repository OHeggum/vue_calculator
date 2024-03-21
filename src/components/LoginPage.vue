<template>
    <div class="login-container">
        <h2>Login or Register</h2>
        <form @submit.prevent="loginOrRegister">
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="name" required>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required>
            </div>
            <button type="submit">Login or Register</button>
        </form>
    </div>
</template>
// Login.vue
<script setup>
import { useAuthStore } from '../store/authStore';
import {ref} from "vue";
import {useRouter} from "vue-router";

const name = ref('');
const password = ref('');
const router = useRouter();

const loginOrRegister = async () => {
    try {
        await useAuthStore().loginOrRegister(name.value, password.value);
        await router.push('/');
    } catch (error) {
        console.log(error.message);
    }
};
</script>

<style scoped>
.login-container {
    max-width: 300px;
    margin: auto;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
}

input[type="text"],
input[type="password"],
button {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}

button {
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
}
</style>
