import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/clientes',
    name: 'Clientes',
    component: () => import('../components/clientes/Clientes.vue')
  },
  {
    path: '/clientes-frecuentes',
    name: 'Clientes Frecuentes',
    component: () => import('../components/clientes-frecuentes/ClientesFrecuentes.vue')
  },
  {
    path: '/empleados',
    name: 'Empleados',
    component: () => import('../components/empleados/Empleados.vue')
  },
  {
    path: '/productos',
    name: 'Productos',
    component: () => import('../components/productos/Productos.vue')
  },
  {
    path: '/tipo-productos',
    name: 'Tipo Productos',
    component: () => import('../components/tipo-productos/TipoProductos.vue')
  },
  // Agrega aquí más rutas según sea necesario
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router