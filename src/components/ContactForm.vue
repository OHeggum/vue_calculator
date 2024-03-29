<script setup>
import { reactive, computed, ref, onBeforeMount } from "vue";
import { required, email, minLength, helpers } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import BaseInput from "../components/BaseInput.vue";
import BaseTextArea from "../components/BaseTextArea.vue";
import apiClient from "../services/CustomerService.js";
import {useCustomerStore} from "@/store/customerStore.js";

function updateName(event) {
    piniaStore.name = event.target.value;
    customer.name = event.target.value;
}

function updateEmail(event) {
    piniaStore.email = event.target.value;
    customer.email = event.target.value;
}

const piniaStore = useCustomerStore();

const customer = reactive({
    name: piniaStore.name,
    email: piniaStore.email,
    message: "",
});

const rules = computed(() => {
    return {
        name: {
            required: helpers.withMessage("This field is required.", required),
            minLength: minLength(2),
        },
        email: {
            required: helpers.withMessage("This field is required.", required),
            email: helpers.withMessage("Please enter a valid email address.", email),
        },
        message: {
            required: helpers.withMessage("This field is required.", required),
            minLength: minLength(5),
        },
    };
});

const v$ = useVuelidate(rules, customer);

async function submitForm() {
    const result = await v$.value.$validate;
    if (result) {
        const response = await apiClient.postCustomer(customer);
        if (response.success) {
            piniaStore.saveCustomer(customer.name, customer.email);
            v$.value.$reset();
            resetInputFields();
            setResponseMessage("Form submitted successfully!");
        } else {
            setResponseMessage(
                "An error occurred. Please try again later.\nError details:\n" +
                response.message
            );
        }
    } else {
        console.log("result equated to false")
    }
}


const hasErrors = computed(() => {
    return Object.keys(v$.value.$errors).length > 0;
});

const responseMessage = ref("");
function setResponseMessage(message) {
    responseMessage.value = message;
}

function resetInputFields() {
    customer.name = "";
    customer.email = "";
    customer.message = "";
}

onBeforeMount(() => {
    if (piniaStore.name) {
        customer.name = piniaStore.name;
    }
    if (piniaStore.email) {
        customer.email = piniaStore.email;
    }
});
</script>

<template>
    <h1 class="contact-title">Contact us using the form below</h1>
    <hr />

    <form @submit.prevent="submitForm" class="contact-form">
        <BaseInput
            id="name-input"
            v-model="customer.name"
            label="Name"
            class="field"
            @input="updateName"
        />
        <span v-for="error in v$.name.$errors" :key="error.$uid" class="field-error"
        >{{ error.$message }}
    </span>
        <BaseInput
            id="email-input"
            v-model="customer.email"
            label="E-mail"
            class="field"
            @input="updateEmail"
        />
        <span
            v-for="error in v$.email.$errors"
            :key="error.$uid"
            class="field-error"
        >
      {{ error.$message }}
    </span>
        <BaseTextArea
            id="message-input"
            v-model="customer.message"
            label="Message"
        />
        <span
            v-for="error in v$.message.$errors"
            :key="error.$uid"
            class="field-error"
        >
      {{ error.$message }}
    </span>
        <button id="submit-btn" type="submit" :disabled="hasErrors">SUBMIT</button>
    </form>
    <span id="response-message" v-if="responseMessage">{{
            responseMessage
        }}</span>
</template>

<style scoped>
.contact-title {
    font-size: 2.5rem;
}

.contact-form {
    display: flex;
    flex-flow: column;
    padding: 30px;
}

#submit-btn {
    background-color: green;
    border-radius: 10px;
    color: white;
    font-size: 1.5rem;
    margin-top: 20px;
    padding: 20px;
}

#submit-btn:hover {
    background-color: #007700;
}

#submit-btn:disabled {
    background-color: gray;
}

:deep(.field) {
    color: black;
    width: 500px;
}

:deep(label) {
    margin: 10px 0 10px 0;
}

.field-error {
    color: red;
    font-size: 1.25rem;
}

#response-message {
    color: green;
    font-size: 1.25rem;
}
</style>
