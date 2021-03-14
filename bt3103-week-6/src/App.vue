<template>
  <div>
    <!-- <app-header></app-header> -->
    <router-view></router-view>
    <!-- <pc v-bind:itemsList="itemsList"></pc> -->
  </div>
</template>

<script>

//import Header from './components/Header.vue'

export default {
  components: {
    // 'app-header':Header
  },
  data() {
    return {
    }
  }

}
</script>

<style scoped>
ul{
  list-style: none;
}

li{
  margin:10px;
  float:left;
  background-color:bisque;
  border-style: solid;
  border-width: 1.8px;
  padding: 15px;
  width: 250px;
  height: 300px
}
</style>
