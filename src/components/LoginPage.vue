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

<script>
export default {
    data() {
        return {
            name: '',
            password: ''
        };
    },
    methods: {
        loginOrRegister() {
            const requestData = {
                name: this.name,
                password: this.password
            };

            fetch('http://localhost:8080/loginOrRegister', { // Update the URL to match your backend endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to login or register');
                    }
                    // Handle successful login or registration response here
                    // For example, you might redirect the user to the home page or display a success message
                    console.log('Login or registration successful');
                    // Redirect to home page or perform other actions as needed
                })
                .catch(error => {
                    console.error('Error logging in or registering:', error);
                    // Handle error, such as displaying an error message to the user
                    console.log('Something went wrong, please try again.');
                });
        }
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
