<script setup>
</script>

<template>
  <nav class="nav">
    <RouterLink to="/clientes">Clientes</RouterLink>
    <span>|</span>
    <RouterLink to="/clientes">Clientes Frecuentes</RouterLink>
    <span>|</span>
    <RouterLink to="/empleados">Empleados</RouterLink>
    <span>|</span>
    <RouterLink to="/clientes">Productos</RouterLink>
    <span>|</span>
    <RouterLink to="/clientes">Tipo de Productos</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
  .nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #333;
    color: #fff;
    padding: 1rem;
  }
</style>