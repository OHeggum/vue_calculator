<template>
  <div class="history">
    <h2>History</h2>
    <ul>
      <li v-for="(calculation, index) in calculation_history.slice().reverse()" :key="index">
        {{ calculation }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['add_to_history'],
  data() {
    return {
      calculation_history: [],
    }
  },
  methods: {
    update_history(calculation) {
      this.calculation_history.push(calculation);

      if (this.calculation_history.length > 5) {
        this.calculation_history.shift();
      }
    }
  }
}

</script>

<style scoped>

.history {
  margin-top: 20px;
}

</style>