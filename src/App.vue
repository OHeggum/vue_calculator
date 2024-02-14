<template>
    <div id="app">
        <Calculator :calculation-history="calculation_history" @update_history="update_history" :add_to_history="add_to_history" ref="calculatorHistory" />
        <Calculator_history :calculation-history="calculation_history" />
    </div>
</template>


<script>
import Calculator from './components/calculator_component.vue'
import Calculator_history from "@/calculator_history.vue";

export default {
  name: 'app',
  components: {
    Calculator,
    Calculator_history
  },
  data() {
    return {
      calculation_history:[],
    }
  },
  methods: {
    update_history(new_history) {
      this.calculation_history.push(new_history);
      console.log('i am running update_history')
    },
    add_to_history(calculation) {
      this.$refs.calculatorHistory.add_to_history(calculation);
      console.log('i am running add_to_history')
    }
  }
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: black;
}
</style>