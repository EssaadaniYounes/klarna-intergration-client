<script setup>
import { RouterLink } from 'vue-router';
import IconView from '../icons/IconView.vue';

const props = defineProps({
  product: {
    type: Object,
    required: true,
    default: () => {
      return {
        image_url: "https://placeimg.com/640/480/any",
        name: "Product name",
        description: "",
        price: 0,
      };
    },
  },
});
</script>

<template>
  <figure class="max-h-44 overflow-hidden h-40">
    <img :src="product.image_url" :alt="product.name" />
  </figure>
  <div class="card-body">
    <h2 class="card-title text-sm">{{ product.name }}</h2>
    <p class="text-xs">{{ product.description }}..</p>
    <div class="card-actions justify-between items-center">
      <p class="text-xs font-bold">${{ props.product.price }}</p>
      <RouterLink :to="`/products/${product.id}`" class="btn min-h-0 h-auto py-2 px-4 bg-blue-400 text-white hover:bg-blue-500 flex items-center justify-center gap-1.5">
        <IconView/>
        <span>View</span>
      </RouterLink>
    </div>
  </div>
</template>
