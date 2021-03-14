<template>
  <div>
      <button v-on:click="decrease()">-</button>
      <span> {{counter}} </span>
      <button v-on:click="increase()">+</button>
  </div>
</template>

<script>
export default {
  props:['item'],
  data() {
    return {
      counter: 0
    }
    },
  methods: {
    decrease: function() {
      if (this.counter > 0) {
        this.counter--;
        return this.$emit('counter', this.item, this.counter);
      }
    },
    increase: function() {
      if (this.counter < 10) {
        this.counter++;
      } else {
        alert("You cannot buy more than 10 items.");
      }
      this.$emit('counter', this.item, this.counter);
      return this.counter;
    }
  }

  }
</script>

<style scoped>
  button {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
    border-radius: 5px;
    background-color:pink;
    width: 40px;
    height: 40px;
  }
</style>