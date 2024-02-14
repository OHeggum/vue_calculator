<template>
    <div :class="['btn', button_class]" @click="$emit('btnClick', this.value)">
        {{value}}
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: [String, Number],
            required: true,
        },
    },
    computed: {
        button_class() {
            return {
                "zero-button": this.value === 0,
                "comma-button": this.value === ".",
                "equals-button": this.value === "=",
                "non-number-button":
                    !/\d/.test(this.value) == "string" &&
                    this.value.length === 1,
            };
        },
    },
};
</script>

<style>
.btn {
    background-color: #e9e9e9;
    border: 1px solid #333;
    color: black;
    font-size: 1.5rem;
    flex: 1 0 25%;
    padding: 25px;
    text-align: center;
    user-select: none;
}

.btn:hover {
    background-color: #e1e1e1;
    cursor: pointer;
}

.btn:active {
    background-color: #d4d4d4;
}
</style>