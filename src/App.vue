<script setup>
import { NMessageProvider } from 'naive-ui'
</script>

<template>
  <n-message-provider>
    <nav class="nav">
      <RouterLink to="/">Home</RouterLink>
      <span>|</span>
      <RouterLink to="/clientes">Clientes</RouterLink>
      <span>|</span>
      <RouterLink to="/clientes-frecuentes">Clientes Frecuentes</RouterLink>
      <span>|</span>
      <RouterLink to="/empleados">Empleados</RouterLink>
      <span>|</span>
      <RouterLink to="/productos">Productos</RouterLink>
      <span>|</span>
      <RouterLink to="/tipo-productos">Tipo de Productos</RouterLink>
    </nav>
    <main>
      <RouterView />
    </main>
  </n-message-provider>
</template>

<style scoped>
.nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 1rem 0;
}
</style>