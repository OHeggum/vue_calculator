<script setup>
import CalculatorButton from "@/components/CalculatorButton.vue";
</script>

<template>
    <div class="numpad">
        <CalculatorButton
            v-for="(button, index) in buttons"
            :value="button"
            :key="index"
            @btnClick="$emit('numpad_click', button)"
            />
    </div>
</template>

<script>
let buttons = ["AC", "ANS", "DEL", "+", 1, 2, 3, "-", 4, 5, 6, "x", 7, 8, 9, "/", 0, ".", "="];
</script>

<style>
.numpad {
    display: flex;
    flex-flow: row wrap;
}
</style>