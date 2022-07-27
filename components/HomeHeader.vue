<template>
  <header>
    <h1><span>$ Seu Fipe</span></h1>
    <h3>Encontre aqui os preços de todos os veículos do Brasil !</h3>
  </header>
</template>

<script>
export default {
  name: 'HomeHeader'
}
</script>

<style>
header {
  background-color: #1a202c;
}
header h1 {
  padding: 30px 0;
  text-align: center;
}

header h1 span {
  border-radius: 4px;
  padding: 0 10px;
  letter-spacing: 1px;
  color: #f7fafc;
  background-color:#00dc82;
;
}
header h3 {
  color: #00dc82;
  text-align: center;
  padding-bottom:30px;
}
@media screen and (max-width: 800px) {
  header h3 {
    margin-right: 16px;
    margin-left: 16px;
  }
}
</style>
