<script setup>
import IconShop from "@/components/icons/IconShop.vue";
import Checkout from "@/components/order/Checkout.vue";
import PrdouctService from "@/services/PrdouctService";
import { reactive } from "vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const props = reactive({
  product: {
    type: Array,
    default: () => [],
  },
  error: {
    type: Object || null,
    default: null,
  },
  state: {
    type: String,
    default: null,
  },
  isDrawerOpen: {
    type: Boolean,
    default: false,
  },
});
onMounted(async () => {
  props.state = "loading";
  try {
    const data = await PrdouctService.getProduct(route.params.id);
    props.product = data;
    props.state = "success";
  } catch (error) {
    props.error = error;
    props.state = "error";
  }
});
const toggleDrawer = () => {
  props.isDrawerOpen = !props.isDrawerOpen;
};
</script>

<template>
  <span
    v-if="props.state === 'loading'"
    class="loading loading-infinity w-16 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-400"
  ></span>
  <main
    v-else-if="props.state === 'success'"
    class="grid grid-cols-1 sm:grid-cols-2 p-8 drawer"
  >
    <div class="card shadow-xl max-w-[400px] p-2">
      <img
        :src="props.product.image_url"
        :alt="props.product.name"
        class="bg-red-400 rounded-md"
      />
    </div>
    <input
      v-model="props.isDrawerOpen"
      id="my-drawer"
      type="checkbox"
      class="drawer-toggle"
    />
    <div class="drawer-content">
      <h1 class="text-xl md:text-3xl font-bold">{{ props.product.name }}</h1>
      <p class="text-sm text-gray-500">{{ props.product.description }}</p>
      <div class="flex items-center justify-between w-full mt-3 drawer-button">
        <p class="text-xl font-bold">${{ props.product.price }}</p>
        <button
          @click="toggleDrawer()"
          class="btn min-h-0 h-auto p-4 bg-green-400 text-white hover:bg-green-500 flex items-center justify-center gap-1.5"
        >
          <IconShop />
          <label for="my-drawer" class="">Buy Now</label>
        </button>
      </div>
    </div>
    <div class="drawer-side drawer-open">
      <label
        for="my-drawer"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <Checkout :product="props.product" />
    </div>
  </main>
  <span v-else-if="props.state === 'error'" class="text-red-600">{{
    error
  }}</span>
</template>
