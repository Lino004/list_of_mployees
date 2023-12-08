<script setup>
import { onMounted, ref } from 'vue';
import * as getValueProperty from 'lodash/get';
import { createDirectus, rest, readItems, staticToken, readAssetRaw, aggregate } from '@directus/sdk';
import AppPagination from '@/components/AppPagination.vue';

const client = createDirectus('https://staging-backend.teamwell.co')
  .with(staticToken(import.meta.env.VITE_DIRECTUS_TOKEN))
  .with(rest());

const perPage = 5;
const columns = [
  { label: 'NOM', value: 'name' },
  { label: 'TITRE', value: 'position' },
  { label: 'DEPARTEMENT', value: 'depart' },
  { label: 'DEBUT CONTRAT', value: 'current_contract.entry_date' },
  { label: 'STATUS', value: 'status' },
];

//ref
const employees = ref([]);
const avatars = ref({});
const currentPage = ref(1);
const total = ref(1);
const loading = ref(false);
const errors = ref('xzxz');
const search = ref('');

//methods
const getData = async () => {
  loading.value = true;
  errors.value = '';
  try {
    const aggregateResult = await client.request(
      aggregate('employees', {
        aggregate: { count: '*' },
      })
    );
    total.value = parseInt(aggregateResult[0].count);
    employees.value = await client.request(
      readItems('employees', {
        fields: [
          'status',
          'user.first_name', 'user.last_name',
          'user.email', 'user.avatar.id',
          'position.positions_id.name',
          'departments_manager.departments_id.name',
          'current_contract.entry_date',
        ],
        limit: perPage,
        page: currentPage.value,
        search: search.value,
      })
    );
    avatarManager(employees.value
      .map(el => el.user.avatar?.id)
      .filter(el => !!el));
  } catch (error) {
    errors.value = error.message;
  } finally {
    loading.value = false;
  }
  
}

const avatarManager = async (avatarsId) => {
  const promises = [];
  avatarsId.forEach(id => {
    promises.push(new Promise((res) => {
      client.request(readAssetRaw(avatarsId[0], {
        fit: 'cover',
        width: 200,
        height: 200,
        quality: 25,
      })).then(async (result) => {
        const url = await streamToDataUrl(result);
        res({ id, url })
      });
    }));
  });
  const results = await Promise.allSettled(promises);
  results.filter(res => res.status === 'fulfilled').forEach((res) => {
    avatars.value[res.value.id] = res.value.url;
  })

}

const streamToDataUrl = async (imageStream) => {
  const response = new Response(imageStream);
  const buffer = await response.arrayBuffer();
  const base64Image = btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)));
  const dataURL = `data:${response.headers.get('content-type')};base64,${base64Image}`;
  return dataURL;
}

onMounted( async () => {
  await getData();
})
</script>

<template>
  <section>
    <div v-if="errors" class="w-full bg-red-500 text-white rounded-md p-2 mb-3 relative">
      <h3>Error:</h3>
      {{ errors }}
      <button class="rounded-full bg-red-600 h-8 w-8 absolute top-0 right-0 m-2" @click="errors = ''">
        <font-awesome-icon class="" icon="close" />
      </button>
    </div>
    <div class="flex justify-end items-center space-x-2">
      <div class="flex-none">
        <input
          v-model="search"
          @keydown.enter="getData"
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
          placeholder="Recherche...">
      </div>
      <div class="flex-none">
        <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2">
          <option selected>Tous les status</option>
        </select>
      </div>
      <div class="flex-none">
        <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2">
          <option selected>Tous les responsables</option>
        </select>
      </div>
      <div class="flex-none">
        <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2">
          <option selected>Tous les département</option>
        </select>
      </div>
      <div class="flex-none">
        <button @click="getData" class="bg-teal-700 text-white p-2 rounded-md flex items-center">
          <span class="text-sm">Filtre</span>
        </button>
      </div>
    </div>
    
    <div class="mt-5 bg-white p-2 relative overflow-x-auto rounded-md">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-400 uppercase">
          <tr class="border-b">
            <th v-for="(item, index) in columns" :key="index" scope="col" class="px-6 py-3">
              {{ item.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(empl, index) in employees" :key="empl.id"
            class="bg-white"
            :class="{ 'border-b': index !== employees.length -1 }">
            <td v-for="(col, index) in columns" :key="index" class="px-6 py-2 text-teal-900">
              <div
                v-if="col.value === 'name'"
                class="flex items-center text-gray-900 whitespace-nowrap">
                <img
                  class="w-10 h-10 rounded-full"
                  :src="avatars[empl.user.avatar?.id]"
                  :alt="empl.user.avatar?.id">
                <div class="ps-3">
                  <div class="text-base font-semibold"> {{ `${empl.user.first_name} ${empl.user.last_name}` }} </div>
                  <div class="font-normal text-gray-500"> {{ empl.user.email }} </div>
                </div>  
              </div>
              <div v-else-if="col.value === 'position'">
                <div v-if="getValueProperty(empl, 'position[0].positions_id', '')" class="text-base"> {{getValueProperty(empl, 'position[0].positions_id.name', '') }} </div>
                <div v-if="getValueProperty(empl, 'position[1].positions_id', '')" class="font-normal"> {{ getValueProperty(empl, 'position[1].positions_id.name', '')}} </div>
              </div>
              <div v-else-if="col.value === 'depart' && getValueProperty(empl, 'departments_manager[0].departments_id.name', '')"
                class="text-base font-semibold">
                {{getValueProperty(empl, 'departments_manager[0].departments_id.name', '') }}
              </div>
              <div v-else-if="col.value === 'status' && empl.status"
                class="text-xs p-1 font-semibold bg-teal-100 rounded-md text-center">
                {{ empl.status }}
              </div>
              <div v-else>
                {{ getValueProperty(empl, col.value, '') }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="loading" class="absolute left-0 top-0 flex items-center justify-center w-full h-full border border-gray-200 rounded-md bg-teal-950/25">
        <div role="status">
          <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
    <div class="mt-10 flex justify-between items-center">
      <div class="text-teal-900">
        Showing 
        <span class="font-bold">{{ ((currentPage - 1) * perPage) + 1 }}</span> to 
        <span class="font-bold">{{ currentPage * perPage > total ? total : currentPage * perPage }}</span> of 
        <span class="font-bold">{{ total }}</span>
      </div>
      <AppPagination
        :total="total"
        :per-page="perPage"
        v-model:current="currentPage"
        @update:current="getData()"
      />
    </div>
  </section>
</template>
