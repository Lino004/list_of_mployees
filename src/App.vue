<script setup>
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue';
import AppMenu from '@/components/AppMenu.vue';
</script>

<template>
  <main class="w-screen h-screen flex flex-col">
    <section class="flex-none">
      <AppHeader/>
    </section>
    <section class="flex-1 flex">
      <div class="flex-none">
        <AppMenu/>
      </div>
      <div class="flex-1 bg-slate-100 overflow-y-scroll h-content">
        <RouterView />
      </div>
    </section>
  </main>
</template>

<style>

</style>
