<template>
    <label v-if="label">{{label}}</label>
    <input
        v-bind="$attrs"
        :value="model_value"
        :placeholder="label"
        @input="$emit('update:model_value', $event.target.value)"
        />
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: "",
        },
        model_value: {
            type: [String, Number],
            default: "",
        },
    },
};
</script>

<style scoped>
label {
    font-size: 1.25rem;
}

input {
    border-radius: 10px;
    color: black;
    font-size: 1rem;
    padding: 1rem;
}
</style>