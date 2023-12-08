<script lang="ts" setup>
import { computed, defineProps } from 'vue';

const rangeBefore = 1;
const rangeAfter = 1;

//props
const props = defineProps({
  total: Number,
  current: Number,
  perPage: Number,
});

//emits
const emits = defineEmits(['update:current']);

//computed
const pageCount = computed(() => {
  return Math.ceil(props.total / props.perPage);
});
const hasPrev = computed(() => {
  return props.current > 1;
});
const hasFirst = computed(() => {
  return props.current >= 2 + rangeBefore;
});
const hasFirstEllipsis = computed(() => {
  return props.current >= rangeBefore + 4;
});
const hasLast = computed(() => {
  return props.current <= pageCount.value - (1 + rangeAfter);
});
const hasLastEllipsis = computed(() => {
  return props.current < pageCount.value - (2 + rangeAfter);
});
const hasNext = computed(() => {
  return props.current < pageCount.value;
});
const pagesInRange = computed(() => {
  let left = Math.max(1, props.current - rangeBefore);
  if (left - 1 === 2) {
    left--; // Do not show the ellipsis if there is only one to hide
  }
  let right = Math.min(props.current + rangeAfter, pageCount.value);
  if (pageCount.value - right === 2) {
    right++; // Do not show the ellipsis if there is only one to hide
  }

  const pages = [];
  for (let i = left; i <= right; i++) {
    pages.push(getPage(i));
  }
  return pages;
});

//methods
const changePage = (num) => {
  if (props.current === num || num < 1 || num > pageCount.value) return;
  emits('update:current', num);
};
const getPage = (num) => {
  return {
    number: num,
    isCurrent: props.current === num,
    click: () => changePage(num),
  };
};


</script>

<template>
  <nav aria-label="Page navigation example">
    <ul class="inline-flex -space-x-px text-sm">
      <li>
        <button
          @click="changePage(current - 1)"
          :disabled="!hasPrev"
          class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ">
          <font-awesome-icon class="" icon="chevron-left" />
        </button>
      </li>
      <!--First-->
      <li v-if="hasFirst">
        <button
          @click="changePage(1)"
          class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">
          1
        </button>
      </li>
      <li v-if="hasFirstEllipsis" class="px-3 h-8 bg-white border border-gray-300">
        <span class="">&hellip;</span>
      </li>

      <!--Pages-->
      <li v-for="page in pagesInRange" :key="page.number">
        <a
          @click="page.click()"
          class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
          :class="{ 'bg-teal-800 text-white': page.isCurrent }">
          {{ page.number }}
        </a>
      </li>
      
      <!--Last-->
      <li v-if="hasLastEllipsis" class="px-3 h-8 bg-white border border-gray-300">
        <span class="">&hellip;</span>
      </li>
      <li v-if="hasLast">
        <a
        @click="changePage(pageCount)"
        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">
        {{ pageCount }}
        </a>
      </li>
      <li>
        <a
          @click="changePage(current + 1)"
          :disabled="!hasNext"
          class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ">
          <font-awesome-icon class="" icon="chevron-right" />
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
export default {};
</script>

