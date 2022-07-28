<template>
  <div>
    <Home-header />
    <main>
      <Form-fipe />
      <Data-fipe />
    </main>
    <Home-footer />
  </div>
</template>
<script>
import FormFipe from '../components/FormFipe.vue'
import HomeHeader from '../components/HomeHeader.vue'
import HomeFooter from '../components/HomeFooter.vue'
import DataFipe from '../components/DataFipe.vue'
export default {
  name: 'HomeFilter',
  components: {
    FormFipe,
    HomeHeader,
    HomeFooter,
    DataFipe
  }
}
</script>
<style>
body {
   background-color: #8c91ab;
}
main {
  min-height: 70vh;
}
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
* {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
}
</style>
