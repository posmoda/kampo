<template>
  <div id="app">
      <Header />
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
  name: 'App',
  components: {
      Header
  },
  mounted () {
  }
}
</script>

<style>
@import "./css/normalize.css";
html {
    font-size: 10px;
    font-family: YuGothic, "Yu Gothic", "ヒラギノ角ゴ ProN", "メイリオ", sans-serif;
    font-weight: 400;
}
body {
    padding-bottom: 100px;
}
header {
    border-bottom: 1px solid black;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 10;
    padding: 20px 10px;
}
header h1 {
    margin: 0;
}
ul {
    font-size: 1.5rem;
}
</style>
