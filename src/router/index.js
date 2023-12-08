import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/employes',
      name: 'employes',
      component: () => import('@/views/EmployesView.vue'),
      children: [
        {
          path: '',
          name: 'employes.list',
          component: () => import('@/views/EmployesListeView.vue'),
        },
        {
          path: 'horaires',
          name: 'employes.horaires',
          component: () => import('@/views/EmployesHorairesView.vue'),
        },
      ],
    },
  ]
})

export default router
