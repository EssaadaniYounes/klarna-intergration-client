<script setup>
import ProductCard from '@/components/product/ProductCard.vue';
import PrdouctService from '@/services/PrdouctService';
import { reactive } from 'vue';
import { onMounted } from 'vue';
const props = reactive({
  products: {
    type: Array,
    default: () => []
  },
  error: {
    type: Object || null,
    default: null
  },
  state: {
    type: String,
    default: null
  }
})
onMounted(async () => {
  props.state = 'loading'
  try {
    const data = await PrdouctService.getProducts();
    props.products = data;
    props.state = 'success'
  } catch (error) {
    props.error = error
    props.state = 'error'
  }
})
</script>

<template>
  <span v-if="props.state === 'loading'" class="loading loading-infinity  w-16 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-400"></span>
  <main v-else-if="props.state === 'success'" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 items-center justify-between m-2">
    <div  v-for="product in props.products" :key="product" class="card bg-base-100 shadow-xl">
      <ProductCard :product="product"/>
    </div>
  </main>
  <span v-else-if="props.state === 'error'" class="text-red-600">{{ error }}</span>
</template>
