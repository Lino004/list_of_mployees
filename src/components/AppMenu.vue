<script setup>
const menuItems = [
  {
    label: 'Employés',
    icon: 'address-card',
    to: '/employes',
  },
  {
    label: 'Congé',
    icon: 'umbrella-beach',
    to: null,
  },
  {
    label: 'Materiel',
    icon: 'laptop',
    to: null,
  },
  {
    label: 'Véhicules',
    icon: 'car',
    to: null,
  },
  {
    label: 'Documents',
    icon: 'file-invoice',
    to: null,
  },
  {
    label: 'Agenda',
    icon: 'calendar-days',
    to: null,
  },
  {
    label: 'Humeurs',
    icon: 'comment',
    to: null,
  },
  {
    label: 'Post',
    icon: 'message',
    to: null,
  },
  {
    label: 'Recrutement',
    icon: 'magnifying-glass',
    to: null,
  },
  {
    label: 'Paramètres',
    icon: 'gear',
    to: null,
  },
];
</script>

<template>
  <div class="w-32 h-full bg-teal-950 text-white p-4">
    <ul class="space-y-4">
      <li v-for="(item, index) in menuItems" :key="index">
        <router-link
          v-if="item.to"
          :to="item.to"
          class="flex flex-col text-center p-2 rounded-md"
          activeClass="bg-teal-600">
          <font-awesome-icon class="text-4xl" :icon="item.icon" />
          <span class="text-xs"> {{ item.label }} </span>
        </router-link>
        <div v-else class="flex flex-col text-center p-2 rounded-md">
          <font-awesome-icon class="text-4xl" :icon="item.icon" />
          <span class="text-xs"> {{ item.label }} </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>