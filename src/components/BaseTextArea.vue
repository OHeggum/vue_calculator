<template>
    <label v-if="label"> {{label}}</label>
    <textarea
        v-bind= "$attrs"
        :value="model_value"
        @placeholder="$emit('update:model_value', $event.target.value)"
    />
</template>

<script>
export default {
    props: {
        label: {
            type:String,
            default: "",
        },
        model_value: {
            type: [String, Number],
            default: "",
        },
    },
};
</script>'

<style scoped>
label{
    font-size: 1.25rem;
}

textarea{
    border-radius: 10px;
    color: black;
    font-family: "Helvetica", "sans-serif";
    font-size: 1rem;
    padding: 10px;
    height: 180px;
}
</style>