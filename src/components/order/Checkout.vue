<script setup>
import klarna from "@/assets/klarna.svg";
import PaymentService from "@/services/PaymentService";
import { reactive } from "vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});
let checkoutPayload = reactive({
  name: "",
  address: "",
  phone: "",
  email: "",
  quantity: 1,
});

const increaseQuantity = () => {
  checkoutPayload.quantity++;
};
const decreaseQuantity = () => {
  if (checkoutPayload.quantity > 1) {
    checkoutPayload.quantity--;
  }
};
const handleCheckout = async (paymentGateway) => {
  checkoutPayload.product_id = props.product.id;
  checkoutPayload.payment_gateway = paymentGateway;
  try {
    const htmlSnippet = await PaymentService.checkout(checkoutPayload);
    let checkoutContainer = document.getElementById("checkout");
    checkoutContainer.innerHTML = htmlSnippet;
    var scriptsTags = checkoutContainer.getElementsByTagName("script");
    // This is necessary otherwise the scripts tags are not going to be evaluated
    for (var i = 0; i < scriptsTags.length; i++) {
      var parentNode = scriptsTags[i].parentNode;
      var newScriptTag = document.createElement("script");
      newScriptTag.type = "text/javascript";
      newScriptTag.text = scriptsTags[i].text;
      parentNode.removeChild(scriptsTags[i]);
      parentNode.appendChild(newScriptTag);
    }
  } catch (error) {
    alert(error);
  }
};
</script>
<template>
  <div class="bg-gray-100 w-1/2 min-h-full p-3">
    <div id="checkout"></div>
    <div class="flex items-start gap-x-2 mt-12">
      <div class="avatar">
        <div class="w-12 rounded">
          <img :src="props.product.image_url" :alt="props.product.name" />
        </div>
      </div>
      <h3 class="text-lg font-medium">{{ props.product.name }}</h3>
      <div class="flex items-center gap-x-2">
        <button
          @click="decreaseQuantity()"
          class="bg-gray-300 size-7 flex justify-center text-white font-bold rounded-full duration-100 hover:bg-gray-400"
        >
          -
        </button>
        <span class="font-bold">{{ checkoutPayload.quantity }}</span>
        <button
          @click="increaseQuantity()"
          class="bg-gray-300 size-7 flex justify-center text-white font-bold rounded-full duration-100 hover:bg-gray-400"
        >
          +
        </button>
      </div>
    </div>
    <div class="mt-10 flex flex-col items-center">
      <h4 class="text-lg font-bold mb-2">Checkout</h4>
      <div class="space-y-3">
        <input
          type="text"
          class="w-full p-2 px-4 rounded-md shadow-sm border-gray-300 focus:outline-blue-200"
          placeholder="Full name.."
          v-model="checkoutPayload.name"
        />
        <input
          type="address"
          class="w-full p-2 px-4 rounded-md shadow-sm border-gray-300 focus:outline-blue-200"
          placeholder="Address.."
          v-model="checkoutPayload.address"
        />
        <input
          type="tel"
          class="w-full p-2 px-4 rounded-md shadow-sm border-gray-300 focus:outline-blue-200"
          placeholder="Phone.."
          v-model="checkoutPayload.phone"
        />
        <input
          type="email"
          class="w-full p-2 px-4 rounded-md shadow-sm border-gray-300 focus:outline-blue-200"
          placeholder="Email.."
          v-model="checkoutPayload.email"
        />
      </div>
      <div class="mt-4 w-full space-y-2">
        <button
          @click="handleCheckout('klarna')"
          class="w-full bg-black text-white flex items-center justify-center gap-x-1.5 py-1.5 rounded-md"
        >
          <img :src="klarna" alt="Klarna" class="size-7" />
          <span class="text-sm font-medium">Pay with Klarna</span>
        </button>
        <button
          disabled
          class="w-full cursor-not-allowed bg-black opacity-50 text-white flex items-center justify-center gap-x-1.5 py-1.5 rounded-md"
        >
          <img
            src="https://www.vectorlogo.zone/logos/stripe/stripe-ar21.svg"
            alt="Stripe"
            class="size-7"
          />
          <span class="text-sm font-medium">Pay with Stripe</span>
        </button>
        <button
          disabled
          class="w-full cursor-not-allowed bg-black opacity-50 text-white flex items-center justify-center gap-x-1.5 py-1.5 rounded-md"
        >
          <img
            src="https://www.vectorlogo.zone/logos/paypal/paypal-ar21.svg"
            alt="Stripe"
            class="size-7"
          />
          <span class="text-sm font-medium">Pay with PayPal</span>
        </button>
      </div>
    </div>
  </div>
</template>
