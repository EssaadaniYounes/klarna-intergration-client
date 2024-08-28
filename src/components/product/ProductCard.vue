<script setup>
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
    <div class="card-actions justify-end">
      <button class="btn btn-primary">View</button>
    </div>
  </div>
</template>
