<template>
  <footer>
    <p class="copyright">
      © Seu Fipe -
      <a href="https://github.com/joao-belmiro" target="_blank" rel="noopener noreferrer">
        GitHub
      </a>
      João Carlos - 2022
    </p>
  </footer>
</template>

<script>
export default {
  name: 'HomeFooter'
}
</script>

<style>
footer {
    margin-top: 32px;
    width: 100%;
    padding: 32px 0;
    color: #f7fafc;
    background-color:#1a202c;
}
.copyright {
    text-align: center;
}
p a {
  color: #00dc82;
  text-decoration: none;
}
</style>
