<script setup>
</script>

<template>
  <section>
    <header class="bg-white p-5 px-10">
      <div class="flex justify-between items-center">
        <h3 class="text-xl"> Employes </h3>
        <div>
          <button class="bg-teal-700 text-white p-2 rounded-md flex items-center">
            <span class="text-sm">Ajouter un employé</span>
          </button>
        </div>
      </div>
    </header>
    <div class="px-8 text-sm bg-white text-center text-teal-900 border-b border-gray-200">
      <ul class="flex flex-wrap -mb-px">
        <li class="me-2">
          <router-link
            to="/employes"
            class="inline-block p-2 border-b-2 border-transparent rounded-t-lg"
            exact-active-class="border-teal-600 active">
            Liste  des employés
          </router-link>
        </li>
        <li class="me-2">
          <router-link
            to="/employes/horaires"
            class="inline-block p-2 border-b-2 border-transparent rounded-t-lg"
            exact-active-class="border-teal-600 active">
            Horaires employés
          </router-link>
        </li>
      </ul>
    </div>
    <div class="p-5 px-10">
      <router-view></router-view>
    </div>
  </section>
</template>
