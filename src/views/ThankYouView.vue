<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import OrderService from "@/services/OrderService";
import IconCheck from "@/components/icons/IconCheck.vue";
import { ref } from "vue";
const orderId = useRoute().query.order_id;

let orderDetails = ref({});

onMounted(async () => {
  try {
    if (!orderId) return;
    const data = await OrderService.getOrder(orderId);
    orderDetails.value = data;
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div class="bg-gray-100 flex items-center justify-center pt-12">
    <div class="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto" v-if="orderDetails.id">
      <div class="text-center">
        <div class="flex items-center justify-center">
            <IconCheck/>
        </div>
        <h1 class="text-3xl font-bold text-gray-800 mb-4">
          Thank You for Your Purchase!
        </h1>
        <p class="text-gray-600 mb-8">
          We appreciate your business and hope you enjoy your new product.
        </p>
      </div>
      <div class="flex items-center">
        <img
          class="w-32 h-32 object-cover rounded-md shadow-md"
          :src="orderDetails.product.image_url"
          alt="Product Image"
        />
        <div class="ml-6">
          <h2 class="text-xl font-semibold text-gray-700">
            Product Name: <span class="text-gray-900">{{ orderDetails.product.name }}</span>
          </h2>
          <p class="text-gray-700">
            Quantity: <span class="font-semibold text-gray-900">{{ orderDetails.product.quantity }}</span>
          </p>
          <p class="text-gray-700">
            Amount: <span class="font-semibold text-gray-900">${{ orderDetails.total }}</span>
          </p>
          <p class="text-gray-700">
            Order Date:
            <span class="font-semibold text-gray-900">{{ orderDetails.started_at }}</span>
          </p>
        </div>
      </div>
      <div class="mt-8 text-center">
        <p class="text-gray-600">
          Your order will be processed shortly. You will receive an email with
          tracking information once your order is shipped.
        </p>
      </div>
    </div>
  </div>
</template>
