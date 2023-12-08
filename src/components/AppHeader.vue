<template>
  <nav class="bg-white border-b-2 border-gray-100">
    <div class="px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="flex-auto items-center justify-center">
          <img class="h-8 w-auto" src="@/assets/img/logo.png" alt="Your Company">
        </div>
        <div class="flex items-center pr-2">
          <div class="relative ml-3">
            <div class="flex space-x-2">
              <button type="button" class="rounded-full bg-gray-100 h-9 w-9">
                <font-awesome-icon icon="circle-question"/>
              </button>
              <button type="button" class="rounded-full bg-gray-100 h-9 p-1 flex space-x-2 items-center">
                <span class="rounded-full bg-sky-500 text-white text-xs p-1">NG</span>
                <div class="text-left">
                  <p class="text-xs text-teal-900 font-bold ">Nathalie Grimony</p>
                  <p class="text-[10px] text-gray-400">Administrateur</p>
                </div>
                <font-awesome-icon class="text-xs" icon="chevron-down"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
</script>

<script>
export default {}
</script>